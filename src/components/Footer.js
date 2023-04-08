import { NavLink } from "react-router-dom"
import "../assets/css/Footer.css"

function Footer() {
    const user = null;
  return (
    <footer>
        <div>&copy; Yoan Ivanov 2023. All rights reserved.</div>
        <div className="footer-links">
            <ul className="navbar-nav d-flex flex-row">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/recipes">Recipes</NavLink>
                </li>
                {!user && 
                <><li className="nav-item">
                    <NavLink className="nav-link" to="/auth/login">Login</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/auth/register">Register</NavLink>
                </li></>
                }
                {user &&
                <li className="nav-item">
                    <NavLink className="nav-link" to="/recipes/add">Add recipe</NavLink>
                </li>
                }
            </ul>
        </div>
    </footer>
  )
}

export default Footer