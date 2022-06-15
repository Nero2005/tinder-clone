import { useState } from "react";
import { Nav } from "../components/Nav";
import { AuthModal } from "../components/AuthModal";

export const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignup, setIsSignup] = useState(true);

  const authToken = false;

  const handleClick = () => {
    console.log("clicked");
    setShowModal(true);
    setIsSignup(true);
  };

  return (
    <div className="overlay">
      <Nav
        minimal={false}
        setShowModal={setShowModal}
        showModal={showModal}
        setIsSignup={setIsSignup}
      />
      <div className="home">
        <h1 className="primary-title">Swipe Right</h1>
        <button className="primary-btn" onClick={handleClick}>
          {authToken ? "Sign out" : "Create an account"}
        </button>

        {showModal && (
          <AuthModal setShowModal={setShowModal} isSignup={isSignup} />
        )}
      </div>
    </div>
  );
};
