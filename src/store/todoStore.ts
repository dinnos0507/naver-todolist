import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Todo = {
  id: number
  text: string;
  done: boolean;
  date: string;
}
type TodoStore = {
  todos: Todo[];
  counter: number
  addTodo: (text: string) => void;
  removeTodo: (index: number) => void;
  toggleTodo: (index: number) => void;
  clearTodos: () => void;
}

const useTodoStore = create<TodoStore>()(
  persist<TodoStore>(
    (set) => ({
      todos: [],
      counter : 0,

      addTodo: (text) =>
        set((state) => { 
          const newTodo: Todo = {
            id: state.counter,
            text,
            done: false,
            date: new Date().toISOString(),
          }

          return {
            todos: [newTodo, ...state.todos],
            counter: state.counter +1,
          }
        }),
      removeTodo: (index) =>
        set((state) => ({
          todos: state.todos.filter((_, i) => i !== index),
        })),
      toggleTodo: (index) =>
        set((state) => { 
          const todos = [...state.todos]
          const todo = { ...todos[index], done: !todos[index].done }
          
          todos.splice(index, 1)
          
          if (todo.done) {
            const firstDoneIndex = todos.findIndex((t) => t.done)
            if (firstDoneIndex === -1) {
              todos.push(todo)
            } else {
              todos.splice(firstDoneIndex,0,todo)
            } 
          } else {
            todos.unshift(todo)
          }

          return {todos}
        }),
      clearTodos: () => set({todos: [], counter: 0}),
    }),
    {
      name: "todo-storage",
    }
  )
)

export default useTodoStore;