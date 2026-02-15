import { useContext } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";

export default function GodsCard({ god }) {

    const { API_STORAGE_URL } = useContext(GlobalContext);

    return (
        <>
            <div className="col">

                <div className="card h-100" style={{ width: "100%", maxHeight: "100%" }}>
                    <Link className="text-decoration-none text-dark" to={`/gods/${god.id}`}>

                        <div className="card-img-top" style={{ aspectRatio: "1 / 1", overflow: "hidden" }}>
                            <img className="img-fluid" src={`${API_STORAGE_URL}/${god.image}`} alt={god.name}
                                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                            />
                        </div>

                    </Link>
                    <div className="card-body p-2">
                        <div className="row">
                            <span><strong>{god.name}</strong> - {god.title}</span>
                            <div className="mt-2 d-flex gap-1">
                                {
                                    god.domains.map((domain)=>(
                                        
                                        <Link key={domain.id} to={`/domains/${domain.id}`}>
                                            <i className={`${domain.icon} bg-secondary-subtle py-1`} style={{color:`${domain.color}`}}></i>
                                            </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}