import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { faBagShopping, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Navbar = () => {
  const menuList = [
    "전체보기",
    "남성",
    "여성",
    "가방",
    "액세서리",
    "기프트",
    "컬렉션",
  ];
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
          <FontAwesomeIcon icon={faUser} />
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
          <FontAwesomeIcon icon={faSearch} className="navbar-search-icon"/>
          <input type="text" className="navbar-search"/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
