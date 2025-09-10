import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type TodoStore = {
  todos: string[];
  addTodo: (todo: string) => void;
  removeTodo: (index: number) => void;
}

const useTodoStore = create<TodoStore>()(
  persist<TodoStore>(
    (set) => ({
      todos: [],
      addTodo: (todo) =>
        set((state) => ({
          todos: [...state.todos, todo],
        })),
      removeTodo: (index) =>
        set((state) => ({
          todos: state.todos.filter((_, i) => i !== index),
        })),
    }),
    {
      name: "todo-storage",
    }
  )
)

export default useTodoStore;