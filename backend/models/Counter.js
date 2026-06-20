const mongoose = require('mongoose');

// Simple counter collection used to generate auto-incrementing,
// human-readable Employee Numbers (1, 2, 3, ...) instead of raw ObjectIds.
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

async function getNextEmployeeNo() {
  const counter = await Counter.findByIdAndUpdate(
    'employeeNo',
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
}

module.exports = { Counter, getNextEmployeeNo };
