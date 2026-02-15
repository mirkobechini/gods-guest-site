import { useContext, useEffect, useState } from "react"
import DomainBadge from "../../components/DomainBadge"
import GlobalContext from "../../context/GlobalContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function DomainIndexPage() {

  const [domains, setDomains] = useState([])
  const [errors, setError] = useState([])
  const { API_URL_DOMAINS, loading, setLoading } = useContext(GlobalContext)
  const navigate = useNavigate();

  function fetchData() {
    setLoading(true);
    axios.get(`${API_URL_DOMAINS}`)
      .then(res => {
        setDomains(res.data.data)
      })
      .catch(err => {
        console.log(err.message);
        setError({ error: err.message });
        if(err.response && err.response.status === 404) {
          navigate("/not-found", { replace: true });
        }
      })
      .finally(() => setLoading(false));
  }

  useEffect(fetchData, [])

  return (
    <div>
      {!loading && <h1>Domains</h1>}
      <div className="container my-4">

        <div className="row row-cols-auto g-3">
          {
            domains.map((domain) => (
              <DomainBadge domain={domain} key={domain.id} />
            ))
          }
        </div>
      </div>
    </div>
  )
} 