import express from 'express';
import dayjs from 'dayjs';
import TodoList from '../schemas/todoList.js';
import makeError from '../error/error.js';

const timestamp = dayjs().valueOf();
const router = express.Router();

//todo생성
router.post('/list', async (req, res, next) => {
  try {
    const todoList = await TodoList.find();
    const { tag, title, content } = req.body;

    const createdTodoList = await TodoList.create({
      tag,
      title,
      content,
      isChecked: false,
      createdAt: timestamp,
      id:
        todoList.length === 0
          ? 1
          : Number(todoList[todoList.length - 1].id) + 1,
    });

    res.json({ todoList: createdTodoList });
  } catch (err) {
    next(err);
  }
});

//todo 전체조회
router.get('/list', async (req, res, next) => {
  try {
    const todoList = await TodoList.find();

    const results = {
      total: todoList.length,
      list: todoList.map((item) => {
        return {
          isChecked: item.isChecked,
          title: item.title,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt || null,
          id: item.id,
        };
      }),
    };

    res.json(results);
  } catch (err) {
    next(err);
  }
});

//todo 상세조회
router.get('/list/detail/:id', async (req, res, next) => {
  try {
    const todoList = await TodoList.find();
    const { id } = req.params;

    const findTodo = todoList.find((item) => item.id === id);

    res.json(findTodo);
  } catch (err) {
    next(err);
  }
});

//todo 수정
router.put('/list', async (req, res, next) => {
  try {
    const { id, ...rest } = req.body;

    const existsTodos = await TodoList.find({ id });

    if (existsTodos.length) {
      await TodoList.updateOne({ id }, { $set: { ...rest } });
    }

    res.json({ result: 'success' });
  } catch (err) {
    next(err);
  }
});

//todo 삭제
router.delete('/list/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    // if (!id) {
    //   throw new makeError({ message: 'id 값이 없습니다.', code: 400 });
    // }

    const existsTodoList = await TodoList.find({ id });
    if (existsTodoList.length > 0) {
      await TodoList.deleteOne({ id });
    } else {
      throw new makeError({
        message: '해당 id에 대한 todo가 없습니다.',
        code: 404,
      });
    }

    res.json({ result: 'success' });
  } catch (err) {
    next(err);
  }
});

export default router;
