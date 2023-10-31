import { AuthContext } from '@/AuthContext';
import ProfilForm from '@/components/ProfilForm';
import { useCallback, useContext, useEffect } from 'react';
import useProfil from './hooks';

function Profil(): JSX.Element | null {
  const { userData }: { userData: { id: number } } = useContext(AuthContext);
  const { data, mutate } = useProfil();

  useEffect(() => {
    mutate({ id: userData?.id });
  }, [mutate, userData]);

  const handleSubmit = useCallback(
    (d: unknown): void => {
      mutate({ ...d, id: userData?.id });
    },
    [mutate, userData],
  );

  /*
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authGetUserProfilAction({ id: userData?.id }));
  }, [dispatch, userData]);

  const { auth: { data: { data } } = {} } = useSelector(({ auth }) => ({
    auth,
  }));

  const handleSubmit = useCallback(
    (data) => {
      dispatch(authUpdateUserProfilAction({ ...data, id: userData?.id }));
    },
    [dispatch, userData?.id],
  );
  */

  return (
    data && <ProfilForm initialValues={{ ...data }} onSubmit={handleSubmit} />
  );
}

export default Profil;
