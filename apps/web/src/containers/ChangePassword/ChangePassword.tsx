import { AuthContext } from '@/AuthContext';
import ChangePassordForm from '@/components/ChangePassordForm';
import { useCallback, useContext } from 'react';
import useChangePassword from './hooks';

function ChangePassword(): JSX.Element {
  // const dispatch = useDispatch();
  const {
    userData: { id },
  } = useContext(AuthContext);
  const { mutate } = useChangePassword();

  const handleSubmit = useCallback(
    async (d): Promise<void> => {
      mutate({ id, ...d });
      // dispatch(authUpdatePasswordAction({ id, ...d }));
    },
    [mutate, id],
  );

  return <ChangePassordForm initialValues={{}} onSubmit={handleSubmit} />;
}

export default ChangePassword;
