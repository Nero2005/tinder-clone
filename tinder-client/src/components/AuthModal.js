import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const AuthModal = ({ setShowModal, isSignup }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  let navigate = useNavigate();

  // console.log(email, password, confirmPassword);

  const handleClick = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup && password !== confirmPassword) {
        setError("Passwords need to match");
        return;
      }
      setError(null);
      const response = await axios.post(
        `http://localhost:8000/${isSignup ? "signup" : "login"}`,
        {
          email,
          password,
        }
      );
      setCookie("AuthToken", response.data.token);
      setCookie("UserId", response.data.userId);
      const success = response.status === 201;
      console.log(success);
      if (success && isSignup) navigate("/onboarding");
      if (success && !isSignup) navigate("/dashboard");
      console.log("Make POST request");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="auth-modal">
      <div className="close-icon" onClick={handleClick}>
        X
      </div>
      <h2>{isSignup ? "CREATE ACCOUNT" : "LOG IN"}</h2>
      <p>
        By clicking Log In, you agree to our Terms. Learn how we process your
        data in our Privacy Policy and Cookie Policy.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSignup && (
          <input
            type="password"
            id="password-check"
            name="password-check"
            placeholder="Confirm Password"
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <input className="secondary-btn" type="submit" />
        <p>{error}</p>
      </form>
      <hr />
      <h2>GET THE APP</h2>
    </div>
  );
};
