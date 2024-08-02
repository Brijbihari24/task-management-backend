import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: [
      {
        address_1: {
          type: String,
          required: false,
        },
        address_2: {
          type: String,
          required: false,
        },
        city: {
          type: String,
          required: false,
        },
        state: {
          type: String,
          required: false,
        },
        pin: {
          type: String,
          required: false,
        },
        landmark: {
          type: String,
          required: false,
        },
      },
    ],
    vendor: {
      store_name: {
        type: String,
        required: false,
      },
      store_description: {
        type: String,
        required: false,
      },
      store_logo: {
        type: String,
        required: false,
      },
      gst_no: {
        type: String,
        required: false,
      },
      gst_certificate: {
        type: String,
        required: false,
      },
      pickup_address: [
        {
          address_1: {
            type: String,
            required: false,
          },
          address_2: {
            type: String,
            required: false,
          },
          city: {
            type: String,
            required: false,
          },
          state: {
            type: String,
            required: false,
          },
          pin: {
            type: String,
            required: false,
          },
          landmark: {
            type: String,
            required: false,
          },
        },
      ],
      profile_status: {
        type: String,
        required: false,
        default: "UNDER REVIEW",
        enum: ["UNDER REVIEW", "APPROVED", "REJECTED"],
      },
      store_active: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    role: {
      type: String,
      required: true,
      default: "CUSTOMER",
      enum: ["CUSTOMER", "SUPER ADMIN", "VENDOR"],
    },

    published_status: {
      type: String,
      required: true,
      default: "PUBLISHED",
      enum: ["PUBLISHED", "DRAFT"],
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.index({ "$**": "text" });

const User = mongoose.model("User", userSchema);

export default User;
