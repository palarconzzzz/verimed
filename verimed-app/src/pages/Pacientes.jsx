import '../App.css';

const pacientes = [
  { id: 1, nombre: 'Rosa Castillo', edad: 76, estado: 'ESTABLE', tratamiento: 'Paracetamol + Enoxaparina' },
  { id: 2, nombre: 'Luis Herrera', edad: 38, estado: 'EN OBSERVACION', tratamiento: 'Amoxicilina' },
];

export default function Pacientes() {
  return (
    <div className="page">
      <h1>Pacientes</h1>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Estado clínico</th>
              <th>Tratamiento</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((p) => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>{p.edad}</td>
                <td>
                  <span className={`badge ${p.estado === 'ESTABLE' ? 'badge-success' : 'badge-warning'}`}>
                    {p.estado}
                  </span>
                </td>
                <td>{p.tratamiento}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
