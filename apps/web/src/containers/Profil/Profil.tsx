import { AuthContext } from '@/AuthContext';
import ProfilForm from '@/components/ProfilForm';
import { useProfil, useProfilUpdate } from './hooks';
import { useCallback, useContext } from 'react';

function Profil(): JSX.Element | null {
  const { userData }: { userData: { id: number } } = useContext(AuthContext);
  const { data, isLoading } = useProfil({ id: userData?.id });
  const { mutate } = useProfilUpdate();
  console.log('data data data data', data);

  const handleSubmit = useCallback(
    (d: unknown): void => {
      mutate({ ...d, id: userData?.id });
    },
    [mutate, userData],
  );

  if (isLoading) return null;

  return (
    <ProfilForm
      initialValues={{ ...data?.data?.data }}
      onSubmit={handleSubmit}
    />
  );
}

export default Profil;
