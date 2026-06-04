// Evenements.jsx: affichage des événements sous forme de liste
import { useState } from "react";    // useState
import { evenements } from "../data";
import EventCard from "../components/EventCard";

const CATEGORIES = ["Tous", ...new Set(evenements.map((e) => e.categorie))];

export default function Evenements() {
  // useState pour filtrer les événements 
  const [filtre, setFiltre] = useState("Tous");

  const liste = filtre === "Tous"
    ? evenements
    : evenements.filter((e) => e.categorie === filtre);

  return (
    <main className="page-evenements">
      <div className="container">
        <header className="page-header">
          <h1> Événements du club</h1>
          <p>Retrouve toutes les activités, ateliers et conférences organisés par le club.</p>
        </header>

        

        {/* Liste des événements */}
        <div className="events-list">
          {liste.length > 0 ? (
            liste.map((ev) => <EventCard key={ev.id} event={ev} />)
          ) : (
            <p className="vide">Aucun événement pour cette catégorie.</p>
          )}
        </div>
      </div>
    </main>
  );
}
