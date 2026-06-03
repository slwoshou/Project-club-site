// Contact.jsx — informations de contact du club
import { useState } from "react";
import { clubInfo } from "../data";

export default function Contact() {
  const [form, setForm]     = useState({ prenom: "", email: "", message: "" });
  const [envoye, setEnvoye] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnvoye(true);
    setForm({ prenom: "", email: "", message: "" });
    setTimeout(() => setEnvoye(false), 4000);
  };

  return (
    <main className="page-contact">
      <div className="container">
        <header className="page-header">
          <h1>Contactez-nous</h1>
          <p>Une question ? Une idée ? Écris-nous, nous répondons rapidement.</p>
        </header>

        <div className="contact-grid">
          {/* Infos */}
          <div className="contact-infos">
            <h2>Informations</h2>
            <ul className="info-list">
              <li><span className="info-icon"> </span><a href={`mailto:${clubInfo.email}`}>{clubInfo.email}</a></li>
              <li><span className="info-icon"> </span><a href={`tel:${clubInfo.telephone}`}>{clubInfo.telephone}</a></li>
              <li><span className="info-icon"> </span><span>{clubInfo.adresse}</span></li>
            </ul>
            <h3 style={{ marginTop: "2rem" }}>Réseaux</h3>
            <div className="reseaux">
              <a href={clubInfo.reseaux.Youtube}    target="_blank" rel="noreferrer" className="reseau-btn">Youtube</a>
              <a href={clubInfo.reseaux.linkedin}  target="_blank" rel="noreferrer" className="reseau-btn">LinkedIn</a>
              <a href={clubInfo.reseaux.instagram} target="_blank" rel="noreferrer" className="reseau-btn">Instagram</a>
            </div>
          </div>

          {/* Formulaire */}
          <div className="contact-form-wrap">
            <h2>Envoyer un message</h2>
            {envoye && <div className="alert-success">Message envoyé avec succès !</div>}
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="c-prenom">Prénom *</label>
                <input id="c-prenom" name="prenom" type="text" value={form.prenom} onChange={handleChange} required placeholder="Ton prénom" />
              </div>
              <div className="form-group">
                <label htmlFor="c-email">Email *</label>
                <input id="c-email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="ton@email.com" />
              </div>
              <div className="form-group">
                <label htmlFor="c-message">Message *</label>
                <textarea id="c-message" name="message" rows="5" value={form.message} onChange={handleChange} required placeholder="Ton message…" />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                Envoyer ✉
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
