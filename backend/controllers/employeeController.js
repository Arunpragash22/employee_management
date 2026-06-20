const Employee = require('../models/Employee');
const { getNextEmployeeNo } = require('../models/Counter');

// GET /api/employees - list all employees
exports.getAll = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ employeeNo: 1 });
    res.json({ success: true, data: employees });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/employees - create a new employee
exports.create = async (req, res) => {
  try {
    const { name, designation, salary } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Employee Name is required' });
    }
    if (!designation || !designation.trim()) {
      return res.status(400).json({ success: false, message: 'Designation is required' });
    }
    if (salary === undefined || salary === null || salary === '' || isNaN(salary) || Number(salary) < 0) {
      return res.status(400).json({ success: false, message: 'Salary must be a positive number' });
    }

    const employeeNo = await getNextEmployeeNo();

    const employee = await Employee.create({
      employeeNo,
      name: name.trim(),
      designation: designation.trim(),
      salary: Number(salary)
    });

    res.status(201).json({ success: true, message: 'Employee created successfully', data: employee });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: 'Employee No already exists' });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/employees/:id - update name, designation, salary
exports.update = async (req, res) => {
  try {
    const { name, designation, salary } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Employee Name is required' });
    }
    if (!designation || !designation.trim()) {
      return res.status(400).json({ success: false, message: 'Designation is required' });
    }
    if (salary === undefined || salary === null || salary === '' || isNaN(salary) || Number(salary) < 0) {
      return res.status(400).json({ success: false, message: 'Salary must be a positive number' });
    }

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name: name.trim(), designation: designation.trim(), salary: Number(salary) },
      { new: true, runValidators: true }
    );

    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    res.json({ success: true, message: 'Employee updated successfully', data: employee });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/employees/:id - remove an employee
exports.remove = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }
    res.json({ success: true, message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
