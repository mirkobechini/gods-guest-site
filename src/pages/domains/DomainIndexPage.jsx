import { useContext, useEffect, useState } from "react"
import DomainBadge from "../../components/DomainBadge"
import GlobalContext from "../../context/GlobalContext"
import axios from "axios"

export default function DomainIndexPage() {

  const [domains, setDomains] = useState([])
  const [errors, setError] = useState([])
  const { API_URL_DOMAINS } = useContext(GlobalContext)

  function fetchData() {
    axios.get(`${API_URL_DOMAINS}`)
      .then(res => {
        setDomains(res.data.data)
      })
      .catch(err => {
        console.log(err.message);
        setError({ error: err.message });
      })
  }

  useEffect(fetchData, [])

  return (
    <div>
      <h1>Domains</h1>
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