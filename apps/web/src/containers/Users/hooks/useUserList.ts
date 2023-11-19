import { useQuery } from '@tanstack/react-query';
import { getUsersService } from '@/services/auth';

interface IUserList {
  filters: string;
  page: number;
  pageSize: number;
}

function useUserList({ filters, page, pageSize }: IUserList) {
  return useQuery({
    cacheTime: 30000,
    enabled: !!page && !!pageSize,
    queryFn: () =>
      getUsersService({
        filters,
        page,
        pageSize,
      }),
    queryKey: ['userList', filters, page, pageSize],
    staleTime: Infinity,
  });
}

export default useUserList;
