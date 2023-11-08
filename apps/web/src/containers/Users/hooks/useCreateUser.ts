import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { createUserProfilService } from '@/services/auth';
import { queryClient } from '@/App';

function useCreateUser(): UseMutationResult<AxiosResponse<any, any>> {
  return useMutation({
    mutationFn: createUserProfilService,
    onMutate: async (newTodo) => {
      console.log('newTodo newTodo newTodo newTodo', newTodo);
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['userList'] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(['userList']);

      // Optimistically update to the new value
      queryClient.setQueryData(['userList'], (old: any) => {
        console.log('old old old', old);
        //return [...old, newTodo];

        //TODO: add optimistic update
        return {
          data: {
            date: old?.data?.date,
            success: true,
            data: {
              pageInfo: {
                count: old?.data?.data?.pageInfo?.count,
                next: old?.data?.data?.pageInfo?.next + 1,
                page: 1,
                prev: old?.data?.data?.pageInfo?.prev,
              },
              results: [
                ...old?.data?.data?.results,
                {
                  created_at: new Date().toISOString(),
                  deleted_at: 0,
                  email: newTodo.email,
                  id: 15,
                  last_connected_at: null,
                  modified_at: new Date().toISOString(),
                  password: newTodo.password,
                  reset_password_expires: null,
                  reset_password_token: null,
                  username: null,
                },
              ],
            },
          },
        };
      });

      console.log('previousTodos previousTodos previousTodos', previousTodos);

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['userList'], context.previousTodos);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['userList'] });
    },
  });
}

export default useCreateUser;
