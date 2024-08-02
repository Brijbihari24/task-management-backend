export const inputFields = {
  task_name: {
    type: "string",
    required: true,
    default: "",
    options: "",
  },
  // assigned_to: {
  //   type: "related",
  //   required: true,
  //   default: "",
  //   options: "",
  //   model: "User",
  // },
  due_time: {
    type: "date",
    required: true,
    default: "",
    options: "",
  },
  estimated_time: {
    type: "string",
    required: true,
    default: "",
    options: "",
  },
  task_description: {
    type: "string",
    required: false,
    default: "",
    options: "",
  },
  attachments: {
    type: "array",
    fields: {
      image: {
        type: "text",
        required: false,
        default: "",
        options: "",
      },
    },
  },
  activity_status: {
    type: "related",
    required: true,
    default: "",
    options: "",
    options: ["Completed", "Pending", "On-Hold", "Cancelled"],
    model: "",
  },

};
