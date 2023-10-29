import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import signupUserService from '@/services/signup';
import { queryClient } from '@/App';

function useRegister(): UseMutationResult<AxiosResponse<any, any>> {
  return useMutation({
    mutationFn: signupUserService,
    onSuccess: (): void => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['register'] });
    },
  });
}

export default useRegister;
