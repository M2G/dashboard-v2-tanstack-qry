import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { recoverPasswordService } from '@/services/auth';
import { queryClient } from '@/App';

function useResetPassword(): UseMutationResult<AxiosResponse<any, any>> {
  return useMutation({
    mutationFn: recoverPasswordService,
    onSuccess: (): void => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['resetPassword'] });
    },
  });
}

export default useResetPassword;
