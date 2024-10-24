import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import './NavBar.css'

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  return (
    <>
      {user ? (
        <nav>
          <ul className="nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/hoots">Hoots</Link></li>
            <li><Link to="/hoots/new">New Hoot</Link></li>
            <li><Link to="" onClick={handleSignout}>Sign Out</Link></li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul className="nav-list">
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default NavBar;
