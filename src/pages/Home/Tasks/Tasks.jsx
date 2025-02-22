import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
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

    const moveTask = async (task, newCategory, newIndex = null) => {
        const updatedTasks = [...tasks];
        const oldIndex = updatedTasks.findIndex((t) => t._id === task._id);

        if (oldIndex !== -1) {
            updatedTasks.splice(oldIndex, 1);
        }

        if (newIndex !== null) {
            updatedTasks.splice(newIndex, 0, { ...task, category: newCategory });
        } else {
            updatedTasks.push({ ...task, category: newCategory });
        }

        setTasks(updatedTasks);

        await fetch(`http://localhost:5000/tasks/${task._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...task, category: newCategory }),
        });
    };

    const updateTask = async (task) => {
        Swal.fire({
            title: "Edit Task",
            html:
                `<input id='swal-input1' class='swal2-input' value='${task.title}' placeholder='Title'>` +
                `<textarea id='swal-input2' class='swal2-textarea' placeholder='Description'>${task.description}</textarea>`,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
                const newTitle = document.getElementById("swal-input1").value;
                const newDescription = document.getElementById("swal-input2").value;
                return { newTitle, newDescription };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedTask = { ...task, title: result.value.newTitle, description: result.value.newDescription };
                fetch(`http://localhost:5000/tasks/${task._id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedTask),
                }).then((res) => {
                    if (res.ok) {
                        setTasks(tasks.map((t) => (t._id === task._id ? updatedTask : t)));
                        toast.success("Task updated!");
                    }
                });
            }
        });
    };

    const deleteTask = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" }).then((res) => {
                    if (res.ok) {
                        setTasks(tasks.filter((t) => t._id !== id));
                        toast.success("Task deleted!");
                    }
                });
            }
        });
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 p-4 h-[90vh] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
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
        <div ref={drop} className={`p-4 rounded-md shadow-lg bg-white border border-gray-300 h-[85vh] ${isOver ? "bg-yellow-200" : ""}`}>
            <h2 className="text-xl font-bold text-green-800 mb-4">{category}</h2>
            {tasks.map((task, index) => (
                <TaskItem key={task._id} task={task} index={index} moveTask={moveTask} updateTask={updateTask} deleteTask={deleteTask} category={category} />
            ))}
        </div>
    );
};

const TaskItem = ({ task, index, moveTask, updateTask, deleteTask, category }) => {
    const [{ isDragging }, drag] = useDrag({
        type: "TASK",
        item: { ...task, index },
        collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
    });

    const [, drop] = useDrop({
        accept: "TASK",
        hover: (draggedItem) => {
            if (draggedItem._id !== task._id && draggedItem.category === category) {
                moveTask(draggedItem, category, index);
                draggedItem.index = index;
            }
        },
    });

    return (
        <div ref={(node) => drag(drop(node))} className={`p-4 bg-white shadow-lg rounded-md flex justify-between items-center mb-2 transition-all transform ${isDragging ? "opacity-50" : "hover:scale-105"}`}>
            <div className="cursor-move text-xl text-gray-700 pr-2">☰</div>
            <div>
                <p className="font-bold text-green-800">{task.title}</p>
                <p className="text-sm text-gray-600">{task.description || "No description"}</p>
                <p className="text-xs text-gray-400">{new Date(task.timestamp).toLocaleString()}</p>
            </div>
            <div>
                <button onClick={() => updateTask(task)} className="text-yellow-600 font-bold mr-2">Edit</button>
                <button onClick={() => deleteTask(task._id)} className="text-red-600 font-bold">Delete</button>
            </div>
        </div>
    );
};

export default Tasks;
