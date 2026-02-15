import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import GodsCard from "../../components/GodsCard";

export default function DomainShowPage() {

  const { id } = useParams();
  const [domain, setDomain] = useState({});
  const [error, setError] = useState({});

  const { API_URL_DOMAINS } = useContext(GlobalContext);

  function fetchData() {
    axios.get(`${API_URL_DOMAINS}/${id}`)
      .then((res) => {
        setDomain(res.data.data);
      })
      .catch((error) => {
        setError(error);
      });
  }

  useEffect(fetchData, [id]);

  return (
    <div>
      <h1>Domain Details</h1>
      <div className="container py-4">
        <div className="row">
          <div className="col">

            <Link to="/domains" className="btn btn-secondary mb-3" aria-label="Torna alla lista dei domini">Torna alla lista dei domini</Link>
          </div>
          <div className="col-12">
            <div className="card">
              <div className="card-header d-flex align-items-center justify-content-between">
                <h1>{domain.name} <i style={{ color: domain.color }} className={domain.icon}></i></h1>
              </div>
              <div className="card-body">
                <p className="card-text">{domain.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            <h2 className="">Dei</h2>
          </div>
        </div>
        {domain.gods?.length !== 0 && (
          <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-4 g-2">
            {domain.gods?.map((god) => (
              
                <GodsCard god={god} key={god.id} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
} 