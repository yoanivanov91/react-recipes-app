import { Link } from "react-router-dom";
import styles from "../assets/css/NotFound.module.css";

function NotFound() {
    return (
        <div className={styles.notFoundContainer}>
            <h1 className="headline">Oops! Page not found</h1>
            <p className="m-0">The page you are looking for does not exist. Go <Link className="simple-link" to="/">home</Link> or go to the <Link className="simple-link" to="/recipes">recipes</Link>.</p>
        </div>
    )
}

export default NotFound