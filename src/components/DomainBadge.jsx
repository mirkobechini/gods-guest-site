import { Link } from "react-router-dom";

export default function DomainBadge({ domain }) {


    return (
        <>
            <Link to={`/domains/${domain.id}`}>
                <div className="col">
                        <i className={`${domain.icon}`} style={{ fontSize: "2rem", color: domain.color }}></i>
                </div>
            </Link>
        </>
    )
}