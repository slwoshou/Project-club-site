// Header.jsx — CDC §2.2 : navbar + lien accueil + menu mobile
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { clubInfo } from "../data";

export default function Header() {
  const [menuOuvert, setMenuOuvert] = useState(false);

  return (
    <header className="header">
      <div className="header-inner">
        {/* Logo + Nom */}
        <Link to="/" className="brand" onClick={() => setMenuOuvert(false)}>
          <img src={clubInfo.logo} alt="Logo" className="brand-logo" style={{height:"36px", objectFit:"contain"}} />
          <div className="brand-text">
            <span className="brand-sigle">{clubInfo.nom}</span>
            <span className="brand-sub">{clubInfo.faculte}</span>
          </div>
        </Link>

        {/* Navigation desktop — §2.2 : lien vers l'accueil */}
        <nav className={`nav ${menuOuvert ? "nav--open" : ""}`} aria-label="Navigation principale">
          <NavLink to="/"        className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} onClick={() => setMenuOuvert(false)}>Accueil</NavLink>
          <NavLink to="/evenements" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} onClick={() => setMenuOuvert(false)}>Événements</NavLink>
          <NavLink to="/galerie"    className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} onClick={() => setMenuOuvert(false)}>Galerie</NavLink>
          <NavLink to="/contact" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} onClick={() => setMenuOuvert(false)}>Contact</NavLink>
          <Link to="/#rejoindre" className="nav-btn" onClick={() => setMenuOuvert(false)}>Rejoindre</Link>
          <NavLink to="/Feedback"        className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} onClick={() => setMenuOuvert(false)}>Feedback</NavLink>
        </nav>

        {/* Burger mobile — §2.2 : menu adapté mobile */}
        <button
          className={`burger ${menuOuvert ? "burger--open" : ""}`}
          onClick={() => setMenuOuvert(!menuOuvert)}
          aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOuvert}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
