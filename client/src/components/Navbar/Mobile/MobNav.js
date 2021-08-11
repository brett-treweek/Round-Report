import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "../Nav.css";
import Links from "../Links";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const hamburger = <FontAwesomeIcon className="icon" icon={faBars} onClick={() => setShowMenu(!showMenu)} />

  const closeHamburger = <FontAwesomeIcon className="icon" icon={faTimes} onClick={() => setShowMenu(false)} />

  const closeNav = () => setShowMenu(false)

  return (
    <div className="mobNav">
      {showMenu ? closeHamburger : hamburger}
      {showMenu && <Links isMobile={true} closeNav={closeNav}/>}
    </div>
  );
};

export default Navbar;
