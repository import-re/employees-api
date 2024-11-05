import { Await, defer, useLoaderData, useNavigate } from "react-router-dom";
import { Suspense, useState } from "react";
import EmployeeModal from "./EmployeeModal";

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

async function employeesPromise() {
  const data = await fetch("/api/employees");
  console.log(data);
  return await data.json();
}

export async function loader() {
  return defer({ employeesPromise: employeesPromise() });
}

export default function EmployeeList() {
  const navigate = useNavigate();
  const data = useLoaderData() as { employeesPromise: EmployeeDTO[] };

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [tribe, setTribe] = useState(0);
  const [labelText, setLabelText] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeDTO | null>(
    null
  );
  const [isModalOpen, setModalOpen] = useState(false);

  async function handleAdd() {
    const postRequest = {
      name: name,
      title: title,
      tribe_id: tribe,
    };

    console.log("POST", postRequest);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(postRequest),
    };

    try {
      const response = await fetch("/api/employees", requestOptions);
      if (response.ok) {
        navigate(0);
        setLabelText("Employee added successfully");
      } else {
        setLabelText("Something went wrong");
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      setLabelText("Error adding employee");
    }
  }

  function openModal(employee: EmployeeDTO) {
    setSelectedEmployee(employee);
    setModalOpen(true);
  }

  function closeModal() {
    setSelectedEmployee(null);
    setModalOpen(false);
  }

  return (
    <>
      <label>Create employee</label>
      <br />
      <input
        type="text"
        name="employeeName"
        onChange={(event) => setName(event.target.value)}
        placeholder="Employee name"
      ></input>
      <input
        type="text"
        name="title"
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Employee title"
      ></input>
      <input
        type="number"
        name="tribeId"
        onChange={(event) => setTribe(Number(event.target.value))}
        placeholder="Tribe id"
      ></input>
      <button onClick={handleAdd}>Add employee</button>
      <p>{labelText}</p>
      <Suspense fallback={<p>Loading employees...</p>}>
        <Await
          resolve={data.employeesPromise}
          errorElement={<p>Error loading employees!</p>}
        >
          {(employees: EmployeeDTO[]) => (
            <div className="employee-container">
              <table>
                <tbody>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                  </tr>
                  {employees?.map((employee: EmployeeDTO) => (
                    <tr key={employee.id} onClick={() => openModal(employee)}>
                      <th>{employee.id}</th>
                      <th>{employee.name}</th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Await>
      </Suspense>
      {isModalOpen && (
        <EmployeeModal employee={selectedEmployee} onClose={closeModal} />
      )}
    </>
  );
}
