import { todoListAPI } from '../../apis';
import { useQuery } from '@tanstack/react-query';

const useGetDetailTodo = (id?: string) => {
  return useQuery({
    queryKey: ['todoList', 'detail', id],
    queryFn: () => todoListAPI.getDetailTodo(id),
    enabled: !!id,
  });
};

export default useGetDetailTodo;
