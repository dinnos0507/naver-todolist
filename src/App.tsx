import "./App.css";
import { useState } from "react";
import { Check , X} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "./components/ui/input";
import {Checkbox} from "@/components/ui/checkbox"
import { motion, AnimatePresence } from "framer-motion"

import useTodoStore from "./store/todoStore";

function checkLate(date: string): boolean {
  const createdAt = new Date(date).getTime()
  const diff = Date.now() - createdAt
  const oneDay = 1
  return diff > oneDay
}

function formatDate(date: string) {
  return new Date(date).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })
}

const Page = () => {
  const [input, setInput] = useState("");
  
  const { todos, addTodo, removeTodo, toggleTodo} = useTodoStore();

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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAdd();
              }
            }}
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
          <AnimatePresence>
            {todos.map((todo, index) => (
              <motion.li
                key={todo.text + todo.date}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              className={`flex justify-between items-center p-1 rounded-lg hover:border-gray-300 border-1
                ${todo.done ? "bg-green-300" 
                  : checkLate(todo.date)
                  ? "bg-amber-300"
                  : "bg-gray-100"
                }
                `} >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={todo.done}
                      onCheckedChange={() => toggleTodo(index)}
                      className="w-4 h-4 accent-green-500 cursor-pointer"
                      /> 
                    <div className="flex flex-col">
                      <span className={`text-black ${todo.done ? "line-through text-gray-500" : ""} `}>
                        {todo.text}
                      </span>
                      <div className="text-xs text-gray-500 line-clamp-1 ">
                        {formatDate(todo.date)}
                      </div>
                    </div>
                  </div>
                  <Button
                      onClick={() => removeTodo(index)}
                      variant="default"
                      size="xs"
                      className="text-gray-500 border-1 border-gray-300 hover:text-red-700 hover:bg-rose-300 "
                      >
                      <X/>
                  </Button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
};

export default Page;
