const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      maxlength: 50,
      minlength: 3,
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: [true, "Please provide phone number"],
      unique: [true, "add unique phone number"],
    },
    belt: {
      type: String,
      required: true,
      enum: {
        values: [
          "white",
          "yellow",
          "blue",
          "purple",
          "brown",
          "black",
          "orange",
          "green",
          "red",
        ],
        message: "{{Value}} is not supported",
      },
    },
  },
  { timestamps: true }
);

studentSchema.pre("remove", async function (next) {
  await this.model("Absentees").deleteMany({ student: this._id });
  await this.model("Payment").deleteMany({ student: this._id });
  next();
});

module.exports = mongoose.model("Student", studentSchema);
