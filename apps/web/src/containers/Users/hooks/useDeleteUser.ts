import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { deleteUsersService } from '@/services/auth';
import { queryClient } from '@/App';

function useDeleteUser(): UseMutationResult<AxiosResponse<any, any>> {
  return useMutation({
    mutationFn: deleteUsersService,
    onMutate: async (newTodo: any) => {
      console.log(
        'deleteUsersService deleteUsersService deleteUsersService',
        newTodo,
      );
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['userList'] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(['userList']);

      // Optimistically update to the new value
      queryClient.setQueryData(['userList'], (old: any) => {
        console.log('old old old', old);
        //return [...old, newTodo];

        console.log(
          ':::::::::::::::::::::::::',
          old?.data?.data?.results.filter(({ id }) => {
            return id !== newTodo.id;
          }),
        );

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
              results: old?.data?.data?.results.filter(({ id }) => {
                return id !== newTodo.id;
              }),
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

export default useDeleteUser;
