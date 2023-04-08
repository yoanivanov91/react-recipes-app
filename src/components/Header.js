import "../assets/css/Header.css";
import { Link, NavLink } from "react-router-dom";

function Header() {
    const user = null;
  return (
    <header>
        <nav className="navbar navbar-expand-lg">
            <div className="w-100 d-flex justify-content-between flex-wrap">
            <Link className="navbar-brand" to="/">Recipes</Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarContent"
                aria-controls="navbarContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse flex-grow-0" id="navbarContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/recipes">Recipes</NavLink>
                </li>
                {!user && <><li className="nav-item">
                    <NavLink className="nav-link" to="/auth/login">Login</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/auth/register">Register</NavLink>
                </li></>}
                {user && <><li className="nav-item">
                    <NavLink className="nav-link" to="/recipes/add">Home</NavLink>
                </li>
                <li className="nav-item dropdown">
                    <button
                    className="nav-link dropdown-toggle button-style-reset"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    >
                    user.firstName
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li><NavLink className="dropdown-item" to="/profile">Profile</NavLink></li>
                        <li><NavLink className="dropdown-item" to="/my-recipes">My recipes</NavLink></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><button className="dropdown-item" role="button">Logout</button></li>
                    </ul>
                </li></>}
                
                </ul>
            </div>
            </div>
        </nav>
        </header>

  )
}

export default Header