import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Test = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div>
      <h1>Welcome, {user?.username}</h1>
      {/* <p>Your token: {token}</p> */}
      <p> {user?.email} </p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Test;
