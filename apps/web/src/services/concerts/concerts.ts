import { AxiosResponse } from 'axios';
import api from '@/api2';

function getConcertService(id: string): Promise<AxiosResponse> {
  return api.get(`/concerts/${id}`);
}

function getConcertsService({
  filters,
  page,
  pageSize,
}: {
  filters: string;
  page: number;
  pageSize: number;
}): Promise<AxiosResponse> {
  return api.get(
    `/concerts${
      filters
        ? `?filters=${filters}&page=${page}&pageSize=${pageSize}`
        : `?page=${page}&pageSize=${pageSize}`
    }`,
  );
}

export { getConcertService, getConcertsService };
