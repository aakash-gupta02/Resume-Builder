import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const TestNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-bold text-xl">Job Folio</div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-300">Welcome, {user.username}</span>
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button 
              onClick={handleLogin}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TestNavbar;