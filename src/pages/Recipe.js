import styles from "../assets/css/Recipe.module.css";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteRecipe, getRecipe } from "../services/recipesService";
import Spinner from "../components/Spinner";
import Error from "../components/Error";
import { Link, useParams, useNavigate } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "react-toastify";

function Recipe() {
  const [areIngredientsOpen, setAreIngredientsOpen] = useState(false);
  const [isHowToOpen, setIsHowToOpen] = useState(false);
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData("user");
  const { slug } = useParams();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const { data, isLoading, isError, isSuccess } = useQuery(["allRecipes", slug], getRecipe, {
    refetchOnWindowFocus: false,
  });

  const renderButtons = () => {
    if (user._id !== data.recipe.owner._id) {
      if (data.recipe.alreadyLiked) {
        return (
          <button className="z-index-up button-style-reset p-0" title="Dislike">
            <i className="bi bi-hand-thumbs-up-fill icon-button-size icon-button-color"></i>
          </button>
        );
      } else {
        return (
          <button className="z-index-up button-style-reset p-0" title="Like">
            <i className="bi bi-hand-thumbs-up icon-button-size icon-button-color"></i>
          </button>
        );
      }
    } else {
      return (
        <>
          <Link to={`/recipes/edit/${data.recipe.slug}`} title="Edit recipe">
            <i className="bi bi-pencil-square icon-button-size icon-button-color"></i>
          </Link>
          <button
            className="button-style-reset p-0"
            title="Delete recipe"
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
          >
            <i className="bi bi-trash-fill icon-button-size heart-button-color"></i>
          </button>
        </>
      );
    }
  };

  const mutation = useMutation(deleteRecipe, {
    onSuccess: () => {
      queryClient.invalidateQueries("allRecipes");
      queryClient.invalidateQueries("recentAndPopularAndLikedRecipes");
      navigate("/recipes", { replace: true });
      toast.success(`Recipe deleted successfully`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleDelete = () => {
    mutation.mutate(data.recipe._id);
  };

  return (
    <>
      {isLoading && <Spinner />}
      {isError && <Error />}
      {isSuccess && (
        <>
          <div className={styles.recipeContainer}>
            <img
              className={styles.recipeImg + " animate__animated animate__fadeIn"}
              src={data.recipe.image}
              alt={data.recipe.title}
            />
            <div className="animate__animated animate__slideInRight animate__fast">
              <button
                onClick={goBack}
                className="simple-link d-flex align-items-center fw-semibold button-style-reset p-0"
              >
                <i className="bi bi-arrow-left icon-button-size me-2"></i>
                <span>Go back</span>
              </button>
              <div className={styles.recipeContentContainer}>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge badge-icon">{data.recipe.category}</span>
                  {user && <div className="buttons">{renderButtons()}</div>}
                </div>
                <h1 className="headline m-0">{data.recipe.title}</h1>
                <p className="info m-0">
                  added by {data.recipe.owner.firstName} {data.recipe.owner.lastName}
                  <br />
                  last update on {format(new Date(data.recipe.updatedAt), "dd/MM/yyyy")}
                </p>
                <div className="d-flex align-items-center gap-5">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-clock icon-button-size me-2"></i>
                    <span>{data.recipe.time ? data.recipe.time + " mins" : "N/A"}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-hand-thumbs-up icon-button-size me-2"></i>
                    <span>
                      {data.recipe.likes}
                      {data.recipe.likes === 1 ? " like" : " likes"}
                    </span>
                  </div>
                </div>
                <h1
                  className="headline mb-0 mt-3 d-flex align-items-center justify-content-between"
                  role="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#ingredients"
                  aria-expanded="false"
                  aria-controls="ingredients"
                  onClick={() => setAreIngredientsOpen(!areIngredientsOpen)}
                >
                  Ingredients
                  <i
                    className={
                      (areIngredientsOpen ? "bi-caret-up-fill" : "bi-caret-down-fill") +
                      " bi icon-button-size icon-button-color"
                    }
                  ></i>
                </h1>
                <ul className="m-0 ps-3 collapse" id="ingredients">
                  {data.recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <h1
                  className="headline mb-0 mt-3 d-flex align-items-center justify-content-between"
                  role="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#howto"
                  aria-expanded="false"
                  aria-controls="howto"
                  onClick={() => setIsHowToOpen(!isHowToOpen)}
                >
                  How to prepare
                  <i
                    className={
                      (isHowToOpen ? "bi-caret-up-fill" : "bi-caret-down-fill") +
                      " bi icon-button-size icon-button-color"
                    }
                  ></i>
                </h1>
                <p className="m-0 collapse" id="howto">
                  {data.recipe.description}
                </p>
              </div>
            </div>
          </div>
          <div className="overflow-hidden padding-fix">
            <div className={styles.moreRecipesContainer + " animate__animated animate__slideInUp animate__fast"}>
              {data.tenMoreFromCategory.length > 0 && (
                <div>
                  <h1 className="headline">More recipes from category {data.recipe.category}</h1>

                  <div className={styles.cards}>
                    {data.tenMoreFromCategory.map((recipe) => (
                      <div key={recipe._id} className={styles.cardContainer}>
                        <RecipeCard recipe={recipe} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {data.tenMoreFromUser.length > 0 && (
                <div>
                  <h1 className="headline">More recipes from {data.recipe.owner.firstName}</h1>

                  <div className={styles.cards}>
                    {data.tenMoreFromUser.map((recipe) => (
                      <div key={recipe._id} className={styles.cardContainer}>
                        <RecipeCard recipe={recipe} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* <!-- Delete Modal --> */}
          <div
            className="modal fade"
            id="deleteModal"
            tabIndex="-1"
            aria-labelledby="deleteModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="deleteModalLabel">
                    Deleting recipe
                  </h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">Are you sure you want to delete {data.recipe.title}?</div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="button" className="btn my-secondary-btn" data-bs-dismiss="modal" onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Recipe;
