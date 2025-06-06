
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FiLogOut, FiUsers, FiShoppingBag, FiHome } from "react-icons/fi";

export default function Admindashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Admin Dashboard</h2>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="admin/dashboard"
                className="flex items-center p-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
              >
                <FiHome className="mr-3" />
                Overview
              </Link>
            </li>
            <li>
              <Link
                to="/admin/orders"
                className="flex items-center p-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
              >
                <FiShoppingBag className="mr-3" />
                Orders
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className="flex items-center p-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
              >
                <FiUsers className="mr-3" />
                Users
              </Link>
            </li>
            <li>
              <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-orange-600 transition-colors"
            >
              <FiLogOut className="mr-2" />
              Logout
            </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-orange-600 transition-colors"
            >
              <FiLogOut className="mr-2" />
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}