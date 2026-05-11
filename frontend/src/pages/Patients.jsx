import { useEffect, useState } from "react";
import { getPatients } from "../services/api";

function Patients() {

  const [patients, setPatients] = useState([]);

  useEffect(() => {

    getPatients().then(res => {
      setPatients(res.data);
    });

  }, []);

  return (

    <div>

      <h2>Patients</h2>

      <table border="1">

        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
          </tr>
        </thead>

        <tbody>

          {patients.map(p => (

            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.gender}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default Patients;