import React, { useEffect, useState, useCallback } from 'react';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from './services/api';
import EmployeeForm from './EmployeeForm';
import ConfirmDialog from './ConfirmDialog';

const salaryFormatter = new Intl.NumberFormat('en-US', {
  
  minimumFractionDigits: 2
});

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' | 'edit'
  const [activeEmployee, setActiveEmployee] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const res = await getEmployees();
      setEmployees(res.data.data || []);
    } catch (err) {
      setLoadError(
        err.response?.data?.message || 'Could not load employees. Is the backend server running?'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const openAddForm = () => {
    setFormMode('add');
    setActiveEmployee(null);
    setFormError('');
    setFormOpen(true);
  };

  const openEditForm = (employee) => {
    setFormMode('edit');
    setActiveEmployee(employee);
    setFormError('');
    setFormOpen(true);
  };

  const closeForm = () => {
    if (submitting) return;
    setFormOpen(false);
    setActiveEmployee(null);
    setFormError('');
  };

  const handleFormSubmit = async (payload) => {
    setSubmitting(true);
    setFormError('');
    try {
      if (formMode === 'edit' && activeEmployee) {
        const res = await updateEmployee(activeEmployee._id, payload);
        setEmployees((prev) =>
          prev.map((emp) => (emp._id === activeEmployee._id ? res.data.data : emp))
        );
      } else {
        const res = await createEmployee(payload);
        setEmployees((prev) => [...prev, res.data.data]);
      }
      setFormOpen(false);
      setActiveEmployee(null);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteEmployee(deleteTarget._id);
      setEmployees((prev) => prev.filter((emp) => emp._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (err) {
      setLoadError(err.response?.data?.message || 'Could not delete employee. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="page">
      <header className="page-header">
        <h1>Employee Management</h1>
        <button type="button" className="btn btn-primary" onClick={openAddForm}>
          + Add Employee
        </button>
      </header>

      <main className="content">
        {loadError && <div className="banner banner-error">{loadError}</div>}

        {loading ? (
          <div className="state-message">Loading employees…</div>
        ) : employees.length === 0 ? (
          <div className="state-message">
            No employees yet. Click <strong>“+ Add Employee”</strong> to create the first record.
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Employee No</th>
                  <th>Employee Name</th>
                  <th>Designation</th>
                  <th>Salary</th>
                  <th className="col-action">Edit</th>
                  <th className="col-action">Delete</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp._id}>
                    <td>{emp.employeeNo}</td>
                    <td>{emp.name}</td>
                    <td>{emp.designation}</td>
                    <td>{salaryFormatter.format(emp.salary)}</td>
                    <td className="col-action">
                      <button
                        type="button"
                        className="btn btn-edit"
                        onClick={() => openEditForm(emp)}
                      >
                        Edit
                      </button>
                    </td>
                    <td className="col-action">
                      <button
                        type="button"
                        className="btn btn-delete"
                        onClick={() => setDeleteTarget(emp)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {formOpen && (
        <EmployeeForm
          mode={formMode}
          initialData={activeEmployee}
          onClose={closeForm}
          onSubmit={handleFormSubmit}
          submitting={submitting}
          error={formError}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          employee={deleteTarget}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDeleteConfirm}
          deleting={deleting}
        />
      )}
    </div>
  );
}
