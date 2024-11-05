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

export default function Employee({
  employeeParam,
}: {
  employeeParam: EmployeeDTO;
}) {
  return (
    <div className="employee">
      <p>{employeeParam.name}</p>
      <p>{employeeParam.title}</p>
    </div>
  );
}
