// EventCard.jsx : animation légère au survol des cartes
export default function EventCard({ event }) {
  const dateObj = new Date(event.date);
  const jour = dateObj.toLocaleDateString("fr-FR", { day: "2-digit" });
  const mois = dateObj.toLocaleDateString("fr-FR", { month: "short" });
  const annee = dateObj.getFullYear();

  const categorieClass = {
    "Hackathon":   "badge--blue",
    "Atelier":     "badge--green",
    "Conférence":  "badge--purple",
    "Compétition": "badge--orange",
  }[event.categorie] ?? "badge--gray";

  return (
    <article className="event-card">          {/* animation hover via CSS*/}
      <div className="event-card-date">
        <span className="date-jour">{jour}</span>
        <span className="date-mois">{mois}</span>
        <span className="date-annee">{annee}</span>
      </div>
      <div className="event-card-body">
        <div className="event-card-top">
          <span className={`badge ${categorieClass}`}>{event.categorie}</span>
          
        </div>
        <h3 className="event-titre">{event.titre}</h3>
        <p className="event-desc">{event.description}</p>
        <div className="event-meta">
          <span>🕐 {event.heure}</span>
          <span>📍 {event.lieu}</span>
        </div>
      </div>
    </article>
  );
}
