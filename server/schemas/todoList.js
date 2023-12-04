import mongoose from 'mongoose';

const todoListSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  isChecked: {
    type: Boolean,
  },
  createdAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
  id: {
    type: String,
    unique: true,
  },
});

export default mongoose.model('TodoList', todoListSchema);
