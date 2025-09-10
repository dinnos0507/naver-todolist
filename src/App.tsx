import "./App.css";
import { useState } from "react";
import { Check , X} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "./components/ui/input";
import useTodoStore from "./store/todoStore";

const Page = () => {
  const [input, setInput] = useState("");
  
  const { todos, addTodo, removeTodo } = useTodoStore();

  const handleAdd = () => {
    if (input.trim() === "") return;
    addTodo(input.trim());
    setInput("");
  }
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#67C090] to-[#26667F] flex items-center justify-center p-10">
      <div className="max-w-3xl p-4 bg-[#DDF4E7] shadow-lg rounded-lg">
        <h2 className="flex items-center text-xl font-bold mb-4 text-gray-800">
          <Check className="text-green-400" size={30} /> Todo List
        </h2>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add your new todo..."
            className="flex-1 px-3 py-2 border text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67C090]"
          />
          <Button
            onClick={handleAdd} 
            variant="secondary" 
            size="sm"
            className="px-4 py-2 
            min-w-[60px] 
           text-black rounded-lg transition"
          >
            Add
          </Button>
        </div>

        {/* List */}
        <ul className="space-y-1.5 pb-1 ">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-1 bg-gray-100 rounded-lg hover:border-gray-300 hover:border-1" 
            >
              <span className="text-black ">{todo}</span>
              <Button
                onClick={() => removeTodo(index)}
                variant="default"
                size="xs"
                className="text-gray-500 border-1 border-gray-300 hover:text-red-700 hover:bg-rose-300 "
              >
                <X/>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
