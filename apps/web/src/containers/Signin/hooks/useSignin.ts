import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import signinUserService from '@/services/signin';
import { queryClient } from '@/App';

function useSignin(): UseMutationResult<AxiosResponse<any, any>> {
  return useMutation({
    mutationFn: signinUserService,
    onSettled: (): void => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['authenticate'] });
    },
  });
}

export default useSignin;
