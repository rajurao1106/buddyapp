import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

export default function App() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [data, setData] = useState([]);
  const listRef = useRef(null);

  // Initialize Socket.IO client
  const socket = io("http://localhost:3002"); // Use your backend URL

  useEffect(() => {
    // Fetch existing tasks
    const fetchTasks = () => {
      axios
        .get("http://localhost:3002/taskmanager/alltasks")
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchTasks();

    // Scroll to the bottom of the list whenever data changes
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [data]);

  useEffect(() => {
    // Listen for real-time updates from the server
    socket.on("taskAdded", (newTask) => {
      setData((prevData) => [...prevData, newTask]); // Update tasks in real-time
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const task = {
      title: taskTitle,
      description: taskDescription,
    };

    try {
      await axios.post("http://localhost:3002/taskmanager/newtask", task); // Add task
      setTaskDescription("");
      setTaskTitle("");
    } catch (error) {
      console.error("There was an error adding the task!", error);
    }
  };

  return (
    <div className="w-full h-screen p-5 bg-blue-500">
      <div className="w-full h-[100%] rounded shadow-md flex max-md:flex-col-reverse bg-white">
        <div className="w-full h-[100%]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full items-center h-[100%]"
          >
            <div className="w-full p-10 max-md:p-5 flex flex-col gap-5">
              <input
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Enter Your Name"
                type="text"
                className="w-full h-[60px] max-md:h-[50px] pl-5 border-gray-500 border-2 rounded-xl"
              />
              <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Enter Your Message"
                className="w-full h-[250px] max-md:h-[70px] p-5 border-gray-500 border-2 rounded-xl"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 w-[40%] p-2 rounded-md text-white font-semibold text-xl max-md:mb-5"
            >
              Add Task
            </button>
          </form>
        </div>
        <div className="w-full h-[100%] overflow-y-auto p-1" ref={listRef}>
          <ul>
            {data.map((item) => (
              <li key={item._id} className="p-2 border-b bg-blue-500 m-5 text-white rounded-xl rounded-es-sm">
                <h3 className="text-lg font-semibold pl-5">{item.title}</h3>
                <p className="pl-5">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
