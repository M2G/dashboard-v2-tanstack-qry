import { useQuery } from '@tanstack/react-query';
import { getConcertsService } from '@/services/concerts/concerts';

interface IUseConcertList {
  filters: string;
  page: number;
  pageSize: number;
}
function useChangePassword({ filters, page, pageSize }: IUseConcertList) {
  return useQuery({
    cacheTime: 0,
    enabled: !!page && !!pageSize,
    queryFn: () =>
      getConcertsService({
        filters,
        page,
        pageSize,
      }),
    queryKey: ['concertList'],
    staleTime: Infinity,
  });
}

export default useChangePassword;
