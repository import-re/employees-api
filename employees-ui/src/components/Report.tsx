/* eslint-disable @typescript-eslint/no-explicit-any */
import { Await, defer, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

async function reportPromise() {
  const data = await fetch("/api/report");
  return await data.json();
}

export function loader() {
  return defer({ reportPromise: reportPromise() });
}

interface Employee {
  id: number;
  name: string;
}

interface Tribe {
  name: string;
  id: number;
  department: string;
  employees: Employee[];
}

type Report = Tribe[];

export default function Report() {
  const data = useLoaderData() as { reportPromise: Promise<Report> };

  return (
    <>
      <Suspense fallback={<p>Loading report...</p>}>
        <Await
          resolve={data.reportPromise}
          errorElement={<p>Error loading report!</p>}
        >
          {(report: any) => (
            <div className="report-container">
              <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Employees</th>
                  </tr>
                </thead>
                <tbody>
                  {report?.map((tribe: any) => {
                    const key: string = Object.keys(tribe)[0];
                    const tribeObject: Tribe = tribe[key];

                    return (
                      <tr key={tribeObject.id}>
                        <td>{tribeObject.id}</td>
                        <td>{tribeObject.name}</td>
                        <td>{tribeObject.department}</td>
                        <td>
                          {tribeObject.employees
                            .map((employee) => employee.name)
                            .join(", ")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Await>
      </Suspense>
    </>
  );
}
