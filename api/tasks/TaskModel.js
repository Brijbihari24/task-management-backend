import mongoose from "mongoose";
import AutoIncrementField from "mongoose-sequence";
const AutoIncrement = AutoIncrementField(mongoose);
import { inputFields } from "./tasks_enum.js";
import generateFields from "../../utils/generatedFields.js";
const modalFields = generateFields(inputFields);

const taskSchema = mongoose.Schema(
  {
    ...modalFields,
    // dynamic_task: {
    //   field: {
    //     type: String,
    //     required: false,
    //   },
    //   condition: {
    //     type: String,
    //     required: false,
    //   },
    //   value: {
    //     type: Number,
    //     required: false,
    //   },
    // },
  },
  {
    timestamps: true,
  }
);

taskSchema.plugin(AutoIncrement, {
  inc_field: "task_id",
  start_seq: 1000,
});

const Collection = mongoose.model("Task", taskSchema);

export default Collection;
