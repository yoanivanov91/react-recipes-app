import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "../assets/css/Header.module.css";
import { useQueryClient } from "react-query";
import { logout } from "../services/authService";
import { toast } from 'react-toastify';

function Header() {
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData('user');
    const navigate = useNavigate();

    const handleLogout = (user) => {
        logout();
        queryClient.setQueryData('user', undefined);
        navigate("/", { replace: true});
        toast.success(`Until next time, ${user.firstName}`);
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg">
                <div className="w-100 d-flex justify-content-between flex-wrap">
                    <Link className={styles.navbarBrand + ' navbar-brand'} to="/">Recipes</Link>
                    <button
                        className={styles.navbarToggler + ' navbar-toggler'}
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarContent"
                        aria-controls="navbarContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className={styles.navbarTogglerIcon + ' navbar-toggler-icon'}></span>
                    </button>
                    <div className="collapse navbar-collapse flex-grow-0" id="navbarContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className={styles.navLink + ' nav-link'} to="/" end>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={styles.navLink + ' nav-link'} to="/recipes" end>Recipes</NavLink>
                            </li>
                            {!user && 
                            <><li className="nav-item">
                                <NavLink className={styles.navLink + ' nav-link'} to="/auth/login" end>Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={styles.navLink + ' nav-link'} to="/auth/register" end>Register</NavLink>
                            </li></>
                            }
                            {user && 
                            <><li className="nav-item">
                                <NavLink className={styles.navLink + ' nav-link'} to="/recipes/add" end>Add recipe</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <button
                                className="nav-link dropdown-toggle button-style-reset"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                >
                                {user.firstName}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><NavLink className="dropdown-item" to="/profile" end>Profile</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/my-recipes" end>My recipes</NavLink></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="dropdown-item" onClick={() => handleLogout(user)}>Logout</button></li>
                                </ul>
                            </li></>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header