import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./Navigation.css";

function ProfileButton({ user, setLogin, setShowModal, setCreateSpotModal }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
    alert('Log Out Successful')
  };

  return (
    <>
      <div className='menuDiv'>
        {user && (
          <button
            className='createButton'
            onClick={() => {
              setCreateSpotModal(true);
            }}
          >
            Become a Host
          </button>
        )}
        <i
          className='fa fa-globe'
          id='globe'
        />
        <button
          className='menu'
          onClick={openMenu}
        >
          <i
            className='fa-solid fa-bars'
            id='hamburglar'
          ></i>
          <i
            className='fa fa-user circle'
            id='user'
          ></i>
        </button>
      </div>

      {showMenu &&
        (user ? (
          <ul className='profile-dropdown'>
            <div>{user.username}</div>
            <div>{user.email}</div>
            <div className='buttonDiv'>
              {/* <button
                className='createButton'
                onClick={() => {
                  setCreateSpotModal(true);
                }}
              >
                Become a Host
              </button> */}
              {/* <button onClick={() => {
              history.push(`/spots/current`)
             }}>User's Spot's</button> */}
              {/* </div> */}
              {/* <div> */}
              <button
                className='logout'
              onClick={ logout }
              >
                Log Out
              </button>
            </div>
          </ul>
        ) : (
          <div className='logAndsignIn'>
            <div id="logintext">Log In/Sign Up</div>
            <div>
              <button
                id='login'
                onClick={() => {
                  setLogin(true);
                  setShowModal(true);

                }}
              >
                Log In
              </button>

              <button
                id='signup'
                onClick={() => {
                  setLogin(false);
                  setShowModal(true);
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        ))}
    </>
  );
}

export default ProfileButton;
