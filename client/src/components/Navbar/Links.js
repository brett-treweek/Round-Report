import { NavLink } from "react-router-dom";
import "./Nav.css";

const Links = (props) => {
  return (
    <nav className="menu">
      <NavLink
        exact
        to="/"
        className="links"
        activeClassName="selected"
        onClick={() => props.closeNav()}
      >
        Home
      </NavLink>
      <NavLink
        exact
        to="/round-report"
        activeClassName="selected"
        className="links"
        onClick={() => props.closeNav()}
      >
        Round Report
      </NavLink>
      <NavLink
        exact
        to="/history"
        activeClassName="selected"
        className="links"
        onClick={() => props.closeNav()}
      >
        History
      </NavLink>
      <NavLink
        exact
        to="/signIn"
        activeClassName="selected"
        className="links"
        onClick={() => props.closeNav()}
      >
        Sign In
      </NavLink>
    </nav>
  );
};

export default Links;
