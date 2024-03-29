import type { JSX, SetStateAction } from 'react';

import TopLineLoading from '@/components/Loading/TopLineLoading';
import NoData from '@/components/NoData';

import UserEdit from '@/components/Users/UserEdit';
import UserNew from '@/components/Users/UserNew';

import UserFilters from '@/containers/UserFilters';
import List from '@/containers/UserList/ListLegacy';

import {
  useCreateUser,
  useDeleteUser,
  useEditUser,
  useUserList,
} from '@/containers/Users/hooks';
import { IUser } from '@/types';
import { useCallback, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Modal, Sidebar } from 'ui/components/organisms';

import AddUser from './Action/AddUser';
import userListItem from './UserListItem';

interface UserListProps {
  canAdd: boolean;
  canDelete: boolean;
  canEdit: boolean;
  id: string;
}

function UserList({
  canAdd = false,
  canDelete = false,
  canEdit = false,
  id,
}: UserListProps): JSX.Element {
  const { t } = useTranslation();
  const [pagination, setPagination] = useState<{
    page: number;
    pageSize: number;
  }>({
    page: 1,
    pageSize: 2,
  });
  const [term, setTerm] = useState('');
  const [state, setUser] = useState<{
    deletingUser?: IUser | boolean;
    editingUser?: IUser | boolean;
    newUser?: IUser | boolean;
  }>({
    deletingUser: false,
    editingUser: false,
    newUser: false,
  });

  const { data, isError, isLoading, refetch } = useUserList({
    filters: term,
    page: pagination.page,
    pageSize: pagination.pageSize,
  });

  const { mutate: mutateDelete } = useDeleteUser();
  const { mutate: mutateEdit } = useEditUser();
  const { mutate: mutateCreate } = useCreateUser();

  const handleAction = useCallback(
    ({
      deletingUser,
      editingUser,
      newUser,
    }: {
      deletingUser: boolean;
      editingUser: boolean;
      newUser: boolean;
    }): void => {
      setUser({
        deletingUser,
        editingUser,
        newUser,
      });
    },
    [],
  );

  const onEditUser = useCallback(
    (user: IUser): void => {
      mutateEdit({ id: state.editingUser.id, ...user });
      handleAction({ deletingUser: false, editingUser: false, newUser: false });
    },
    [handleAction, mutateEdit, state.editingUser],
  );

  const onChangePageSize = useCallback(
    async (pageSize: number): Promise<void> => {
      setPagination((prevState) => ({
        ...prevState,
        pageSize,
      }));

      refetch();
    },
    [refetch],
  );

  const searchTerms = useCallback(
    (terms: string): void => {
      setTerm(terms);
      refetch();
    },
    [refetch],
  );

  const onChangePage = useCallback(
    (page: number): void => {
      setPagination((prevState) => ({
        ...prevState,
        page,
      }));

      refetch();
    },
    [refetch],
  );

  const onNewUser = useCallback(
    (
      user: SetStateAction<{
        deletingUser?: IUser | boolean;
        editingUser?: IUser | boolean;
        newUser?: IUser | boolean;
      }>,
    ) => {
      mutateCreate({ ...user });
      handleAction({ deletingUser: false, editingUser: false, newUser: false });
    },
    [mutateCreate, handleAction],
  );

  const onDeleteUser = useCallback(
    (user: { id: { id: string } }): void => {
      mutateDelete({ id: user.id });
      handleAction({ deletingUser: false, editingUser: false, newUser: false });
    },
    [handleAction, mutateDelete],
  );

  const users = data?.data?.data || [];
  const results = users?.results || [];
  const pageInfo = users?.pageInfo || {};

  const rows = useMemo(
    () =>
      results?.map((user) =>
        userListItem({
          canDelete,
          canEdit,
          id,
          onDelete: (d) =>
            handleAction({
              deletingUser: d,
              editingUser: false,
              newUser: false,
            }),
          onEdit: (d) =>
            handleAction({
              deletingUser: false,
              editingUser: d,
              newUser: false,
            }),
          user,
        }),
      ),
    [results, canDelete, canEdit, id, handleAction],
  );

  const header = useMemo(
    () => [
      { label: '', sortable: false },
      { label: t('field.firstname'), sortable: false },
      { label: t('field.lastname'), sortable: false },
      { label: t('field.email'), sortable: false },
      { label: t('field.createdAt'), sortable: true, type: 'date' },
      { label: t('field.updateAt'), sortable: true, type: 'date' },
    ],
    [t],
  );

  if (isError) return <div>{isError}</div>;

  if (!users?.length && isLoading) return <TopLineLoading />;

  return (
    <div className="c-user-list">
      {canAdd && (
        <AddUser
          onAdd={() =>
            handleAction({
              deletingUser: false,
              editingUser: false,
              newUser: true,
            })
          }
        />
      )}
      <UserFilters currentTerm={term} onSearchTerm={searchTerms} />
      {results?.length > 0 ? (
        <List
          count={pageInfo?.count}
          currentPage={pagination?.page}
          currentPageSize={pagination?.pageSize}
          data={results}
          header={header}
          id={id}
          rows={rows}
          setCurrentPage={onChangePage}
          setCurrentPageSize={onChangePageSize}
        />
      ) : (
        <NoData />
      )}
      <Sidebar
        setIsOpened={() =>
          handleAction({
            deletingUser: false,
            editingUser: false,
            newUser: false,
          })
        }
        isOpened={!!state.editingUser}>
        {state.editingUser && (
          <UserEdit initialValues={state.editingUser} onSubmit={onEditUser} />
        )}
      </Sidebar>

      <Sidebar
        setIsOpened={() =>
          handleAction({
            deletingUser: false,
            editingUser: false,
            newUser: false,
          })
        }
        isOpened={!!state.newUser}>
        {state.newUser && <UserNew onSubmit={onNewUser} />}
      </Sidebar>

      <Modal
        hide={() =>
          handleAction({
            deletingUser: false,
            editingUser: false,
            newUser: false,
          })
        }
        onConfirm={() => {
          onDeleteUser(state.deletingUser as unknown as any);
        }}
        isShowing={state.deletingUser}
        title="Delete">
        <p>{t('alert.warning')}</p>
      </Modal>
    </div>
  );
}

export default UserList;
