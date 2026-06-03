// Galerie.jsx — Galerie photos du club avec lightbox
import { useState, useEffect, useCallback } from "react";
import { photos, categoriesGalerie } from "../data";

export default function Galerie() {
  const [filtre, setFiltre]       = useState("Tous");
  const [lightbox, setLightbox]   = useState(null); // index de la photo ouverte

  // Photos filtrées
  const liste = filtre === "Tous"
    ? photos
    : photos.filter((p) => p.categorie === filtre);

  // Navigation lightbox au clavier
  const fermer  = useCallback(() => setLightbox(null), []);
  const suivant = useCallback(() => setLightbox((i) => (i + 1) % liste.length), [liste.length]);
  const precedent = useCallback(() => setLightbox((i) => (i - 1 + liste.length) % liste.length), [liste.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e) => {
      if (e.key === "Escape")     fermer();
      if (e.key === "ArrowRight") suivant();
      if (e.key === "ArrowLeft")  precedent();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightbox, fermer, suivant, precedent]);

  const photoActive = lightbox !== null ? liste[lightbox] : null;

  return (
    <main className="page-galerie">
      <div className="container">
        <header className="page-header">
          <h1>Galerie du club</h1>
          <p>Moments forts, ateliers, hackathons et événements en images.</p>
        </header>

        {/* Filtres */}
        <div className="filtres" role="group" aria-label="Filtrer par catégorie">
          {["Tous", ...categoriesGalerie].map((cat) => (
            <button
              key={cat}
              className={`filtre-btn ${filtre === cat ? "filtre-btn--actif" : ""}`}
              onClick={() => setFiltre(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Compteur */}
        <p className="galerie-compteur">{liste.length} photo{liste.length > 1 ? "s" : ""}</p>

        {/* Grille masonry */}
        <div className="galerie-grid">
          {liste.map((photo, idx) => (
            <button
              key={photo.id}
              className="galerie-item"
              onClick={() => setLightbox(idx)}
              aria-label={`Voir : ${photo.titre}`}
            >
              {/* Image de placeholder colorée avec emoji */}
              <div className="galerie-img" style={{ background: photo.couleur }}>
                <img src={photo.couleur} alt="Logo" className="brand-logo"/>

                <span className="galerie-emoji" aria-hidden="true">{photo.emoji}</span>
              </div>
              <div className="galerie-overlay">
                <span className="galerie-titre">{photo.titre}</span>
                <span className="galerie-cat">{photo.categorie}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {photoActive && (
          <div
            className="lightbox-overlay"
            role="dialog"
            aria-modal="true"
            aria-label={`Photo : ${photoActive.titre}`}
            onClick={(e) => { if (e.target === e.currentTarget) fermer(); }}
          >
            <button className="lb-close" onClick={fermer} aria-label="Fermer">✕</button>

            <button className="lb-nav lb-prev" onClick={precedent} aria-label="Photo précédente">‹</button>

            <div className="lb-content">
              <div className="lb-img" style={{ background: photoActive.couleur }}>
                <span className="lb-emoji" aria-hidden="true">{photoActive.emoji}</span>
              </div>
              <div className="lb-info">
                <span className={`badge badge--blue`}>{photoActive.categorie}</span>
                <h2 className="lb-titre">{photoActive.titre}</h2>
                <p className="lb-desc">{photoActive.description}</p>
                <p className="lb-date">📅 {new Date(photoActive.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p>
                <p className="lb-counter">{lightbox + 1} / {liste.length}</p>
              </div>
            </div>

            <button className="lb-nav lb-next" onClick={suivant} aria-label="Photo suivante">›</button>
          </div>
        )}
      </div>
    </main>
  );
}
