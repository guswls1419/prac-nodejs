import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import Delete from '../icons/Delete';
import dayjs from 'dayjs';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGetDetailTodo from '../../hooks/querys/useGetDetailTodo';
import useDeleteTodo from '../../hooks/mutate/useDeleteTodo';
import useCreateTodo from '../../hooks/mutate/useCreateTodo';
import { tagsOption } from '../../data/TodoDataForm';
import useUpdateTodo from '../../hooks/mutate/useUpdateTodo';
import useToast from '../../hooks/store/useToast';

const TodoDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const { showToast } = useToast();

  const pageState = { ...location.state };

  const [selectTag, setSelectTag] = useState('GATHER');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState({ type: '', message: '' });

  const { data } = useGetDetailTodo(params.id || pageState.id);
  const { mutateAsync: deleteTodo } = useDeleteTodo();
  const { mutate: createTodo } = useCreateTodo();
  const { mutate: updateTodo } = useUpdateTodo();

  useEffect(() => {
    if (pageState.type !== 'edit' || !data) return;

    if (data) {
      setSelectTag(data.tag);
      setTitle(data.title);
      setContent(data.content);
    }
  }, [data]);

  const findTag = (tag: string) => {
    switch (tag) {
      case 'GATHER':
        return '모임';
      case 'STUDY':
        return '공부';
      case 'TRAVEL':
        return '여행';
      case 'NOTI':
        return '알림';
      case 'HEALTH':
        return '운동';
      default:
        return '업무';
    }
  };

  const handleTagSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectTag(e.target.value);
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxText = new RegExp(`^.{0,${28}}$`);

    if (!maxText.test(e.target.value)) return;

    setTitle(e.target.value);
  };

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const maxText = new RegExp(`^.{0,${600}}$`);

    if (!maxText.test(e.target.value)) return;

    setContent(e.target.value);
  };

  const handleSaveTodo = () => {
    if (title.length === 0) {
      setError({ type: 'title', message: '제목을 입력해 주세요.' });
      return;
    }

    if (content.length === 0) {
      setError({ type: 'content', message: '내용을 입력해 주세요.' });
      return;
    }

    if (pageState.type === 'add') {
      createTodo({
        tag: selectTag,
        title: title,
        content: content,
      });
    } else {
      updateTodo({
        id: data.id,
        tag: selectTag,
        title: title,
        content: content,
      });
    }
  };

  const handleDeleteTodo = () => {
    if (data && data.id) {
      deleteTodo(data.id).then(() => navigate('/'));
    } else {
      showToast('id가 없습니다.');
    }
  };

  return (
    <Container isForm={pageState.type !== 'detail'}>
      <div>
        {pageState.type === 'detail' && (
          <TodoStateBox>
            {/* <StyledInput type="checkbox" checked={data?.isChecked} /> */}
            <DeleteButton onClick={handleDeleteTodo}>
              <Delete />
            </DeleteButton>
            <EditButton
              onClick={() => {
                navigate('/todo/form', {
                  state: { type: 'edit', id: data.id },
                });
              }}
            >
              Edit
            </EditButton>
            <DateBox>
              {dayjs(Number(data?.createdAt)).format('YYYY-MM-DD HH:mm:ss')}
            </DateBox>
          </TodoStateBox>
        )}
        <TagBox>
          <TitleLabel htmlFor="tag">Tag</TitleLabel>
          {pageState.type !== 'detail' ? (
            <select
              name="Tag"
              id="tag"
              onChange={handleTagSelect}
              value={selectTag}
            >
              {tagsOption.map((item) => {
                return (
                  <option key={item.key} value={item.key}>
                    {item.value}
                  </option>
                );
              })}
            </select>
          ) : (
            <Tag>{findTag(data?.tag)}</Tag>
          )}
        </TagBox>

        <TitleBox>
          <TitleLabel>Title</TitleLabel>
          {pageState.type !== 'detail' ? (
            <>
              <StyledTitleInput
                isError={error.type === 'title'}
                type="text"
                onChange={handleTitle}
                value={title}
              />
              <MaxCount>{title.length}/28</MaxCount>
              {error.type === 'title' && <ErrorBox>{error.message}</ErrorBox>}
            </>
          ) : (
            <Title>{data?.title}</Title>
          )}
        </TitleBox>

        <ContentContainer>
          <TitleLabel>Content</TitleLabel>
          {pageState.type !== 'detail' ? (
            <TextareaBox>
              <StyledTextarea
                isError={error.type === 'content'}
                onChange={handleContent}
                value={content}
              />
              <ContentMaxCount>{content.length}/600</ContentMaxCount>
              {error.type === 'content' && <ErrorBox>{error.message}</ErrorBox>}
            </TextareaBox>
          ) : (
            <Content>{data?.content}</Content>
          )}
        </ContentContainer>
        {pageState.type !== 'detail' && (
          <Button onClick={handleSaveTodo}>
            {pageState.type === 'add' ? '작성' : '수정'}완료
          </Button>
        )}
      </div>
    </Container>
  );
};

const Container = styled.div<{ isForm: boolean }>`
  width: 100%;
  display: flex;
  padding-top: ${({ isForm }) => isForm && '100px'};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TodoStateBox = styled.div`
  margin-top: 46px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
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

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const DateBox = styled.div`
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const TagBox = styled.div`
  margin-bottom: 42px;
  display: flex;
  flex-direction: column;
  justify-content: start;

  select {
    width: 160px;
    height: 40px;
    padding: 20px, 24px, 20px, 24px;
    border-radius: 5px;
    border: 1px solid #b47aea;
    gap: 10px;
  }
`;

const Tag = styled.div`
  border-radius: 3px;
  border: 1px solid lightgray;
  background: #edd9ff;
  display: flex;
  max-width: 40px;
  padding: 10px 61px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;

const TitleBox = styled.div`
  margin-bottom: 46px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  position: relative;
`;

const StyledTitleInput = styled.input<{ isError?: boolean }>`
  width: 1024px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid ${({ isError }) => (isError ? '#db1d1d' : '#b47aea')};

  padding: 8px 64px 8px 16px;
  font-family: Noto Sans;
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
`;
const Title = styled.div`
  width: 1024px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid lightgray;
  line-height: 34px;

  padding: 8px 64px 8px 16px;
  font-family: Noto Sans;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0em;
  text-align: left;
`;

const MaxCount = styled.div`
  position: absolute;
  right: 20px;
  top: 46px;
  color: #818181;
  font-size: 14px;
`;

const ContentContainer = styled.div`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const StyledTextarea = styled.textarea<{ isError?: boolean }>`
  resize: none;
  height: 200px;
  width: 97%;
  border-radius: 5px;
  border: 1px solid ${({ isError }) => (isError ? '#db1d1d' : '#b47aea')};
  padding: 16px;
`;

const TextareaBox = styled.div`
  height: 260px;
  position: relative;
`;

const Content = styled.div`
  resize: none;
  height: 200px;
  border-radius: 5px;
  border: 1px solid lightgray;
  padding: 16px;
`;
const ContentMaxCount = styled.div`
  position: absolute;
  right: 20px;
  bottom: 40px;
  color: #818181;
  font-size: 14px;
`;

const TitleLabel = styled.label`
  font-family: Noto Sans;
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 12px;
`;

const Button = styled.button`
  background: #edd9ff;
  border: none;
  padding: 16px 48px;
  color: #000;
  border-radius: 5px;
  float: right;
  clear: both;
  cursor: pointer;

  text-align: center;
  font-family: Noto Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const ErrorBox = styled.div`
  color: #db1d1d;
  padding: 2px 6px;
  font-size: 14px;
`;

export default TodoDetails;
