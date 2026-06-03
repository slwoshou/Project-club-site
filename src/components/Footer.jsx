// Footer.jsx — CDC §2.2 : footer avec informations de contact
import { Link } from "react-router-dom";
import { clubInfo } from "../data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* Identité */}
        <div className="footer-brand">
          <img src={clubInfo.logo} alt="Logo" className="brand-logo" style={{height:"36px", objectFit:"contain"}} />
          <div>
            <div className="footer-nom">{clubInfo.nom}</div>
            <div className="footer-univ">{clubInfo.universite}</div>
          </div>
        </div>

        {/* Navigation */}
        <div className="footer-col">
          <h4 className="footer-col-title">Navigation</h4>
          <Link to="/">Accueil</Link>
          <Link to="/evenements">Événements</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Contact — §2.2 : informations de contact dans le footer */}
        <div className="footer-col">
          <h4 className="footer-col-title">Contact</h4>
          <a href={`mailto:${clubInfo.email}`}>✉ {clubInfo.email}</a>
          <a href={`tel:${clubInfo.telephone}`}> {clubInfo.telephone}</a>
          <span> {clubInfo.adresse}</span>
        </div>

        {/* Réseaux */}
        <div className="footer-col">
          <h4 className="footer-col-title">Réseaux sociaux</h4>
          <a href={clubInfo.reseaux.Youtube}   target="_blank" rel="noreferrer">Youtube</a>
          <a href={clubInfo.reseaux.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={clubInfo.reseaux.instagram}target="_blank" rel="noreferrer">Instagram</a>
        </div>

      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} {clubInfo.nom} — {clubInfo.universite}</p>
      </div>
    </footer>
  );
}
