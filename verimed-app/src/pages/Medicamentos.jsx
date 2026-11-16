import '../App.css';

const medicamentos = [
  { id: 1, nombre: 'Paracetamol', principio: 'Paracetamol', stock: 200, minimo: 50, estado: 'DISPONIBLE' },
  { id: 2, nombre: 'Amoxicilina', principio: 'Amoxicilina', stock: 80, minimo: 40, estado: 'DISPONIBLE' },
  { id: 3, nombre: 'Enoxaparina', principio: 'Enoxaparina sódica', stock: 30, minimo: 20, estado: 'DISPONIBLE' },
];

export default function Medicamentos() {
  return (
    <div className="page">
      <h1>Medicamentos e Inventario</h1>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Medicamento</th>
              <th>Principio activo</th>
              <th>Stock</th>
              <th>Mínimo</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {medicamentos.map((m) => (
              <tr key={m.id}>
                <td>{m.nombre}</td>
                <td>{m.principio}</td>
                <td>{m.stock}</td>
                <td>{m.minimo}</td>
                <td><span className="badge badge-success">{m.estado}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
