import whiteLogo from "../images/tinder_logo_white.png";
import colorLogo from "../images/color-logo-tinder.png";

export const Nav = ({ minimal, setShowModal, showModal, setIsSignup }) => {
  const handleClick = () => {
    setShowModal(true);
    setIsSignup(false);
  };

  const authToken = false;

  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={minimal ? colorLogo : whiteLogo} />
      </div>

      {!authToken && !minimal && (
        <button className="nav-btn" onClick={handleClick} disabled={showModal}>
          Login
        </button>
      )}
    </nav>
  );
};
