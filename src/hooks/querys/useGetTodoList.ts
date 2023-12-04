import { todoListAPI } from '../../apis';
import { useQuery } from '@tanstack/react-query';

const useGetTodoList = () => {
  return useQuery({
    queryKey: ['todoList', 'all'],
    queryFn: () => todoListAPI.getTodoList(),
  });
};

export default useGetTodoList;
