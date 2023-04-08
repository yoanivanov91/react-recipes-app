import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Spinner from './components/Spinner'
import { useQuery } from 'react-query'
// import { getUser } from './services/usersService'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
const Home = lazy(() => import('./pages/Home'))
const AllRecipes = lazy(() => import('./pages/AllRecipes'))
const Recipe = lazy(() => import('./pages/Recipe'))
const AddRecipe = lazy(() => import('./pages/AddRecipe'))
const EditRecipe = lazy(() => import('./pages/EditRecipe'))
const Profile = lazy(() => import('./pages/Profile'))
const MyRecipes = lazy(() => import('./pages/MyRecipes'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const NotFound = lazy(() => import('./pages/NotFound'))


function App() {
  // const { data: user } = useQuery('user', getUser, {
  //   refetchOnWindowFocus: false,
  //   suspense: true,
  //   // staleTime: 60000,
  //   enabled: !!window.localStorage.getItem(import.meta.env.VITE_TOKEN)
  // });
  const user = null;
  
  return (
    <>
    <Router>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="recipes" element={<AllRecipes />} />
            <Route path="recipes/details/:slug" element={<Recipe />} />
            <Route element={<ProtectedRoute isAllowed={!!user} />}>
              <Route path="recipes/add" element={<AddRecipe />} />
              <Route path="recipes/edit/:slug" element={<EditRecipe />} />
              <Route path="my-recipes" element={<MyRecipes />} />
              <Route path="profile" element={<Profile />} />

            </Route>
            <Route path="auth/login" element={user ? <Navigate replace to={'/'} /> : <Login />} />
            <Route path="auth/register" element={user ? <Navigate replace to={'/'} /> : <Register />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
    </>
  )
}

export default App
