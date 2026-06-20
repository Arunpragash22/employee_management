import React, { useState, useEffect } from 'react';

const emptyForm = { name: '', designation: '', salary: '' };

export default function EmployeeForm({ mode, initialData, onClose, onSubmit, submitting, error }) {
  const [form, setForm] = useState(emptyForm);
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setForm({
        name: initialData.name || '',
        designation: initialData.designation || '',
        salary: initialData.salary ?? ''
      });
    } else {
      setForm(emptyForm);
    }
  }, [mode, initialData]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const errors = {
    name: !form.name.trim() ? 'Employee name is required.' : '',
    designation: !form.designation.trim() ? 'Designation is required.' : '',
    salary:
      form.salary === '' || isNaN(Number(form.salary))
        ? 'Salary must be a number.'
        : Number(form.salary) <= 0
        ? 'Salary must be a positive number.'
        : ''
  };

  const isValid = !errors.name && !errors.designation && !errors.salary;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, designation: true, salary: true });
    if (!isValid) return;
    onSubmit({
      name: form.name.trim(),
      designation: form.designation.trim(),
      salary: Number(form.salary)
    });
  };

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{mode === 'edit' ? 'Edit Employee' : 'Add Employee'}</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="emp-name">Employee Name</label>
            <input
              id="emp-name"
              type="text"
              value={form.name}
              onChange={handleChange('name')}
              onBlur={handleBlur('name')}
              placeholder="e.g. Vimalan Arunpragash"
              autoFocus
            />
            {touched.name && errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="field">
            <label htmlFor="emp-designation">Designation</label>
            <input
              id="emp-designation"
              type="text"
              value={form.designation}
              onChange={handleChange('designation')}
              onBlur={handleBlur('designation')}
              placeholder="e.g. Software Engineer"
            />
            {touched.designation && errors.designation && (
              <span className="field-error">{errors.designation}</span>
            )}
          </div>

          <div className="field">
            <label htmlFor="emp-salary">Salary</label>
            <input
              id="emp-salary"
              type="number"
              step="0.01"
              min="0"
              value={form.salary}
              onChange={handleChange('salary')}
              onBlur={handleBlur('salary')}
              placeholder="e.g. 75000"
            />
            {touched.salary && errors.salary && <span className="field-error">{errors.salary}</span>}
          </div>

          {error && <div className="form-error">{error}</div>}

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Saving…' : mode === 'edit' ? 'Save Changes' : 'Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
