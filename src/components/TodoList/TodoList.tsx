import { Droppable } from 'react-beautiful-dnd';
import { Todo } from '../../model';
import ToDone from '../Todo/ToDone';
import './TodoList.css';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <aside className='todos-container'>
      <Droppable droppableId='TodoList'>
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver?'dragactive': ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className='todos__heading'>Active Tasks</span>
            {todos.map((todo, index) => (
              <ToDone
                index={index}
                todo={todo}
                key={todo.id}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId='TodosRemove'>
        {(provided, snapshot) => (
          <div
            className={`todos done ${snapshot.isDraggingOver?'dragcomplete': ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className='todos__heading'>Done Tasks</span>
            {completedTodos.map((todo, index) => (
              <ToDone
                index={index}
                todo={todo}
                key={todo.id}
                todos={completedTodos}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </aside>
  );
};

export default TodoList;