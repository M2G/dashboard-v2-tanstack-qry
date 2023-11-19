import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/App';
import { userProfilService } from '@/services/auth';
import { AxiosResponse } from 'axios';

interface IProfil {
  id: number;
}

function useProfil({ id }: IProfil): UseQueryResult<AxiosResponse<any, any>> {
  return useQuery({
    cacheTime: 300000,
    enabled: !!id,
    onSuccess: (): void => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['userProfil'] });
    },
    queryFn: () => userProfilService({ id }),
    queryKey: ['userProfil', id],
    staleTime: Infinity,
  });
}

export default useProfil;
