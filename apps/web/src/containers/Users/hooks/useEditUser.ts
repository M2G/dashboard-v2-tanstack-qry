import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { updateUserProfilService } from '@/services/auth';
import { queryClient } from '@/App';

function useEditUser(): UseMutationResult<AxiosResponse<any, any>> {
  return useMutation({
    mutationFn: updateUserProfilService,
    onSuccess: (): void => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['editUsers'] });
    },
  });
}

export default useEditUser;
