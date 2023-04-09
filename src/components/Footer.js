import { NavLink } from "react-router-dom"
import "../assets/css/Footer.css"
import { useQueryClient } from "react-query";

function Footer() {
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData('user');
    return (
        <footer>
            <div>&copy; Yoan Ivanov 2023. All rights reserved.</div>
            <div className="footer-links">
                <ul className="navbar-nav d-flex flex-row">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/" end>Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/recipes" end>Recipes</NavLink>
                    </li>
                    {!user && 
                    <><li className="nav-item">
                        <NavLink className="nav-link" to="/auth/login" end>Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/auth/register" end>Register</NavLink>
                    </li></>
                    }
                    {user &&
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/recipes/add" end>Add recipe</NavLink>
                    </li>
                    }
                </ul>
            </div>
        </footer>
    )
}

export default Footer