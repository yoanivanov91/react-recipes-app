import homeImg from "../assets/images/home.jpg"
import styles from "../assets/css/Home.module.css"
import { useQuery, useQueryClient } from 'react-query'
import { getRecentAndPopularAndLiked } from "../services/recipesService";
import RecipeCard from "../components/RecipeCard";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import Error from "../components/Error";

function Home() {

    const queryClient = useQueryClient();
    const user = queryClient.getQueryData('user');

    const { data: recipes, isLoading, isError, isSuccess } = useQuery('recentAndPopularAndLikedRecipes', getRecentAndPopularAndLiked, {
        refetchOnWindowFocus: false
    });

    return (
        <>
            <div className="hero animate__animated animate__fadeIn">
                <img src={homeImg} alt="Home" width="100%" height="100%" />
            </div>
            <div className="overflow-hidden padding-fix">
            {isLoading && <Spinner />}
            {isError && <Error />}
            {isSuccess && <>
                <div className={styles.homeContainer + ' animate__animated animate__slideInUp animate__fast'}>
                    
                    <div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h1 className="headline m-0">Recently added recipes</h1>
                            <Link className="simple-link fw-semibold" to="/recipes">View all</Link>
                        </div>
                        
                        {recipes.recent?.length > 0 &&
                        <div className={styles.cards}>
                            {recipes.recent.map(recipe => <div key={recipe._id} className={styles.cardContainer}>
                                <RecipeCard recipe={recipe} />
                            </div>)}
                        </div>
                        }
                        {recipes.recent?.length === 0 && <p className="m-0">
                            There aren't any recipes yet.
                        </p>
                        }
                        
                    </div>
                    <div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h1 className="headline m-0">Popular recipes</h1>
                            <Link className="simple-link fw-semibold" to="/recipes">View all</Link>
                        </div>

                        {recipes.popular?.length > 0 &&
                        <div className={styles.cards}>
                            {recipes.popular.map(recipe => <div key={recipe._id} className={styles.cardContainer}>
                                <RecipeCard recipe={recipe} />
                            </div>)}
                        </div>
                        }
                        {recipes.popular?.length === 0 && <p className="m-0">
                            There aren't any popular recipes yet.
                        </p>
                        }
                    </div>

                    {user && <div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h1 className="headline m-0">Recently liked recipes</h1>
                            <Link className="simple-link fw-semibold" to="/recipes">View all</Link>
                        </div>

                        {recipes.liked?.length > 0 &&
                        <div className={styles.cards}>
                            {recipes.liked.map(recipe => <div key={recipe._id} className={styles.cardContainer}>
                                <RecipeCard recipe={recipe.recipeId} />
                            </div>)}
                        </div>
                        }
                        {recipes.liked?.length === 0 && <p className="m-0">
                            You haven't liked any recipes yet.
                        </p>
                        }
                    </div>
                    }
                </div>
                </>}
            </div>
        </>
    )
}

export default Home