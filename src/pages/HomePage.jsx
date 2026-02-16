import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h1>Gods Guest Site</h1>
      <p>Benvenuto al Gods Guest Site. Esplora i diversi dei, domini e pantheon.</p>
      <div className="btn-group" role="group" aria-label="Gruppo di bottoni per visitare le varie pagine">
        <Link to="/gods" className="btn btn-primary">Esplora Dei</Link>
        <Link to="/pantheons" className="btn btn-secondary">Esplora Pantheon</Link>
        <Link to="/domains" className="btn btn-success">Esplora Domini</Link>
      </div>

    </div>
  )
} 