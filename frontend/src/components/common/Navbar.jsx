import { Link, useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  {
    label: 'dashboard',
    link: '/',
  },
  {
    label: 'Add Expense',
    link: '/add-expense',
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  let { pathname } = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };
  return (
    <nav className="py-3 shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-3">
          <div></div>
          <ul className="flex gap-3 items-center">
            {navItems.map((item, i) => (
              <Link
                to={item.link}
                className={`capitalize font-semibold ${
                  pathname === item.link && 'text-primary'
                }`}
                key={i}
              >
                <li>{item.label}</li>
              </Link>
            ))}
            <li
              className="capitalize font-semibold cursor-pointer hover:text-primary"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
