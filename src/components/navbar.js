import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from '../medias/icon.jpeg';

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/#" + id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        <button type="button" className="logo-btn" onClick={() => scrollToSection("home")}>
          <img src={logo} alt="Logo" />
        </button>
      </div>

      <ul className="sidebar-nav">
        <li className="nav-item">
          <button type="button" onClick={() => scrollToSection("home")} className="nav-link">
            <i className="fa-solid fa-house"></i>
            <span>HOME</span>
          </button>
        </li>
        <li className="nav-item">
          <Link to="/projects" className="nav-link">
            <i className="fa-solid fa-code"></i>
            <span>PROJECTS</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/skills" className="nav-link">
            <i className="fa-solid fa-trophy"></i>
            <span>SKILLS</span>
          </Link>
        </li>

        <li className="nav-item">
          <a href="https://ynubsec.github.io/blogs/" target="_blank" rel="noopener noreferrer" className="nav-link">
            <i className="fa-solid fa-newspaper"></i>
            <span>Writeups</span>
          </a>
        </li>
        <li className="nav-item">
          <Link to="/contact" className="nav-link">
            <i className="fa-solid fa-envelope"></i>
            <span> CONTACT</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
