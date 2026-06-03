// Home.jsx : Page d'accueil complète
// • Nom, logo, description et objectif du club
// • Liste des membres principaux
// • Liste des événements ou activités prévues
// • Bouton "Rejoindre le club"
import { useState, useEffect } from "react";    // CDC §1.3 : useState, useEffect
import { Link } from "react-router-dom";
import { clubInfo, membres, evenements } from "../data";
import EventCard from "../components/EventCard";

export default function Home() {
  // useState
  const [adhesionOuverte, setAdhesionOuverte] = useState(false);
  const [form, setForm]   = useState({ prenom: "", nom: "", email: "", filiere: "" });
  const [envoye, setEnvoye] = useState(false);

  // useEffect : ferme la modale avec Escape
  useEffect(() => {
    const fermer = (e) => { if (e.key === "Escape") setAdhesionOuverte(false); };
    document.addEventListener("keydown", fermer);
    return () => document.removeEventListener("keydown", fermer);
  }, []);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnvoye(true);
    setTimeout(() => { setAdhesionOuverte(false); setEnvoye(false); setForm({ prenom: "", nom: "", email: "", filiere: "" }); }, 2000);
  };

  // 3 premiers événements pour l'aperçu accueil
  const aperçuEvents = evenements.slice(0, 3);

  return (
    <main className="home">

      {/*HERO : nom, logo, description, objectif ── */}
      <section className="hero" aria-labelledby="hero-titre">
        <div className="hero-content">
          <div className="hero-badge">
            <span>{clubInfo.faculte}</span>
          </div>
          <img src={clubInfo.logo} alt="Logo" className="hero-logo" style={{height:"120px", objectFit:"contain", marginBottom:"1rem"}} />          <h1 id="hero-titre" className="hero-titre">{clubInfo.nom}</h1>
          <p className="hero-description">{clubInfo.description}</p>
          <blockquote className="hero-objectif">
            <strong>Notre objectif :</strong> {clubInfo.objectif}
          </blockquote>
          {/* Bouton "Rejoindre le club" */}
          <div className="hero-actions">
            <button
              id="rejoindre"
              className="btn btn-primary"
              onClick={() => setAdhesionOuverte(true)}
            >Rejoindre le club</button>
            <Link to="/evenements" className="btn btn-outline">
              Voir tous les événements →
            </Link>
          </div>
        </div>
        <div className="hero-deco" aria-hidden="true">
          <div className="deco-cercle c1" />
          <div className="deco-cercle c2" />
          <div className="deco-cercle c3" />
        </div>
      </section>

      {/*  MEMBRES : liste des membres principaux */}
      <section className="section" aria-labelledby="membres-titre">
        <div className="container">
          <div className="section-header">
            <h2 id="membres-titre" className="section-titre">Membres du bureau</h2>
            <p className="section-sous-titre">L'équipe qui fait vivre le club</p>
          </div>
          <div className="membres-grid">
            {membres.map((m) => (
              <article key={m.id} className="membre-card">   {/* hover animation */}
                <div className="membre-avatar" style={{ background: m.couleur }}>
                  {m.initiales}
                </div>
                <div className="membre-info">
                  <h3 className="membre-nom">{m.prenom} {m.nom}</h3>
                  <span className="membre-role">{m.role}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ÉVÉNEMENTS : aperçu*/}
      <section className="section section-alt" aria-labelledby="events-titre">
        <div className="container">
          <div className="section-header">
            <h2 id="events-titre" className="section-titre">Prochains événements</h2>
            <p className="section-sous-titre">Activités et rencontres à venir</p>
          </div>
          {/*affichage sous forme de liste */}
          <div className="events-list">
            {aperçuEvents.map((ev) => (
              <EventCard key={ev.id} event={ev} />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link to="/evenements" className="btn btn-outline">
              Voir tous les événements ({evenements.length}) →
            </Link>
          </div>
        </div>
      </section>

      {/* MODALE ADHÉSION*/}
      {adhesionOuverte && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-titre"
          onClick={(e) => { if (e.target === e.currentTarget) setAdhesionOuverte(false); }}
        >
          <div className="modal">
            <button className="modal-close" onClick={() => setAdhesionOuverte(false)} aria-label="Fermer">✕</button>
            {envoye ? (
              <div className="modal-success">
                <div className="success-icon"></div>
                <h3>Demande envoyée !</h3>
                <p>Bienvenue dans le {clubInfo.nom} !</p>
              </div>
            ) : (
              <>
                <h2 id="modal-titre"> Rejoindre le club</h2>
                <p>Remplis ce formulaire et nous te contacterons.</p>
                <form className="form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="prenom">Prénom *</label>
                      <input id="prenom" name="prenom" type="text" value={form.prenom} onChange={handleChange} required placeholder="Ton prénom" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="nom">Nom *</label>
                      <input id="nom" name="nom" type="text" value={form.nom} onChange={handleChange} required placeholder="Ton nom" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email universitaire *</label>
                    <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="prenom.nom@etu.uh2c.ac.ma" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="filiere">Filière</label>
                    <input id="filiere" name="filiere" type="text" value={form.filiere} onChange={handleChange} required placeholder="Ex: L3 Informatique" />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                    Envoyer ma demande
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

    </main>
  );
}
