import React from 'react';
import styled from 'styled-components';
import Delete from '../icons/Delete';
import NextIcon from '../icons/NextIcon';
import { Link, useNavigate } from 'react-router-dom';
import { listDefaultValues } from '../../data/defaultValues';
import AddButton from './AddButton';
import useGetTodoList from '../../hooks/querys/useGetTodoList';
import dayjs from 'dayjs';
import useToast from '../../hooks/store/useToast';
import useDeleteTodo from '../../hooks/mutate/useDeleteTodo';

const TodoList = () => {
  const navigate = useNavigate();
  const { data } = useGetTodoList();
  const { showToast } = useToast();

  const { mutate: deleteTodo } = useDeleteTodo();

  const handleDeleteTodo = (id: string) => {
    if (id) {
      deleteTodo(id);
    } else {
      showToast('id가 없습니다.');
    }
  };

  return (
    <Container>
      <div>
        <AddButton />
        <TodoListBox>
          <TotalBox>total : {data?.total || 0}</TotalBox>
          <ListContainer>
            {data?.list.length > 0 &&
              data?.list.map((item: any) => {
                return (
                  <ListItem key={item.id}>
                    <DeleteButton onClick={() => handleDeleteTodo(item.id)}>
                      <Delete />
                    </DeleteButton>
                    <StyledLabel htmlFor={item.id}>
                      {/* <StyledInput
                        type="checkbox"
                        checked={item.isChecked}
                        id={item.id}
                        name={item.id}
                      /> */}
                      <Title isChecked={item.isChecked}>{item.title}</Title>
                      <DateBox>
                        {dayjs(Number(item.createdAt)).format(
                          'YYYY-MM-DD HH:mm:ss',
                        )}
                      </DateBox>
                    </StyledLabel>

                    <Button
                      onClick={() => {
                        navigate(`/todo/${item.id}`, {
                          state: { type: 'detail' },
                        });
                      }}
                    >
                      <NextIcon />
                    </Button>
                  </ListItem>
                );
              })}
          </ListContainer>
        </TodoListBox>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 78px;
`;

const TotalBox = styled.div`
  font-family: Inter;
  font-size: 24px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: start;
  color: #5e5e5e;
`;

const TodoListBox = styled.div`
  width: 800px;
  height: 514px;
  border-radius: 20px;
  border: 1px solid #b47aea;
  padding: 20px 64px;
`;

const ListContainer = styled.div`
  margin-top: 46px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid #7f42b8;
  border-radius: 0.35rem;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #b47aea;
  }
`;

const Button = styled.button`
  border: none;
  background: none;
  text-decoration: none;
  color: #000;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  margin-right: 21px;
  cursor: pointer;
`;

const Title = styled.div<{ isChecked: boolean }>`
  font-size: 22px;
  font-weight: 500;
  letter-spacing: 0em;
  text-align: left;
  margin-left: 21px;
  margin-right: 36px;
  width: 436px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: ${({ isChecked }) => (isChecked ? 'line-through' : 'none')};
  color: ${({ isChecked }) => (isChecked ? '#7F42B8' : '#000')};
`;

const DateBox = styled.div`
  width: 180px;
  font-family: Inter;
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: start;
  margin-right: 16px;
`;

export default TodoList;
