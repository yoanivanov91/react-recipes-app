import myRecipesImg from "../assets/images/my-recipes.jpg";
import styles from "../assets/css/MyRecipes.module.css";
import Spinner from "../components/Spinner";
import Error from "../components/Error";
import { deleteRecipe, getMyRecipes } from "../services/recipesService";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function MyRecipes() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData("user");
  const {
    data: recipes,
    isLoading,
    isError,
    isSuccess,
  } = useQuery("myRecipes", getMyRecipes, {
    refetchOnWindowFocus: false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState("mine");
  const [foundRecipes, setFoundRecipes] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setFoundRecipes(recipes.mine);
    }
  }, [recipes]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length < 3) {
      setFoundRecipes(recipes[show]);
    } else {
      const found = recipes[show].filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
          recipe.category.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFoundRecipes(found);
    }
  };

  const handleShow = (e) => {
      setFoundRecipes(recipes[e.target.value]);
      setShow(e.target.value);
      setSearchTerm("");
  };
  const [toBeDeleted, setToBeDeleted] = useState({});

  const deleteMutation = useMutation(deleteRecipe, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['allRecipes'], {exact: true});
      await queryClient.invalidateQueries(['recentAndPopularAndLikedRecipes'], {exact: true});
      await queryClient.invalidateQueries(['myRecipes'], {exact: true});
      toast.success(`Recipe deleted successfully`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleDelete = (recipeId) => {
    deleteMutation.mutate(recipeId);
  };

  useEffect(() => {
    document.title = "Recipes: My recipes";
  }, []);

  return (
    <>
      <div className="hero animate__animated animate__fadeIn">
        <img src={myRecipesImg} alt="My recipes" width="100%" height="100%" />
      </div>
      <div className="overflow-hidden padding-fix">
        {isLoading && <Spinner />}
        {isError && <Error />}
        {isSuccess && (
          <div className={styles.myRecipesContainer + " animate__animated animate__slideInUp animate__fast"}>
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="headline m-0">My recipes</h1>
                <div className="d-flex align-items-center gap-3">
                  <input
                    type="text"
                    className="form-control"
                    id="search"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <select id="filter" className="form-select w-auto" onChange={handleShow}>
                    <option value="mine">Added</option>
                    <option value="liked">Liked</option>
                  </select>
                </div>
              </div>
              {foundRecipes.length > 0 && (
                <div className="table-responsive">
                  <table className="table m-0">
                    <thead>
                      <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Category</th>
                        <th scope="col">Time</th>
                        <th scope="col">Likes</th>
                        <th scope="col">Ingredients</th>
                        <th scope="col">How to prepare</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {foundRecipes.map((recipe) =>
                        <tr key={recipe._id} className="align-middle">
                          <td>
                            <img src={recipe.image} alt={recipe.title} className={styles.recipeImg} />
                          </td>
                          <td>{recipe.title}</td>
                          <td>{recipe.category}</td>
                          <td className="max-content">{recipe.time} mins</td>
                          <td className="max-content">
                            {recipe.likes} {recipe.likes === 1 ? "like" : "likes"}
                          </td>
                          <td>{recipe.ingredients.join(", ")}</td>
                          <td>{recipe.description}</td>
                          <td className="max-content">
                            <div className="buttons">
                              <Link to={`/recipes/details/${recipe.slug}`} title="Go to recipe">
                                <i className="bi bi-display icon-button-size icon-button-color"></i>
                              </Link>
                              {user?._id === recipe.owner &&
                                <>
                                  <Link to={`/recipes/edit/${recipe.slug}`} title="Edit recipe">
                                    <i className="bi bi-pencil-square icon-button-size icon-button-color"></i>
                                  </Link>
                                  <button
                                    onClick={() => setToBeDeleted(recipe)}
                                    className="button-style-reset p-0"
                                    title="Delete recipe"
                                    data-bs-toggle="modal"
                                    data-bs-target="#deleteModal"
                                  >
                                    <i className="bi bi-trash-fill icon-button-size heart-button-color"></i>
                                  </button>
                                </>
                              }
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {recipes[show].length > 0 && foundRecipes.length === 0 && <p className="m-0">
                  No recipes found.
              </p>
              }
              {recipes[show].length === 0 && <p className="m-0">
                  There aren't any recipes yet.
              </p>
              }
            </div>
          </div>
        )}
      </div>

      <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deleteModalLabel">
                Deleting recipe
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">Are you sure you want to delete {toBeDeleted.title}?</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                className="btn my-secondary-btn"
                onClick={() => handleDelete(toBeDeleted._id)}
                data-bs-dismiss="modal"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyRecipes;
