import { Link } from "react-router-dom"
import styles from "../assets/css/RecipeCard.module.css"

function RecipeCard({recipe}) {
    return (
        <div className={styles.card + ' card shadow-sm'}>
            <img src={recipe.image} className="card-img-top" alt={recipe.title} />
            <div className="card-body">
                <span className="badge badge-icon mb-3">{recipe.category}</span>
                <h5 className="card-title mb-3">{recipe.title}</h5>
                <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <i className="bi bi-clock icon-button-size me-2"></i>
                    <span>{recipe.time} mins</span>
                </div>
                <div className="d-flex align-items-center">
                    <i className="bi bi-hand-thumbs-up icon-button-size me-2"></i>
                    <span
                    >{recipe.likes} {recipe.likes === 1 ? " like" : " likes"}</span
                    >
                </div>
                </div>
                <Link to={`/recipes/details/${recipe.slug}`} className="stretched-link"></Link>
            </div>
        </div>
    )
}

export default RecipeCard