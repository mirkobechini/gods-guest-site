import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import GlobalContext from "../../context/GlobalContext"
import axios from "axios"

export default function GodShowPage() {

  const { id } = useParams()
  const { API_STORAGE_URL, API_URL_GODS, loading, setLoading } = useContext(GlobalContext)

  const [god, setGod] = useState({})
  const navigate = useNavigate();

  function fetchData() {
    setLoading(true);
    axios.get(`${API_URL_GODS}/${id}`)
      .then(res => {
        setGod(res.data.data)
      })
      .catch(err => {
        if(err.response && err.response.status === 404) {
          navigate("/not-found", { replace: true });
        }
      })
      .finally(() => setLoading(false));
  }

  useEffect(fetchData, [id])

  if (loading) return null;
  return (
    <div>
      <h1>Dettagli dio</h1>
      <div className="container py-4">
        <Link to="/gods" className="btn btn-secondary mb-3" aria-label="Vai alla lista degli dei">Torna alla lista degli dei</Link>

        <div className="card">
          <div className="card-header d-flex align-items-center justify-content-between">
            <h1>{god.name} - {god.title}</h1>
          </div>
          <div className="card-body bg-pantheon" style={{ "--pantheon-bg": `url(${API_STORAGE_URL}/${god.pantheon?.image})` }}>
            <div className="row">
              <div className="col-3">
                <div className="card-img-top">
                  <img className="img-fluid" src={`${API_STORAGE_URL}/${god.image}`} alt={god.name} />
                </div>
              </div>
              <div className="col-6 mt-4">
                <p className="m-0">{god.description}</p>
              </div>

            </div>
            <div className="row mt-2 ms-2">
              <span className="d-block"><strong>Pantheon: </strong>
              <Link className="text-decoration-none text-body zoom-hover-text zoom-hover" to={`/pantheons/${god.pantheon?.id}`}>{god.pantheon?.name}</Link></span>
              <span className="d-block"><strong>Rango:</strong> {god.rank}</span>
              <span className="d-block"><strong>Domini: </strong>
                {god.domains?.map((domain) => (
                  <Link to={`/domains/${domain.id}`} key={domain.id}><i
                    className={`${domain.icon} bg-secondary py-1 ms-1 zoom-hover`}
                    style={{ color: domain.color }}></i></Link>
                ))}
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
} 