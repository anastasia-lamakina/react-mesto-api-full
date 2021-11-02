import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import logo from "../images/logo.svg";
import CurrentUserContext from "../contexts/CurrentUserContext";

const Header = () => {
  const location = useLocation();
  const history = useHistory();
  const currentUser = useContext(CurrentUserContext);

  const [headerComponent, setHeaderComponent] = useState();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    history.push("/sign-in");
  };

  useEffect(() => {
    switch (location.pathname) {
      case "/sign-in":
        setHeaderComponent(
          <Link className="header__link" to={"/sign-up"}>
            Регистрация
          </Link>
        );
        break;
      case "/sign-up":
        setHeaderComponent(
          <Link className="header__link" to={"/sign-in"}>
            Войти
          </Link>
        );
        break;
      case "/":
        setHeaderComponent(
          <span className={"header__menu"}>
            <div style={{ color: "white" }} className={"header__email"}>
              {currentUser.email}
            </div>
            <button className={"header__logout"} onClick={handleLogout}>
              Выйти
            </button>
          </span>
        );
        break;
    }
  }, [location, currentUser]);

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип сайта" />
      {headerComponent}
    </header>
  );
};

export default Header;
