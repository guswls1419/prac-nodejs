import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoListAPI } from '../../apis';
import { useNavigate } from 'react-router-dom';
import useToast from '../store/useToast';

const useDeleteTodo = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: todoListAPI.getDeleteTodo,
    onSuccess: () => {
      showToast('삭제가 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['todoList', 'all'] });
    },
    onError: (err: any) => {
      showToast(err);
    },
  });
};

export default useDeleteTodo;
