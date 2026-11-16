import '../App.css';

export default function Reportes() {
  return (
    <div className="page">
      <h1>Reportes y Alertas</h1>
      <div className="card">
        <h3>Alertas activas</h3>
        <table>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Mensaje</th>
              <th>Paciente</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>DOSIS_INCORRECTA</td>
              <td>La dosis escaneada no coincide con la prescripción</td>
              <td>Rosa Castillo</td>
              <td><span className="badge badge-danger">ACTIVA</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
