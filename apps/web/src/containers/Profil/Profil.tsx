import { AuthContext } from '@/AuthContext';
import ProfilForm from '@/components/ProfilForm';
import { authGetUserProfilAction, authUpdateUserProfilAction } from '@/store/auth/actions';
import { useCallback, useContext, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

function Profil(): JSX.Element | null {
  const { userData }: { userData: { id: number } } = useContext(AuthContext);
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

  return data && <ProfilForm initialValues={{ ...data }} onSubmit={handleSubmit} />;
}

const mapStateToProps = (state: { auth: { data: never; loading: boolean } }) => {
  return {
    auth: state.auth.data,
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps)(Profil);
