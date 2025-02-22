import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const res = await fetch("http://localhost:5000/tasks");
        const data = await res.json();
        setTasks(data);
    };

    const moveTask = async (task, newCategory) => {
        const updatedTask = { ...task, category: newCategory, timestamp: new Date().toISOString() };

        setTasks((prevTasks) =>
            prevTasks.map((t) => (t._id === task._id ? updatedTask : t))
        );

        await fetch(`http://localhost:5000/tasks/${task._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTask),
        });
    };

    const updateTask = async (task) => {
        const newTitle = prompt("Edit Task Title:", task.title);
        if (!newTitle) return;

        const updatedTask = { ...task, title: newTitle };
        const res = await fetch(`http://localhost:5000/tasks/${task._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTask),
        });

        if (res.ok) {
            setTasks(tasks.map((t) => (t._id === task._id ? updatedTask : t)));
            toast.success("Task updated!");
        }
    };

    const deleteTask = async (id) => {
        if (!window.confirm("Are you sure?")) return;

        const res = await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
        if (res.ok) {
            setTasks(tasks.filter((t) => t._id !== id));
            toast.success("Task deleted!");
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="grid grid-cols-3 gap-4">
                {["To-Do", "In Progress", "Done"].map((category) => (
                    <TaskColumn
                        key={category}
                        category={category}
                        tasks={tasks.filter((task) => task.category === category)}
                        moveTask={moveTask}
                        updateTask={updateTask}
                        deleteTask={deleteTask}
                    />
                ))}
            </div>
        </DndProvider>
    );
};

const TaskColumn = ({ category, tasks, moveTask, updateTask, deleteTask }) => {
    const [{ isOver }, drop] = useDrop({
        accept: "TASK",
        drop: (item) => moveTask(item, category),
        collect: (monitor) => ({ isOver: !!monitor.isOver() }),
    });

    return (
        <div
            ref={drop}
            className={`p-4 bg-gray-100 rounded-md shadow-lg ${
                isOver ? "bg-blue-200" : ""
            }`}
        >
            <h2 className="text-lg font-bold mb-2">{category}</h2>
            {tasks.map((task) => (
                <TaskItem
                    key={task._id}
                    task={task}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                />
            ))}
        </div>
    );
};

const TaskItem = ({ task, updateTask, deleteTask }) => {
    const [{ isDragging }, drag] = useDrag({
        type: "TASK",
        item: task,
        collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
    });

    return (
        <div
            ref={drag}
            className={`p-3 bg-white shadow-md rounded-md flex justify-between items-center mb-2 ${
                isDragging ? "opacity-50" : ""
            }`}
        >
            <div>
                <p className="font-semibold">{task.title}</p>
                <p className="text-xs text-gray-500">
                    {new Date(task.timestamp).toLocaleString()}
                </p>
            </div>
            <div>
                <button onClick={() => updateTask(task)} className="text-blue-500 mr-2">
                    Edit
                </button>
                <button onClick={() => deleteTask(task._id)} className="text-red-500">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Tasks;
