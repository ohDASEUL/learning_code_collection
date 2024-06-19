import React, { useState, useEffect } from "react";
import MobileNavbar from "./MobileNavbar";
import PcNavbar from "./PcNavbar";

const Navbar = ({ authenticate, setAuthenticate, searchQuery, setSearchQuery }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {windowWidth < 600 ? (
        <MobileNavbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      ) : (
        <PcNavbar
          authenticate={authenticate}
          setAuthenticate={setAuthenticate}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}
    </div>
  );
};

export default Navbar;
