const Payment = require("../models/Payment");
const Student = require("../models/Student");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createPayment = async (req, res) => {
  const { id: studentId } = req.query;
  const {
    paymentYear,
    paymentMonth,
    paymentDay,
    amount,
    paymentforMonth,
    paymentforYear,
  } = req.body;
  if (
    !paymentYear ||
    !paymentMonth ||
    !paymentDay ||
    !amount ||
    !paymentforMonth ||
    !paymentforYear
  ) {
    throw new CustomError.BadRequestError("Please provide all fields");
  }
  const preSavedpayment = await Payment.findOne({
    student: studentId,
    paymentforMonth,
    paymentforYear,
  });
  if (preSavedpayment) {
    throw new CustomError.BadRequestError("Already a payment exists");
  }
  const payment = await Payment.create({
    student: studentId,
    paymentYear,
    paymentMonth,
    paymentDay,
    amount,
    paymentforMonth,
    paymentforYear,
  });
  res.status(StatusCodes.CREATED).json({ payment });
};

const getAllPaymentsforYear = async (req, res) => {
  const { year } = req.query;
  const payments = await Payment.find({ paymentforYear: year });
  const newPayments = await Promise.all(
    payments.map(async (payment) => {
      const studentId = payment.student;
      const student = await Student.findById(studentId);
      const studentName = student.name;
      console.log(studentName);
      return { studentName, ...payment.toObject() };
    })
  );
  res.status(StatusCodes.OK).json({ newPayments });
};

const getAllPaymentsforMonth = async (req, res) => {
  const { year, month } = req.query;
  const payments = await Payment.find({
    paymentforMonth: month,
    paymentforYear: year,
  });
  res.status(StatusCodes.OK).json({ payments });
};

const getSinglePayment = async (req, res) => {
  const { id: paymentId } = req.params;
  const payment = await Payment.findOne({ _id: paymentId });
  if (!payment) {
    throw new CustomError.NotFoundError(`No payment with id: ${paymentId}`);
  }
  res.status(StatusCodes.OK).json({ payment });
};

const getAllUniqueYears = async (req, res) => {
  const years = await Payment.distinct("paymentforYear");
  if (!years) {
    throw new CustomError.NotFoundError(`No years registered yet`);
  }
  res.status(StatusCodes.OK).json({ years });
};

const updatePayment = async (req, res) => {
  const { id: paymentId } = req.params;
  const { amount, paymentforMonth, paymentforYear } = req.body;
  if (!amount || !paymentforMonth || !paymentforYear) {
    throw new CustomError.BadRequestError("Please provide all fields");
  }
  const payment = await Payment.findOneAndUpdate(
    { _id: paymentId },
    { amount, paymentforMonth, paymentforYear },
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ payment });
};

const deletePayment = async (req, res) => {
  const { id: paymentId } = req.params;
  const payment = await Payment.findOneAndDelete({ _id: paymentId });
  if (!payment) {
    throw new CustomError.NotFoundError(`No payment with id: ${paymentId}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Payment deleted" });
};

const getAllPaymentsforStudent = async (req, res) => {
  const { id: studentId } = req.params;
  if (!studentId) {
    throw new CustomError.BadRequestError("Please provide student id");
  }
  const payments = await Payment.find({ student: studentId });
  res.status(StatusCodes.OK).json({ payments });
};

module.exports = {
  createPayment,
  getAllPaymentsforYear,
  getAllPaymentsforMonth,
  getSinglePayment,
  updatePayment,
  deletePayment,
  getAllPaymentsforStudent,
  getAllUniqueYears,
};
