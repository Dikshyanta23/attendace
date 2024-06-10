const Absentees = require("../models/Absentees");
const Student = require("../models/Student");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const createAbsentees = async (req, res) => {
  const { id: studentId } = req.query;
  const { dateYear, dateMonth, dateDay, reason } = req.body;
  if (!dateYear || !dateMonth || !dateDay || !reason) {
    throw new CustomError.BadRequestError("Please provide all fields");
  }
  const preAbsentee = await Absentees.findOne({
    dateYear,
    dateMonth,
    dateDay,
    student: studentId,
  });
  if (preAbsentee) {
    throw new CustomError.BadRequestError("Already the same absentee exists");
  }
  const absentees = await Absentees.create({
    student: studentId,
    dateYear,
    dateMonth,
    dateDay,
    reason,
  });
  res.status(StatusCodes.CREATED).json({ absentees });
};

const getAllAbsentees = async (req, res) => {
  const { search, sort } = req.query;
  let queryObject = {};

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "name",
    "z-a": "-name",
  };
  const sortKey = sortOptions[sort] || sortOptions["newest"];

  const absentees = await Absentees.find().sort(sortKey);
  const modifiedAbsentee = await Promise.all(
    absentees.map(async (payment) => {
      const studentId = payment.student;
      const student = await Student.findById(studentId);
      const studentName = student.name;
      return { studentName, ...payment.toObject() };
    })
  );
  if (search) {
    const regex = new RegExp(search, "i");
    const newAbsentees = modifiedAbsentee.filter((item) => {
      if (regex.test(item.studentName)) {
        return item;
      }
    });
    return res.status(StatusCodes.OK).json({ newAbsentees });
  }
  const newAbsentees = modifiedAbsentee;
  res.status(StatusCodes.OK).json({ newAbsentees });
};

const getSingleAbsentees = async (req, res) => {
  const { id: absenteesId } = req.params;
  const absentee = await Absentees.findOne({ _id: absenteesId });
  if (!absentee) {
    throw new CustomError.NotFoundError(`No absentee with id: ${absenteesId}`);
  }
  res.status(StatusCodes.OK).json({ absentee });
};

const getAllAbsenteesByDate = async (req, res) => {
  const { dateYear, dateMonth, dateDay } = req.body;
  const absentees = await Absentees.find({ dateYear, dateMonth, dateDay });
  res.status(StatusCodes.OK).json({ absentees });
};

const getAllAbsenteesByStudent = async (req, res) => {
  const { id: studentId } = req.params;
  const absentees = await Absentees.find({ student: studentId });
  res.status(StatusCodes.OK).json({ absentees });
};

const updateAbsentees = async (req, res) => {
  const { id: absenteesId } = req.params;
  const { dateDay, dateMonth, dateYear, reason } = req.body;
  const updatedAbsentee = await Absentees.findOneAndUpdate(
    { _id: absenteesId },
    { dateDay, dateMonth, dateYear, reason },
    { new: true, runValidators: true }
  );
  if (!updatedAbsentee) {
    throw new CustomError.NotFoundError(`No absentee with id: ${absenteesId}`);
  }
  res.status(StatusCodes.OK).json({ absentee: updatedAbsentee });
};

const deleteAbsentees = async (req, res) => {
  const { id: absenteesId } = req.params;
  const absentee = await Absentees.findOneAndDelete({ _id: absenteesId });
  if (!absentee) {
    throw new CustomError.NotFoundError(`No absentee with id: ${absenteesId}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Absentee deleted" });
};

module.exports = {
  createAbsentees,
  getAllAbsentees,
  getAllAbsenteesByDate,
  getAllAbsenteesByStudent,
  updateAbsentees,
  deleteAbsentees,
  getSingleAbsentees,
};
