import { EmployeeDTO } from "../../../src/models/employees";

export default function Employee({employeeParam}: {employeeParam: EmployeeDTO}) {
    return (
        <div className="employee">
            <p>{employeeParam.name}</p>
            <p>{employeeParam.title}</p>
        </div>
    )
}