const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    employeeNo: {
      type: Number,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: [true, 'Employee Name is required'],
      trim: true
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
      trim: true
    },
    salary: {
      type: Number,
      required: [true, 'Salary is required'],
      min: [0, 'Salary must be a positive number']
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Employee', employeeSchema);
