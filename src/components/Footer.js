import { NavLink } from "react-router-dom"
function Footer() {
  return (
    <footer>
  <div>&copy; Yoan Ivanov 2023. All rights reserved.</div>
  <div class="footer-links">
    <ul class="navbar-nav d-flex flex-row">
      <li class="nav-item">
        <NavLink className="nav-link" to="/">Home</NavLink>
      </li>
      <li class="nav-item">
        <NavLink className="nav-link" to="/recipes">Recipes</NavLink>
      </li>
      <li class="nav-item">
        <NavLink className="nav-link" to="/recipes/add">Add recipe</NavLink>
      </li>
    </ul>
  </div>
</footer>

  )
}

export default Footer