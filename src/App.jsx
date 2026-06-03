// App.jsx: React Router pour la navigation entre pages
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header     from "./components/Header";
import Footer     from "./components/Footer";
import Home       from "./pages/Home";
import Evenements from "./pages/Evenements";
import Galerie    from "./pages/Galerie";
import Contact    from "./pages/Contact";
import Feedback   from "./pages/Feedback";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        {/*  barre de navigation */}
        <Header />

        {/* Pages */}
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/evenements"  element={<Evenements />} />
          <Route path="/contact"     element={<Contact />} />
          <Route path="/galerie"     element={<Galerie />} />
          <Route path="/Feedback"     element={<Feedback />} />

          {/* Redirection 404 vers accueil */}
          <Route path="*"            element={<Home />} />
        </Routes>

        {/*  footer avec informations de contact */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
