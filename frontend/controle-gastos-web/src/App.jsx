import './App.css'
import { useEffect, useState } from 'react';

function App() {
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5121/api/gastos")
      .then((resposta) => resposta.json())
      .then((dados) => {
        setGastos(dados);
      });
  }, []);

  return (
    <div>
      <h1>Controle de Gastos</h1>
      {gastos.map((gasto) => (
        <div className="gasto" key={gasto.id}>
          <p>{gasto.descricao}</p>
          <p>R$ {gasto.valor}</p>
        </div>
      ))}
    </div>
  );
}

export default App;