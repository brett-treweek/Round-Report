import { NavLink } from "react-router-dom";
import "./Nav.css";
import Auth from "../../utils/auth";

const Links = (props) => {

  const signOut = () => {
    Auth.logout()
  }

  return (
    <nav className="navLinks">
      <NavLink
        exact
        to="/"
        className="links"
        activeClassName="selected"
        onClick={() => props.isMobile && props.closeNav()}
      >
        Home
      </NavLink>
      <NavLink
        exact
        to="/round-report"
        activeClassName="selected"
        className="links"
        onClick={() => props.isMobile && props.closeNav()}
      >
        Round Report
      </NavLink>
      {Auth.loggedIn() ? (
        <button className="links" id="signBtn" onClick={signOut}>Sign Out</button>
      ) : (
        <NavLink
          exact
          to="/signIn"
          activeClassName="selected"
          className="links"
          onClick={() => props.isMobile && props.closeNav()}
        >
          Sign In
        </NavLink>
      )}
    </nav>
  );
};

export default Links;
