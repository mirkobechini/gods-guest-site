import { useContext, useEffect, useState } from "react"
import GlobalContext from "../../context/GlobalContext"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

export default function PantheonIndexPage() {

  const [pantheons, setPantheons] = useState([])
  const [hoveredPantheonId, setHoveredPantheonId] = useState(null)
  const [errors, setError] = useState([])
  const { API_URL_PANTHEONS, API_STORAGE_URL, loading, setLoading } = useContext(GlobalContext)
  const navigate = useNavigate();

  function fetchData() {
    setLoading(true);
    axios.get(`${API_URL_PANTHEONS}`)
      .then(res => {
        setPantheons(res.data.data)
      })
      .catch(err => {
        console.log(err.message);
        setError({ error: err.message });
        if(err.response && err.response.status === 404) {
          navigate("/pantheons", { replace: true });
        }
      })
      .finally(() => setLoading(false));
  }

  useEffect(fetchData, [])

  if (loading) return null;

  return (
    <div>
      <h1>Pantheons</h1>
      <div className="container my-4">

        <div className="row row-cols-auto g-3">
          {
            pantheons.map((pantheon) => (
              <Link to={`/pantheons/${pantheon.id}`} className="col position-relative" key={pantheon.id}>
                <div className="card" style={{ width: "18rem" }}>
                  <div className="card-img-top  zoom-hover-pantheon" onMouseEnter={() => setHoveredPantheonId(pantheon.id)} onMouseLeave={() => setHoveredPantheonId(null)}>
                    <img className="zoom-hover" src={`${API_STORAGE_URL}/${pantheon.image}`} alt={pantheon.name} style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', objectPosition: 'center' }} />
                  </div>
                </div>
                {
                  hoveredPantheonId === pantheon.id &&
                  <div className="card mt-2 position-absolute start-0" style={{ width: "30rem", zIndex: 1 }}>
                    <div className="card-header">{pantheon.name}</div>
                    <div className="card-body">
                      <div className="row">
                        {
                          pantheon.gods?.map((god) => (
                            <div className="col-4" key={god.id}>
                              <img src={`${API_STORAGE_URL}/${god.image}`} alt={god.name} className="img-fluid rounded-circle" style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', objectPosition: 'center' }} />
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                }
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
} 