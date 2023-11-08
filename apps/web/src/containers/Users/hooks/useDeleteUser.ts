import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { deleteUsersService } from '@/services/auth';
import { queryClient } from '@/App';

function useDeleteUser(): UseMutationResult<AxiosResponse<any, any>> {
  return useMutation({
    mutationFn: deleteUsersService,
    onSuccess: (): void => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['deleteUser'] });
    },
  });
}

export default useDeleteUser;
