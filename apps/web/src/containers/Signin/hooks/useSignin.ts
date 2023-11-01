import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import signinUserService from '@/services/signin';
import { queryClient } from '@/App';
import { useContext } from 'react';
import { AuthContext } from '@/AuthContext';

function useSignin(): UseMutationResult<AxiosResponse<any, any>> {
  const { activateAuth }: any = useContext(AuthContext);
  return useMutation({
    mutationFn: signinUserService,
    onSuccess: (data): void => {
      // Invalidate and refetch
      activateAuth(data?.data?.data?.token);
      queryClient.invalidateQueries({ queryKey: ['authenticate'] });
    },
  });
}

export default useSignin;
