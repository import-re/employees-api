import { NavLink } from "react-router-dom";

export default function NavigationMenu() {
  return (
    <div className="navigation">
      <ul>
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"employees"}>Employees</NavLink>
        </li>
        <li>
          <NavLink to={"tribes"}>Tribes</NavLink>
        </li>
        <li>
          <NavLink to={"report"}>Report</NavLink>
        </li>
      </ul>
    </div>
  );
}
