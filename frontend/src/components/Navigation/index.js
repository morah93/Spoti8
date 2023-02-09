import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import SignupForm from "../SignupFormModal/SignupForm";
import { Modal } from "../../context/Modal";
import LoginForm from "../LoginFormModal/LoginForm";
import AddSpot from "../addSpot/addSpot";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [createSpotModal, setCreateSpotModal] = useState(false)
  const [login, setLogin] = useState(true);
  console.log('this is showModal', showModal)
  console.log('this is login', login)
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  }
  // else {
  //   sessionLinks = (
  //     <>
  //       <LoginFormModal />
  //     </>
  //   );
  // }

  return (
    <>
      <div className='navigationContainer'>
        <div className='navigation'>
          <div className='homeLogo'>
            <NavLink
              exact
              to='/'
            >
              <img
                className='logoImg'
                src='https://i.imgur.com/zE4UHjw.png'
              />
            </NavLink>
          </div>
          <div>
            {isLoaded && (
              <ProfileButton
                user={sessionUser}
                setLogin={setLogin}
                setShowModal={setShowModal}
                setCreateSpotModal={setCreateSpotModal}
              />
            )}
          </div>
        </div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            {login ? (
              <LoginForm setShowModal={setShowModal} />
            ) : (
              <SignupForm setShowModal={setShowModal} />
            )}
          </Modal>
        )}
        {createSpotModal && (
          <Modal onClose={() => setCreateSpotModal(false)}>
            {sessionUser &&
            <AddSpot setCreateSpotModal={setCreateSpotModal} />
            }
          </Modal>
        )}

      </div>
    </>
  );
}

export default Navigation;
