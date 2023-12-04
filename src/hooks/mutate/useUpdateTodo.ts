import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoListAPI } from '../../apis';
import { useNavigate } from 'react-router-dom';
import useToast from '../store/useToast';

const useUpdateTodo = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: todoListAPI.getUpdateTodo,
    onSuccess: () => {
      showToast('수정이 완료되었습니다.');
      navigate('/');
    },
    onError: (err: any) => {
      showToast(err);
    },
  });
};

export default useUpdateTodo;
