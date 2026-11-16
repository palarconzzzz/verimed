import '../App.css';

export default function Dashboard() {
  return (
    <div className="page">
      <h1>Dashboard</h1>
      <div className="grid">
        <div className="card stat">
          <div className="number">12</div>
          <div>Pacientes activos</div>
        </div>
        <div className="card stat">
          <div className="number">48</div>
          <div>Administraciones hoy</div>
        </div>
        <div className="card stat">
          <div className="number">3</div>
          <div>Alertas activas</div>
        </div>
        <div className="card stat">
          <div className="number">5</div>
          <div>Medicamentos bajos</div>
        </div>
      </div>
      <div className="card">
        <h3>Últimas administraciones</h3>
        <table>
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Medicamento</th>
              <th>Hora</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Rosa Castillo</td>
              <td>Paracetamol 500mg</td>
              <td>08:05</td>
              <td><span className="badge badge-success">Administrada</span></td>
            </tr>
            <tr>
              <td>Luis Herrera</td>
              <td>Amoxicilina 500mg</td>
              <td>09:00</td>
              <td><span className="badge badge-warning">Omitida</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
