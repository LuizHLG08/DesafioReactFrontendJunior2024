import { ITodo, ITodoContext } from "../../interfaces"

export const mockTodoList : ITodo[] = [
    { id: '1', title: 'Test Todo 1', isDone: false },
    { id: '2', title: 'Test Todo 2', isDone: true }
]

export const mockContext : ITodoContext = {
    todoList: mockTodoList,
    backupTodoList: mockTodoList,
    addTodo: jest.fn() ,
    allCompleted: false,
    clearCompleted: jest.fn(),
    editTodo: jest.fn(),
    getActiveTodos: jest.fn(),
    getAllTodos: jest.fn(),
    getCompletedTodos: jest.fn(),
    leftTodos: 1,
    removeTodo: jest.fn(),
    toggleAllTodos: jest.fn()
  };

export const mockContextEmpty : ITodoContext = {
    todoList: [] as ITodo[],
    backupTodoList: [] as ITodo[],
    addTodo: jest.fn() ,
    allCompleted: false,
    clearCompleted: jest.fn(),
    editTodo: jest.fn(),
    getActiveTodos: jest.fn(),
    getAllTodos: jest.fn(),
    getCompletedTodos: jest.fn(),
    leftTodos: 0,
    removeTodo: jest.fn(),
    toggleAllTodos: jest.fn()
}