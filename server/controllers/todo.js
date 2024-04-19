import Todo from '../models/Todo.js'
export const createTodo = async (req, res) => {
    try {
        const { title, createdAt } = req.body
        const user_id = req.user.userid._id
        if (!title) {
            return res.status(500).json({
                success: false,
                message: 'todo is empty'
            })
        }
        const todo = new Todo({
            title: title,
            user_id: user_id,
            createdAt: createdAt
        })
        const response = await todo.save()
        if (response) {
            res.status(200).json({
                success: true,
                message: 'todo created successfully'
            })
        } else {
            res.status(200).json({
                success: false,
                message: 'cannot save todo in DB'
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
export const deleteTodo = async (req, res) => {
    try {
        const { todoid } = req.params
        if (!todoid) {
            res.status(500).json({
                success: false,
                message: "can't find todoid"
            })
        }
        const deletedTodo = await Todo.findByIdAndDelete(todoid)
        if (!deletedTodo) {
            res.status(500).json({
                success: false,
                message: 'todo deletion failed'
            })
        } else {
            res.status(200).json({
                success: true,
                message: 'todo deleted successfully',
                deletedTodo
            })
        }
    } catch (error) {
        throw new Error(error.message || 'Error')
    }
}
export const editTodo = async (req, res) => {
    try {
        const { todoid } = req.params
        const { title } = req.body
        if (!todoid) {
            res.status(500).json({
                success: false,
                message: "can't find todoid"
            })
        }
        // TODO: check if todo is present in DB
        const todo = await Todo.findByIdAndUpdate(todoid, {
            title: title
        })
        if (!todo) {
            res.status(500).json({
                success: false,
                message: 'todo updation failed'
            })
        }
        res.status(200).json({
            success: true,
            message: 'todo updated successfully'
        })
    } catch (error) {
        throw new Error(error.message)
    }
}
export const getTodos = async (req, res) => {
    try {
        const user_id = req.user.userid._id
        const username = req.user.name
        const todos = await Todo.find({ user_id })
        if (!todos) {
            res.status(500).json({
                success: false,
                message: 'todos fetching failed'
            })
        }
        res.status(200).json({
            success: true,
            message: 'todos fetching successfully',
            todos,
            username
        })
    } catch (error) {
        res.status(404).json({
            error: error.message
        })
    }
}
export const getTodo = async (req, res) => {
    try {
        const { todoid } = req.params
        if (!todoid) {
            res.status(200).json({
                success: false,
                message: "can't find todoid"
            })
        }
        const todo = await Todo.findById(todoid)
        if (!todo) {
            res.status(200).json({
                success: false,
                message: 'todo fetching failed'
            })
        } else {
            res.status(200).json({
                success: true,
                message: 'todo fetching successfully',
                todo
            })
        }
    } catch (error) {
        throw new Error(error.message)
    }
}
export const createTask = async (req, res) => {
    try {
        const { todoid } = req.params;
        const { name } = req.body.task; // Changed to match the new schema
        const task = { name, completed: false }; // Ensure consistency with the schema

        if (!todoid) {
            return res.status(400).json({
                success: false,
                message: "Todo ID is required"
            });
        }

        const todo = await Todo.findById(todoid);
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        todo.tasks.push(task);
        await todo.save();

        res.status(200).json({
            success: true,
            message: "Task added successfully",
            task // Sending back the task added
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
export const deleteTask = async (req, res) => {
    try {
        const { todoid } = req.params;
        const { taskId } = req.body;
    // console.log(req.params,taskId);
        if (!todoid) {
            return res.status(400).json({
                success: false,
                message: "Todo ID is required"
            });
        }

        if (!taskId) {
            return res.status(400).json({
                success: false,
                message: "Task ID is required"
            });
        }

        const todo = await Todo.findById(todoid);
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }
       
        const updatedTasks = todo.tasks.filter(task => task._id.toString() !== taskId);
        // console.log(updatedTasks);
        if (updatedTasks.length === todo.tasks.length) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        todo.tasks = updatedTasks;
        await todo.save();

        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
export const getTasks = async (req, res) => {
    try {
        const { todoid } = req.params
        if (!todoid) {
            res.status(500).json({
                success: false,
                message: "can't find todoid"
            })
        }
        const todo = await Todo.findById(todoid)
        res.status(200).json({
            success: true,
            message: "task fethched successfully",
            tasks: todo.tasks,
            title: todo.title
        })
    } catch (error) {
        throw new Error(error.message)
    }
}
export const markdone = async (req, res) => {
    const { todoid } = req.params;
    const { taskName, completed } = req.body;
    // console.log();
    try{
        // Find the todo by ID
        const todo = await Todo.findById(todoid);

        if (!todo) {
            return res.status(404).json({ success: false, message: 'Todo not found' });
        }

        // Find the task within the todo's tasks array and update its status
        const task = todo.tasks.find(task => task.name === taskName);

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        // Update the task status
        task.completed = completed;

        // Save the updated todo
        await todo.save();

        res.status(200).json({ success: true, message: 'Task status updated successfully' });
    } catch (error) {
        console.error('Error updating task status:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
export const sortTodo = async (req, res) => {
    try {
        const user_id = req.user.userid._id
        const { order } = req.query
        const todos = await Todo.find({ user_id }).sort({ 'createdAt': order })
        res.status(200).json({
            success: true,
            message: "todos sorted successfully",
            todos
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}