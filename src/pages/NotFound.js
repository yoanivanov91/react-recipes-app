import { Link } from "react-router-dom";
import "../assets/css/NotFound.css";

function NotFound() {
    return (
        <div className="not-found-container">
            <h1 className="headline">Oops! Page not found</h1>
            <p className="m-0">The page you are looking for does not exist. Go <Link className="simple-link" to="/">home</Link> or go to the <Link className="simple-link" to="/recipes">recipes</Link>.</p>
        </div>
    )
}

export default NotFound