import { Link } from "react-router-dom";

export default function DomainBadge({ domain }) {


    return (
        <>
            <Link className="zoom-hover" to={`/domains/${domain.id}`}>
                <div className="col">
                        <i className={`${domain.icon}`} style={{ fontSize: "5rem", color: domain.color }}></i>
                </div>
            </Link>
        </>
    )
}