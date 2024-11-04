import React from 'react';
import { EmployeeDTO } from '../../../src/models/employees';

interface ModalProps {
    employee: EmployeeDTO | null;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ employee, onClose }) => {
    if (!employee) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{employee.name}</h2>
                <p>Title: {employee.title}</p>
                <button>Edit</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;