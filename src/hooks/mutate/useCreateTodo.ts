import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoListAPI } from '../../apis';
import { useNavigate } from 'react-router-dom';
import useToast from '../store/useToast';

const useCreateTodo = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: todoListAPI.getCreateTodo,
    onSuccess: () => {
      showToast('등록이 완료되었습니다.');
      navigate('/');
    },
    onError: (err: any) => {
      showToast(err);
    },
  });
};

export default useCreateTodo;
