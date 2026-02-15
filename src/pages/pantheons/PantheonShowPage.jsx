import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import GlobalContext from "../../context/GlobalContext"
import axios from "axios"
import GodsCard from "../../components/GodsCard"

export default function PantheonShowPage() {

  const { id } = useParams()
  const [pantheon, setPantheon] = useState(null)
  const [errors, setError] = useState([])
  const { API_URL_PANTHEONS, API_STORAGE_URL, loading, setLoading } = useContext(GlobalContext)

  function fetchData() {
    setLoading(true);
    axios.get(`${API_URL_PANTHEONS}/${id}`)
      .then(res => {
        setPantheon(res.data.data)
      })
      .catch(err => {
        console.log(err.message);
        setError({ error: err.message });
      })
      .finally(() => setLoading(false));
  }

  useEffect(fetchData, [id])
  return (
    <div>
      {!loading && <h1>Pantheon Details</h1>}
      <div className="container py-4">
        <div className="row">
          <div className="col">
            <a href="/pantheons" className="btn btn-secondary mb-3">Torna alla lista dei pantheon</a>
          </div>
          <div className="col-12">
            <div className="card">
              <div className="card-header d-flex align-items-center justify-content-between">
                <h1>{pantheon?.name}</h1>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-3">
                    <div className="card-img-top ">
                      <img className="img-fluid" src={`${API_STORAGE_URL}/${pantheon?.image}`}
                        alt={pantheon?.name} />
                    </div>
                  </div>
                  <div className="col-6 mt-4">
                    <p>{pantheon?.description}</p>
                  </div>
                  <div className="row mt-2 ms-2">
                    <span className="d-block"><strong>Regione:</strong> {pantheon?.region}</span>
                    <span className="d-block"><strong>Base:</strong> {pantheon?.home_base}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            <h2 className="">Dei</h2>
          </div>
        </div>
        <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-4 g-2">
          {pantheon?.gods?.map((god) => (
            <GodsCard key={god.id} god={god} />
          ))
          }
        </div>

      </div>
    </div>
  )
} 