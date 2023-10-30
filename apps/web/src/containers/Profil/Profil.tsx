import { AuthContext } from '@/AuthContext';
import ProfilForm from '@/components/ProfilForm';
import { useCallback, useContext, useEffect } from 'react';
import useProfil from './hooks';

function Profil(): JSX.Element | null {
  const { userData }: { userData: { id: number } } = useContext(AuthContext);
  const mutation = useProfil();

  useEffect(() => {
    // dispatch(authGetUserProfilAction({ id: userData?.id }));
    mutation.mutate({ id: userData?.id });
  }, [mutation, userData]);

  const handleSubmit = useCallback(
    (data) => {
      mutation.mutate({ ...data, id: userData?.id });
    },
    [mutation, userData],
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

  return null;
  //  data && <ProfilForm initialValues={{ ...data }} onSubmit={handleSubmit} />
}

export default Profil;
