import { useCallback, useContext } from 'react';
import { AuthContext } from '@/AuthContext';
import ProfilForm from '@/components/ProfilForm';

import { useProfil, useProfilUpdate } from './hooks';

function Profil(): JSX.Element | null {
  const { userData }: { userData: { id: number } } = useContext(AuthContext);
  const { data, isLoading } = useProfil({ id: userData?.id });
  const { mutate } = useProfilUpdate();

  const handleSubmit = useCallback(
    (updateProfilData: any): void => {
      mutate({ ...updateProfilData, id: userData?.id });
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
