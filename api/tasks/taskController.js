import asyncHandler from "express-async-handler";
import Task from "./TaskModel.js";
import checkRequired from "../../utils/checkRequired.js";

// @desc    Fetch all tasks
// @route   GET /api/tasks
// @access  Public
const getTasks = asyncHandler(async (req, res) => {
  try {
    const pageSize = Number(process.env.LIMIT) || 10;
    const page = Number(req.query.pageNumber) || 1;
    let searchParams = {};
    searchParams["published_status"] = "PUBLISHED";
    if (req.query.search) {
      const searchQ = req.query.search;
      const newQData = {};
      Object.keys(searchQ).map((item) => {
        newQData[item] = {
          $regex: searchQ[item],
          $options: "i",
        };
      });
      searchParams = { ...searchParams, ...newQData };
    }
    if (req.query.exact) {
      const exactQ = req.query.exact;
      searchParams = { ...searchParams, ...exactQ };
    }
    if (req.query.conditional) {
      const conditionalQ = req.query.conditional;
      searchParams = { ...searchParams, ...conditionalQ };
    }
    const count = await Task.countDocuments({ ...searchParams });
    const tasks = await Task.find({ ...searchParams })
      .limit(pageSize)
      .populate("parent_task")
      .populate("created_by", "_id, name")
      .populate("updated_by", "_id, name")
      .skip(pageSize * (page - 1))
      .sort({ published_date: -1 });

    res.json({
      tasks,
      page,
      pages: Math.ceil(count / pageSize),
      count: count,
    });
  } catch (error) {
    console.log(error);
    res.status(502);
    throw new Error("Something Went wrong");
  }
});
// @desc    Fetch all tasks
// @route   GET /api/tasks/all
// @access  Public
const getAllTasks = asyncHandler(async (req, res) => {
  try {
    const page = Number(req.query.pageNumber) || 1;
    let searchParams = {};
    searchParams["published_status"] = "PUBLISHED";
    if (req.query.term && req.query.value) {
      // searchParams[req.query.term] = req.query.value;
      searchParams[req.query.term] = {
        $regex: req.query.value,
        $options: "i",
      };
    }
    const tasks = await Task.find({ ...searchParams })
      .populate("parent_task")
      .limit(100)
      .skip(100 * (page - 1))
      .sort({ published_date: -1 });
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(502);
    throw new Error("Something Went wrong");
  }
});


const getTaskBySlug = asyncHandler(async (req, res) => {
  try {
    const tasks = await Task.find({ slug: req.params.slug })
      .populate("parent_task")
      .populate({
        path: 'reviews',
        match: { approved: { $eq: true } },
      });
    if (tasks.length > 0) {
      res.json(tasks[0]);
    } else {
      res.status(502);
      throw new Error('No Task  Find');
    }
  } catch (error) {
    console.log(error);
    res.status(502);
    throw new Error('Something Went wrong');
  }
});

// @desc    Fetch single task
// @route   GET /api/tasks/:id
// @access  Public
const getTaskById = asyncHandler(async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("parent_task")
      .populate("created_by", "_id, name")
      .populate("updated_by", "_id, name");

    if (task && task.published_status === "PUBLISHED") {
      res.json(task);
    } else {
      res.status(404);
      throw new Error("Task not found");
    }
  } catch (error) {
    console.log(error);
    res.status(502);
    throw new Error("Something Went Wrong");
  }
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private/Admin
const deleteTask = asyncHandler(async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (task) {
      await task.remove();
      res.json({ message: "Task removed" });
    } else {
      res.status(404);
      throw new Error("Task not found");
    }
  } catch (error) {
    console.log(error);
    res.status(502);
    throw new Error("Something Went Wrong");
  }
});

// @desc    Create a task
// @route   POST /api/tasks
// @access  Private/Admin
const createTask = asyncHandler(async (req, res) => {
  try {
    var data = checkRequired(req.body);
    if (req.user) {
      // data.created_by = req.user._id;
    }
    const task = new Task(data);
    const createdTask = await task.save();

    res.status(201).json(createdTask);
  } catch (error) {
    res.status(502);
    throw new Error("Something Went Wrong. Please try again");
  }
});

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  try {
    var feed = checkRequired(req.body);
    if (req.user) {
      feed.updated_by = req.user._id;
    }

    const data = await Task.findById(req.params.id);
    if (data) {
      Object.keys(feed).map((item, index) => {
        data[item] = feed[item];
      });
      const updatedTask = await data.save();
      res.json(updatedTask);
    } else {
      res.status(404);
      throw new Error("Task not found");
    }
  } catch (error) {
    console.log(error);
    res.status(502);
    throw new Error("Something Went Wrong.");
  }
});

export {
  getTasks,
  getTaskById,
  getTaskBySlug,
  deleteTask,
  createTask,
  updateTask,
  getAllTasks,
};
