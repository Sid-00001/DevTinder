import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_BACKEND_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_BACKEND_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="bg-base-200 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link
          to={user ? "/" : "/login"}
          className="text-xl font-bold text-white hover:text-primary transition-all"
        >
          DevTinder
        </Link>

        {user && (
          <div className="flex gap-2">
            <div className="dropdown dropdown-end mx-5">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:bg-base-300 transition-all"
              >
                <div className="w-10 rounded-full border border-primary">
                  <img alt="user profile" src={user.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 text-black rounded-lg z-10 mt-3 w-52 p-2 shadow-lg border border-neutral opacity-95"
              >
                <li>
                  <Link to="/profile" className="hover:text-primary">
                    Profile <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections" className="hover:text-primary">
                    Connections
                  </Link>
                </li>
                <li>
                  <Link to="/requests" className="hover:text-primary">
                    Requests
                  </Link>
                </li>
                <li>
                  <Link to="/settings" className="hover:text-primary">
                    Settings
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left hover:text-primary"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
