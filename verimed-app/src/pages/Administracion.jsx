import '../App.css';

export default function Administracion() {
  return (
    <div className="page">
      <h1>Administración de Medicamentos</h1>
      <div className="card">
        <h3>Verificar y administrar</h3>
        <p style={{ marginBottom: '1rem', color: '#555' }}>
          Escanea el código QR del paciente y del medicamento para verificar dosis, vía y horario.
        </p>
        <div className="form-group">
          <label>Código QR Paciente</label>
          <input placeholder="Escanear o ingresar código" />
        </div>
        <div className="form-group">
          <label>Código QR Medicamento</label>
          <input placeholder="Escanear o ingresar código" />
        </div>
        <button className="btn-primary" style={{ width: 'auto', padding: '0.7rem 1.5rem' }}>
          Verificar
        </button>
      </div>
    </div>
  );
}
