import { useContext, useEffect, useState } from "react"
import GlobalContext from "../../context/GlobalContext"
import axios from "axios"

export default function PantheonIndexPage() {

  const [pantheons, setPantheons] = useState([])
  const [hoveredPantheonId, setHoveredPantheonId] = useState(null)
  const [errors, setError] = useState([])
  const { API_URL_PANTHEONS, API_STORAGE_URL } = useContext(GlobalContext)

  function fetchData() {
    axios.get(`${API_URL_PANTHEONS}`)
      .then(res => {
        setPantheons(res.data.data)
      })
      .catch(err => {
        console.log(err.message);
        setError({ error: err.message });
      })
  }

  useEffect(fetchData, [])

  return (
    <div>
      <h1>Pantheons</h1>
      <div className="container my-4 position-relative">

        <div className="row row-cols-auto g-3">
          {
            pantheons.map((pantheon) => (
              <div className="col" key={pantheon.id}>
                <div className="card " style={{ width: "18rem" }}>
                  <div
                    className="card-img-top zoom-hover zoom-hover-pantheon"
                    onMouseEnter={() => setHoveredPantheonId(pantheon.id)}
                    onMouseLeave={() => setHoveredPantheonId(null)}
                  >
                    <img src={`${API_STORAGE_URL}/${pantheon.image}`} alt={pantheon.name} style={{ width: '100%' }}/>
                  </div>
                </div>
                {
                  hoveredPantheonId === pantheon.id &&
                  <div className="card mt-2 position-absolute top-50 start-50 translate-middle" style={{ width: "30rem", zIndex: 1 }}>
                    <div className="card-header">{pantheon.name}</div>
                    <div className="card-body">
                      <div className="row">
                        {
                          pantheon.gods?.map((god) => (
                            <div className="col-6" key={god.id}>
                              <img src={`${API_STORAGE_URL}/${god.image}`} alt={god.name} className="img-fluid rounded-circle" />
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
} 