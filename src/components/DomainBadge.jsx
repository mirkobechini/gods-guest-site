import { Link } from "react-router-dom";

export default function DomainBadge({ domain }) {


    return (
        <>
            <Link to={`/domains/${domain.id}`}>
                <div className="col">
                        <i className={`${domain.icon}  zoom-hover`} style={{ fontSize: "5rem", color: domain.color }}></i>
                </div>
            </Link>
        </>
    )
}