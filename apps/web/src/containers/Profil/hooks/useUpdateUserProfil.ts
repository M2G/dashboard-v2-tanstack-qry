import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { updateUserProfilService } from '@/services/auth';
import { queryClient } from '@/App';

//@TODO: add optimistic update
function useUpdateUserProfil(): UseMutationResult<AxiosResponse<any, any>> {
  return useMutation({
    mutationFn: updateUserProfilService,
    onMutate: async (newTodo) => {
      console.log('newTodo newTodo newTodo newTodo', newTodo);
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['userProfil'] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(['userProfil']);

      // Optimistically update to the new value
      queryClient.setQueryData(['userProfil'], (old: any) => {
        console.log('old old old', old);
        //return [...old, newTodo];

        //TODO: add optimistic update
        return {
          data: {
            date: old?.data?.date,
            success: true,
            data: {
              created_at: '2023-07-03T22:13:21.999Z',
              deleted_at: 0,
              email: 'smith.jackson@university.com',
              first_name: 'test222222',
              id: 11,
              last_connected_at: null,
              last_name: 'test222222',
              modified_at: '2023-08-26T03:01:13.399Z',
              password:
                '$2b$10$CVDFoMRgOm202LX9U4rr4e4a6qA32ZZpGdttXdWXErw5e4fXc318.',
              reset_password_expires: null,
              reset_password_token: null,
              username: null,
            },
          },
        };
      });

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['userProfil'], context.previousTodos);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfil'] });
    },
  });
}

export default useUpdateUserProfil;
