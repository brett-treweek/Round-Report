import { NavLink } from "react-router-dom";
import "./Nav.css";
import Auth from "../../utils/auth";

// Links component is used by both mobile and desktop navigation, and uses props to indicate if mobile or not.
// If mobile the nav will be closed when any link is clicked.
// Add hazard link is only displayed if logged in.
// Sign in / Sign out is dynamic depending on logged in status.
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
      {Auth.loggedIn() ? (
        <NavLink
        exact
        to="/create-hazard"
        activeClassName="selected"
        className="links"
        onClick={() => props.isMobile && props.closeNav()}
      >
        Add Hazard
      </NavLink>
        
      ) : (
        null
      )}
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
