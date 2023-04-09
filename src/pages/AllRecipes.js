import allRecipesImg from "../assets/images/all-recipes.jpg"
import styles from "../assets/css/AllRecipes.module.css"
import { useQuery } from 'react-query'
import { getAllRecipes } from "../services/recipesService";
import RecipeCard from "../components/RecipeCard";
import Spinner from "../components/Spinner";
import Error from "../components/Error";
import { useEffect, useState } from "react";

function AllRecipes() {

    const { data: recipes, isLoading, isError, isSuccess } = useQuery('allRecipes', getAllRecipes, {
        refetchOnWindowFocus: false
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [foundRecipes, setFoundRecipes] = useState([]);

    useEffect(() => {
        if(isSuccess && foundRecipes.length === 0) {
            setFoundRecipes(recipes);
            console.log(recipes);
        }
    }, [isSuccess])

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        if(e.target.value.length < 3) {
            setFoundRecipes(recipes);
        } else {
            const found = recipes.filter(recipe => recipe.title.toLowerCase().includes(e.target.value.toLowerCase()) || recipe.category.toLowerCase().includes(e.target.value.toLowerCase()));
            setFoundRecipes(found);
        }
    }

    const handleShow = (e) => {
        if(e.target.value === 'popular') {
            const popular = [...recipes].sort((a, b) => b.likes - a.likes);
            setFoundRecipes(popular);
            setSearchTerm('')
        } else {
            const recent = [...recipes];
            setFoundRecipes(recent);
            setSearchTerm('')
        }
    }

    return (
        <>
            <div className="hero animate__animated animate__fadeIn">
                <img
                    src={allRecipesImg}
                    alt="All recipes"
                    width="100%"
                    height="100%"
                />
            </div>
            <div className="overflow-hidden padding-fix">
            {isLoading && <Spinner />}
            {isError && <Error />}
            {isSuccess && <>
                <div className={styles.allRecipesContainer + ' animate__animated animate__slideInUp animate__fast'}>
                    <div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h1 className="headline m-0">All recipes</h1>
                            <div className="d-flex align-items-center gap-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="search"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                                <select
                                    id="filter"
                                    className="form-select w-auto"
                                    onChange={handleShow}
                                >
                                    <option value="recent">Recent</option>
                                    <option value="popular">Popular</option>
                                </select>
                            </div>
                        </div>

                        {foundRecipes.length > 0 &&
                        <div className={styles.cards}>
                            {foundRecipes.map(recipe => <div key={recipe._id} className="card-container">
                                <RecipeCard recipe={recipe} />
                            </div>)}
                        </div>
                        }
                        {recipes.length > 0 && foundRecipes.length === 0 && <p className="m-0">
                            No recipes found.
                        </p>
                        }
                        {recipes.length === 0 && <p className="m-0">
                            There aren't any recipes yet.
                        </p>
                        }
                    </div>
                </div>
            </>}
            </div>
        </>
    )
}

export default AllRecipes