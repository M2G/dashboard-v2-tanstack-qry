import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { forgotPasswordService } from '@/services/auth';
import { queryClient } from '@/App';

function useForgotPassword(): UseMutationResult<AxiosResponse<any, any>> {
  return useMutation({
    mutationFn: forgotPasswordService,
    onSuccess: (): void => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['resetPassword'] });
    },
  });
}

export default useForgotPassword;
