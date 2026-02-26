import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import axios from "axios";
import GodsCard from "../../components/GodsCard";
import GodCarousel from "../../components/GodCarousel";
import { Link, useNavigate } from "react-router-dom";

export default function GodIndexPage() {

  const [gods, setGods] = useState([])
  const [errors, setError] = useState([])
  const { API_URL_GODS, API_STORAGE_URL, loading, setLoading, animation } = useContext(GlobalContext)
  const navigate = useNavigate();

  function fetchData() {
    setLoading(true);
    axios.get(`${API_URL_GODS}`)
      .then(res => {
        setGods(res.data.data)
      })
      .catch(err => {
        console.log(err.message);
        setError({ error: err.message });
        if(err.response && err.response.status === 404) {
          navigate("/gods", { replace: true });
        }
      })
      .finally(() => setLoading(false));
  }

  useEffect(fetchData, [])


  //scorre l'array automaticamente

  const groupedGods = gods.reduce((result, god) => { //reduce trasforma un array in un oggetto
    const pantheonName = god.pantheon.name;
    if (!result[pantheonName]) result[pantheonName] = [];
    result[pantheonName].push(god);
    return result;
  }, {});

  return (
    <div>
      {!loading && <h1>Gods</h1>}
      <div className="container my-4">
        {
          // groupedGods ->"chiave": pantheon, "valore": array di dei
          Object.entries(groupedGods).map(([pantheon, gods]) => (
            <div key={pantheon} className="mb-2 card p-3 border-0 shadow-sm rounded bg-primary-subtle bg-pantheon" style={{ "--pantheon-bg": `url(${API_STORAGE_URL}/${gods[0].pantheon?.image})` }}>
              <Link className="h2 text-decoration-none text-body zoom-hover-text" to={`/pantheons/${gods[0].pantheon?.id}`}>{pantheon}</Link>
              <div className="row row-cols-1 ">
                {
                  animation === "on" ? (
                    <GodCarousel gods={gods} />
                  ) : (
                  gods.map((god) => (
                    <GodsCard god={god} key={god.id} />
                  ))
                  )
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
} 