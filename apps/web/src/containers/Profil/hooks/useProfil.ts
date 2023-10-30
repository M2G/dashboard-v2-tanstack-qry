import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { userProfilService } from '@/services/auth';
import { queryClient } from '@/App';

function useProfil(): UseMutationResult<AxiosResponse<any, any>> {
  return useMutation({
    mutationFn: userProfilService,
    onSuccess: (): void => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['profil'] });
    },
  });
}

export default useProfil;
