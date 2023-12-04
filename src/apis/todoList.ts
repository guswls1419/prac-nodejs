import { AxiosRequestConfig } from 'axios';
import todoListClient from './client/todoList';

export const getTodoList = (config?: AxiosRequestConfig) => {
  return todoListClient.get('/list', config).then((res) => res.data);
};

export const getDetailTodo = (id?: string) => {
  return todoListClient.get(`/list/detail/${id}`).then((res) => res.data);
};

export const getCreateTodo = (data: any) => {
  return todoListClient.post('/list', data).then((res) => res.data);
};

export const getUpdateTodo = (data: any) => {
  return todoListClient.put('/list', data).then((res) => res.data);
};

export const getDeleteTodo = (id?: string) => {
  return todoListClient.delete(`/list/${id}`).then((res) => res.data);
};
