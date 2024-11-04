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
                <p>Tribe: {employee.tribe.tribe_name}</p>
                <img 
                    src="https://controlio.net/i/svg/brand-figure.svg" 
                    alt={`${employee.name}'s profile`} 
                    className="employee-image" 
                />
                <button>Edit</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
