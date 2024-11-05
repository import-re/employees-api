import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface EmployeeDTO {
  id: number;
  name: string;
  title: string;
  tribe: {
    tribe_id: number;
    tribe_name: string;
    department: string;
  };
}

interface ModalProps {
  employee: EmployeeDTO | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ employee, onClose }) => {
  const [name, setName] = useState(employee?.name);
  const [title, setTitle] = useState(employee?.title);
  const [tribeId, setTribeId] = useState(employee?.tribe.tribe_id);
  //const [tribeName, setTribeName] = useState(employee?.tribe.tribe_name);
  const [tribes, setTribes] = useState<
    { tribe_id: number; tribe_name: string }[]
  >([]);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTribes = async () => {
      try {
        const response = await fetch(`/api/tribes`);
        if (!response.ok) {
          throw new Error("Failed to fetch tribes");
        }
        const data = await response.json();
        setTribes(data);
        console.log(data);
      } catch (e) {
        return e;
      }
    };

    fetchTribes();
  }, []);

  if (!employee) return null;
  function handleDelete(employeeId: number) {
    fetch(`/api/employees/${employeeId}`, { method: "DELETE" });
    navigate(0);
  }

  function handleUpdate() {
    const putRequest = {
      name: name,
      title: title,
      tribe_id: tribeId,
    };

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(putRequest),
    };

    fetch(`/api/employees/${employee?.id}`, requestOptions)
      .then((response) => {
        if (response.ok) {
          console.log("Employee updated successfully");
          navigate(0);
          onClose();
        } else {
          console.error("Failed to update employee");
        }
      })
      .catch((error) => console.error("Error updating employee:", error));
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>Name:</p>
        <input value={name} onChange={(e) => setName(e.target.value)}></input>
        <p>Title:</p>
        <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
        <p>Tribe:</p>
        <select
          value={tribeId}
          onChange={(e) => setTribeId(Number(e.target.value))}
        >
          <option value="" disabled>
            Select a tribe
          </option>
          {tribes.map((tribe) => (
            <option key={tribe.tribe_id} value={tribe.tribe_id}>
              {tribe.tribe_name}
            </option>
          ))}
        </select>
        <img
          src="https://controlio.net/i/svg/brand-figure.svg"
          alt={`${employee.name}'s profile`}
          className="employee-image"
        />
        {!deleteConfirmOpen ? (
          <>
            <button onClick={() => handleUpdate()}>Edit</button>
            <button onClick={() => setDeleteConfirmOpen(true)}>Delete</button>
            <button onClick={onClose}>Close</button>
          </>
        ) : (
          <>
            <label>Are you sure you want to delete?</label>
            <button onClick={() => handleDelete(employee.id)}>Yes</button>
            <button onClick={() => setDeleteConfirmOpen(false)}>No</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
