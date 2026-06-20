import React from 'react';

export default function ConfirmDialog({ employee, onCancel, onConfirm, deleting }) {
  return (
    <div className="modal-overlay" onMouseDown={onCancel}>
      <div className="modal modal-small" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Delete Employee</h2>
          <button type="button" className="icon-btn" onClick={onCancel} aria-label="Close">
            ×
          </button>
        </div>
        <p className="confirm-text">
          Are you sure you want to delete <strong>{employee?.name}</strong> (Employee No.{' '}
          {employee?.employeeNo})? This action cannot be undone.
        </p>
        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger" onClick={onConfirm} disabled={deleting}>
            {deleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
