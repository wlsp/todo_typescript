import { useRef } from 'react';
import './InputField.css';

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className='input-container'
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type='text'
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder='Enter a TODO'
        className='input'
      />
      <button className='cssbuttons-io-button' type='submit'>
        {' '}
        ADD
        <div className='icon'>
          <svg
            height='24'
            width='24'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M0 0h24v24H0z' fill='none'></path>
            <path
              d='M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z'
              fill='currentColor'
            ></path>
          </svg>
        </div>
      </button>
    </form>
  );
};

export default InputField;
