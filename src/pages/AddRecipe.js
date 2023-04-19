import addRecipeImg from "../assets/images/add-recipe.jpg";
import styles from "../assets/css/AddRecipe.module.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "react-query";
import { addRecipe } from "../services/recipesService";
import { useQueryClient } from 'react-query'
import { useEffect } from "react";

const schema = yup
  .object({
    title: yup.string().required("Please enter a title").min(4, "Title must be at least 4 characters long"),
    category: yup.string().required("Please select a category"),
    image: yup
      .string()
      .required("Please enter an image URL")
      .url('Please enter a valid image URL'),
    time: yup
      .string()
      .required("Please enter a time")
      .test("Is positive?", "Please enter a positive number", (value) => value > 0),
    ingredients: yup.string().required("Please enter some ingredients"),
    description: yup.string().required("Please enter how to prepare"),
  })
  .required();

function AddRecipe() {

// Get QueryClient from the context
const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm({ resolver: yupResolver(schema) });
  const imageURL = watch('image', false);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const mutation = useMutation(addRecipe, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['allRecipes'], {exact: true});
      await queryClient.invalidateQueries(['recentAndPopularAndLikedRecipes'], {exact: true});
      await queryClient.invalidateQueries(['myRecipes'], {exact: true});
      reset();
      navigate("/recipes", { replace: true});
      toast.success(`Recipe added successfully`);
    },
    onError: (err) => {
      toast.error(err.message);
    }
  })

  const onSubmit = async (data) => {
    const newData = {...data, ingredients: data.ingredients.split(', ')};
    mutation.mutate(newData);
  };

  useEffect(() => {
    document.title = "Recipes: Add recipe";
  }, []);

  return (
    <>
      <div className="hero animate__animated animate__fadeIn">
        <img src={addRecipeImg} alt="Add recipe" width="100%" height="100%" />
      </div>
      <div className="overflow-hidden padding-fix">
        <div className={styles.addRecipeContainer + " animate__animated animate__slideInUp animate__fast"}>
          {imageURL ? (
            <img className={styles.recipeImg} src={imageURL} alt="Recipe Img" />
          ) : (
            <div className={styles.recipeImgPlaceholder}>
              <p className={styles.imgPreview + " m-0"}>Image preview</p>
            </div>
          )}

          <div>
            <button
              className="simple-link d-flex align-items-center fw-semibold button-style-reset p-0"
              onClick={goBack}
            >
              <i className="bi bi-arrow-left icon-button-size me-2"></i>
              <span>Go back</span>
            </button>

            <div className={styles.formContainer}>
              <h1 className="headline">Add recipe</h1>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="title" className="form-label is-required">
                      Title
                    </label>
                    <input
                      type="text"
                      className={errors.title ? "form-control is-invalid" : "form-control"}
                      id="title"
                      placeholder="Enter a title"
                      {...register("title")}
                    />
                    {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
                  </div>
                  <div className="col">
                    <label htmlFor="category" className="form-label is-required">
                      Category
                    </label>
                    <select
                      id="category"
                      className={errors.category ? "form-select is-invalid" : "form-select"}
                      {...register("category")}
                      defaultValue=""
                    >
                      <option disabled hidden value="">
                        Select a category
                      </option>
                      <option value="Appetizers">Appetizers</option>
                      <option value="Main-courses">Main-courses</option>
                      <option value="Side-dishes">Side-dishes</option>
                      <option value="Salads">Salads</option>
                      <option value="Soups">Soups</option>
                      <option value="Desserts">Desserts</option>
                    </select>
                    {errors.category && <div className="invalid-feedback">{errors.category.message}</div>}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="image" className="form-label is-required">
                      Image URL
                    </label>
                    <input
                      type="text"
                      className={errors.image ? "form-control is-invalid" : "form-control"}
                      id="image"
                      placeholder="Enter an image URL"
                      {...register("image")}
                    />
                    {errors.image && <div className="invalid-feedback">{errors.image.message}</div>}
                  </div>
                  <div className="col">
                    <label htmlFor="time" className="form-label is-required">
                      Time
                    </label>
                    <input
                      type="number"
                      className={errors.time ? "form-control is-invalid" : "form-control"}
                      id="time"
                      placeholder="Enter a time"
                      {...register("time")}
                    />
                    {errors.time && <div className="invalid-feedback">{errors.time.message}</div>}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="ingredients" className="form-label is-required">
                      Ingredients
                    </label>
                    <input
                      type="text"
                      className={errors.ingredients ? "form-control is-invalid" : "form-control"}
                      id="ingredients"
                      placeholder="Enter some ingredients"
                      {...register("ingredients")}
                    />
                    {errors.ingredients && <div className="invalid-feedback">{errors.ingredients.message}</div>}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="description" className="form-label is-required">
                      How to prepare
                    </label>
                    <textarea
                      className={errors.description ? "form-control is-invalid" : "form-control"}
                      id="description"
                      placeholder="Enter a description"
                      rows="3"
                      {...register("description")}
                    ></textarea>
                    {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                  </div>
                </div>

                <button className="btn my-primary-btn w-100" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Adding recipe..." : "Add recipe"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddRecipe;
