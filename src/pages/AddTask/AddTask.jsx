import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const AddTask = () => {
    const [task, setTask] = useState({
        title: '',
        description: '',
        category: 'To-Do'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!task.title.trim()) {
            toast.error("Title is required!");
            return;
        }
        if (task.title.length > 50) {
            toast.error("Title must be 50 characters or less!");
            return;
        }
        if (task.description.length > 200) {
            toast.error("Description must be 200 characters or less!");
            return;
        }

        const newTask = {
            ...task,
            timestamp: new Date().toISOString()
        };

        const res = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        });

        const data = await res.json();

        if (res.ok) {
            toast.success("Task added successfully!");
            setTask({ title: '', description: '', category: 'To-Do' });
            Swal.fire({
                title: "Success!",
                text: "Your task has been added successfully!",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK"
            });
        } else {
            toast.error(data.message || "Failed to add task");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-2xl rounded-2xl border border-gray-200 my-[7rem]">
            <h2 className="text-2xl font-extrabold text-green-800 mb-4 text-center">Add Task</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-yellow-600 font-semibold mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
                        maxLength="50"
                        required
                    />
                </div>
                <div>
                    <label className="block text-yellow-600 font-semibold mb-1">Description</label>
                    <textarea
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
                        maxLength="200"
                    ></textarea>
                </div>
                <div>
                    <label className="block text-yellow-600 font-semibold mb-1">Category</label>
                    <select
                        name="category"
                        value={task.category}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
                    >
                        <option value="To-Do">To-Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-800 text-white py-3 rounded-lg font-bold transition duration-300 hover:bg-yellow-600 hover:text-black"
                >
                    Add Task
                </button>
            </form>
        </div>
    );
};

export default AddTask;
