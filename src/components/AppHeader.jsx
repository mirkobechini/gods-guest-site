import { NavLink } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import { useContext } from "react";

export default function AppHeader() {


    const { theme, toggleTheme, animation, toggleAnimation } = useContext(GlobalContext);

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <a className="navbar-brand" href="/">Gods Guest Site</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav position-relative w-100">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/gods">Gods</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/pantheons">Pantheons</NavLink>
                            </li>   
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/domains">Domains</NavLink>
                            </li>
                            <li className="nav-item position-absolute end-0 d-flex align-items-center gap-2">
                                <button className="nav-link btn btn-link border border-2 rounded-pill px-3" onClick={toggleTheme}>{theme === "light" ? <i className="bi bi-moon-stars-fill"></i> : <i className="bi bi-sun-fill"></i>}</button>
                                <button className="nav-link btn btn-link border border-2 rounded-pill px-3" onClick={toggleAnimation}>{animation === "on" ? <i className="bi bi-pause-fill"></i> : <i className="bi bi-play-fill"></i>}</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}