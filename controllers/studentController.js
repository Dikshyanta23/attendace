const cloudinary = require("cloudinary").v2;
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const path = require("path");
const fs = require("fs");
const Student = require("../models/Student");

const getAllStudents = async (req, res) => {
  const { search, sort } = req.query;

  const queryObject = {};

  if (search) {
    queryObject.$or = [
      { name: { $regex: search, $options: "i" } },
      { belt: { $regex: search, $options: "i" } },
    ];
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "name",
    "z-a": "-name",
  };
  const sortKey = sortOptions[sort] || sortOptions["a-z"];

  //setup pagination
  // const page = Number(req.query.page) || 1;
  // const limit = Number(req.query.limit) || 10;
  // const skip = (page - 1) * limit;

  const students = await Student.find(queryObject).sort("name");
  // const totalStudents = await Student.countDocuments(queryObject);
  // const numOfPages = Math.ceil(totalStudents / limit);
  res.status(StatusCodes.OK).json({ students });
};

const getSingleStudent = async (req, res) => {
  const { id: studentId } = req.params;
  const student = await Student.findOne({ _id: studentId });
  if (!student) {
    throw new CustomError.NotFoundError(`No student with id: ${studentId}`);
  }
  res.status(StatusCodes.OK).json({ student });
};

function capitalizeFirstLetterAndAfterSpace(str) {
  // Split the string by space
  const words = str.split(" ");

  // Capitalize the first letter of each word
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  // Join the words back together
  const capitalizedString = capitalizedWords.join(" ");

  return capitalizedString;
}
const createStudent = async (req, res) => {
  req.body.user = req.user.userId;
  const { name, phoneNumber, belt } = req.body;
  const realName = capitalizeFirstLetterAndAfterSpace(name);

  const student = await Student.create({ name: realName, phoneNumber, belt });
  res.status(StatusCodes.CREATED).json({ student });
};

const updateStudent = async (req, res) => {
  const { id: studentId } = req.params;
  const updatedStudent = await Student.findOneAndUpdate(
    { _id: studentId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedStudent) {
    throw new CustomError.NotFoundError(`No student with id: ${studentId}`);
  }
  res.status(StatusCodes.OK).json({ student: updatedStudent });
};

const deleteStudent = async (req, res) => {
  const { id: studentId } = req.params;
  const student = await Student.findOne({ _id: studentId });
  if (!student) {
    throw new CustomError.NotFoundError(`No student with id: ${studentId}`);
  }
  await student.delete();
  res.status(StatusCodes.OK).json({ msg: "Student deleted" });
};

module.exports = {
  getAllStudents,
  getSingleStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};
