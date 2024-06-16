import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUser, faHeart, faBagShopping, faSearch } from '@fortawesome/free-solid-svg-icons';
import LoginPage from '../Pages/LoginPage';


const Navbar = ({ authenticate, setAuthenticate }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef();

  const loginOpen = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleClickOutside = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      setIsDrawerOpen(false);
    }
  };

  useEffect(() => {
    if (isDrawerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDrawerOpen]);

  const menuList = ['전체보기', '남성', '여성', '가방', '액세서리', '기프트', '컬렉션'];

  return (
    <div>
      <div className="navbar-logo-icon-group">
        <div className="navbar-logo">
          <img
            src="https://www.prada.com/etc/designs/aem-prada-innovation-clientlibs/clientlib-resources/resources/images/logo_prada_b.svg"
            alt="Prada Logo"
          />
        </div>
        <div className="navbar-icon">
          <div>
            {authenticate === true ? (
              <div onClick={() => setAuthenticate(false)}>
                <FontAwesomeIcon icon={faRightFromBracket} />
              </div>
            ) : (
              <div onClick={loginOpen}>
                <FontAwesomeIcon icon={faUser} />
              </div>
            )}
          </div>
          <FontAwesomeIcon icon={faHeart} />
          <FontAwesomeIcon icon={faBagShopping} />
        </div>
      </div>
      <div className="navbar-menu">
        <ul>
          {menuList.map((menu) => (
            <li key={menu}>{menu}</li>
          ))}
        </ul>
        <div>
          <FontAwesomeIcon icon={faSearch} className="navbar-search-icon" />
          <input type="text" className="navbar-search" />
        </div>
      </div>
      {isDrawerOpen && (
        <div className="drawer" ref={drawerRef}>
          <LoginPage setAuthenticate={setAuthenticate} setIsDrawerOpen={setIsDrawerOpen} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
