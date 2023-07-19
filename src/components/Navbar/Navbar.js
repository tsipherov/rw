import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import { useLocalStorage } from "../../hooks/useLocalStogage";
import ApiService from "../../services/apiService";
import "./Navbar.css";
import AccountMenu from "../AccountMenu/AccountMenu";
import SearchInput from "../UI/SearchInput/SearchInput";
import { useDispatch } from "react-redux";
import { resetFilters } from "../../store/slices/filters.slice";

const Navbar = () => {
  const [{ isLogedIn, currentUser }, setCurrentUser] = useContext(UserContext);
  const userData = currentUser;
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-xxl">
        <Link
          to="/"
          className="logo"
          onClick={() => {
            dispatch(resetFilters());
          }}
        >
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
            alt="logo"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/"
                className="nav-link"
                onClick={() => {
                  dispatch(resetFilters());
                }}
              >
                Home
              </NavLink>
            </li>
            {isLogedIn ? (
              <>
                <li className="nav-item">
                  <NavLink to="/favorites" className="nav-link">
                    Favorites
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/watch" className="nav-link">
                    Watch
                  </NavLink>
                </li>
                <li className="nav-item avatar">
                  <img
                    src={`https://secure.gravatar.com/avatar/${userData?.avatar?.gravatar.hash}?s=32`}
                    alt="account avatar"
                  />
                  <span>{userData?.username}</span>
                  <AccountMenu />
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
          <SearchInput />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
