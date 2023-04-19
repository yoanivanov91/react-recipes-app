import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getUser } from './services/authService'
import SuspenseFallback from './components/SuspenseFallback'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
const Home = lazy(() => import('./pages/Home'))
const AllRecipes = lazy(() => import('./pages/AllRecipes'))
const Recipe = lazy(() => import('./pages/Recipe'))
const AddRecipe = lazy(() => import('./pages/AddRecipe'))
const EditRecipe = lazy(() => import('./pages/EditRecipe'))
const MyRecipes = lazy(() => import('./pages/MyRecipes'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const NotFound = lazy(() => import('./pages/NotFound'))


function App() {
  const { data: user } = useQuery('user', getUser, {
    refetchOnWindowFocus: false,
    suspense: true,
    enabled: !!window.localStorage.getItem("token")
  });
  
  return (
    <>
    <Router>
      <Suspense fallback={<SuspenseFallback />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="recipes" element={<AllRecipes />} />
            <Route path="recipes/details/:slug" element={<Recipe />} />
            <Route element={<ProtectedRoute isAllowed={!!user} />}>
              <Route path="recipes/add" element={<AddRecipe />} />
              <Route path="recipes/edit/:slug" element={<EditRecipe />} />
              <Route path="my-recipes" element={<MyRecipes />} />
            </Route>
            <Route path="auth/login" element={user ? <Navigate replace to={'/'} /> : <Login />} />
            <Route path="auth/register" element={user ? <Navigate replace to={'/'} /> : <Register />} />
            <Route path="404" element={<NotFound />} />
            <Route path="*" element={<Navigate replace to="/404" />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
    </>
  )
}

export default App
