import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import axios from "axios";
import GodsCard from "../../components/GodsCard";

export default function GodIndexPage() {

  const [gods, setGods] = useState([])
  const [currentPantheon, setCurrentPantheon] = useState([])
  const [errors, setError] = useState([])
  const { API_URL_GODS } = useContext(GlobalContext)

  function fetchData() {
    axios.get(`${API_URL_GODS}`)
      .then(res => {
        setGods(res.data.data)
        setCurrentPantheon(res.data.data[0].pantheon)
      })
      .catch(err => {
        console.log(err.message);
        setError({ error: err.message });
      })
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
      <h1>Gods</h1>
      <div className="container my-4">
        {
          // groupedGods ->"chiave": pantheon, "valore": array di dei
          Object.entries(groupedGods).map(([pantheon, gods]) => (
            <div key={pantheon} className="mb-2 card p-3 border-0 shadow-sm rounded bg-primary-subtle">
              <h2>{pantheon}</h2>
              <div className="row row-cols-1 row-cols-md-4 row-cols-lg-6 g-3">
                {
                  gods.map((god) => (
                    <GodsCard god={god} key={god.id} />
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
} 