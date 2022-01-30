import { Todo } from '../../model';
import { FiEdit3, FiDelete } from 'react-icons/fi';
import { MdDone } from 'react-icons/md';
import './ToDone.css';
import React, { useEffect, useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const ToDone = ({ index, todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          className='toDone'
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className='toDone--text'
            />
          ) : todo.isDone ? (
            <s className='toDone--text'>{todo.todo}</s>
          ) : (
            <span className='toDone--text'>{todo.todo}</span>
          )}
          <div>
            <span className='icon' onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
            <span
              className='icon'
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <FiEdit3 />
            </span>
            <span className='icon' onClick={() => handleDelete(todo.id)}>
              <FiDelete />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default ToDone;