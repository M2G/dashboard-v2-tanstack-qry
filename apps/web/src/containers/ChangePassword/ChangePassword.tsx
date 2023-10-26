import { AuthContext } from '@/AuthContext';
import ChangePassordForm from '@/components/ChangePassordForm';
import { authUpdatePasswordAction } from '@/store/auth/actions';
import { useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';

function ChangePassword(): JSX.Element {
  const dispatch = useDispatch();
  const {
    userData: { id },
  } = useContext(AuthContext);
  const handleSubmit = useCallback(
    async (d) => {
      dispatch(authUpdatePasswordAction({ id, ...d }));
    },
    [dispatch, id],
  );

  return <ChangePassordForm initialValues={{}} onSubmit={handleSubmit} />;
}

export default ChangePassword;
