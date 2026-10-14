import './App.css'
import { useEffect, useState } from 'react';

function App() {
  const [gastos, setGastos] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(""); 
  const [vencimento, setVencimento] = useState("");
  const [gastoEditando, setGastoEditando] = useState(null);
  const quantidadeGastos = gastos.length;
  const valorTotal = gastos.reduce((total, gasto) => {
    return total + gasto.valor;
  }, 0);
function adicionarGasto(e) {
  e.preventDefault();

  const novoGasto = {
    nome: nome,
    valor: parseFloat(valor),
    descricao: descricao,
    vencimento: vencimento
  };

  fetch("http://localhost:5121/api/gastos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(novoGasto)
  })
  .then((resposta) => {
    if (!resposta.ok) {
      throw new Error("Erro ao adicionar gasto");
    }
    alert("Gasto adicionado com sucesso!");

    setNome("");
    setDescricao("");
    setValor("");
    setVencimento("");
    
    // Atualiza a lista de gastos após adicionar um novo gasto
    return fetch("http://localhost:5121/api/gastos")
      .then((resposta) => resposta.json())
      .then((dados) => {
        setGastos(dados);
      });
  })
}

function excluirGasto(id) {
  fetch(`http://localhost:5121/api/gastos/${id}`, {
    method: "DELETE",
  })
  .then((resposta) => {
    if (!resposta.ok) {
      throw new Error("Erro ao excluir gasto");
    }

    setGastos((gastosAtuais) =>
    gastosAtuais.filter((gasto) => gasto.id !== id)
    );
  });
}

function editarGasto(gasto) {
  setGastoEditando({ ...gasto });
}

function salvarEdicao() {
  const gastoAtualizado = {
    ...gastoEditando,
    valor: parseFloat(gastoEditando.valor),
  };

  fetch(`http://localhost:5121/api/gastos/${gastoEditando.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gastoAtualizado)
  })
  .then((resposta) => {
    if (!resposta.ok) {
      throw new Error("Erro ao atualizar gasto");
    }
    
    return fetch("http://localhost:5121/api/gastos");
  })
  .then((resposta) => {
    if (!resposta.ok) {
      throw new Error("Erro ao buscar gastos atualizados");
    }
    return resposta.json();
  })
  .then((dados) => {
    // Atualiza a lista de gastos com os dados atualizados
    setGastos(dados);

    // Limpa o estado de edição
    setGastoEditando(null);

    alert("Gasto atualizado com sucesso!");
  })
  .catch((erro) => {
    console.error(erro);
    alert("Ocorreu um erro ao atualizar o gasto.");
  });
}

  useEffect(() => {
    fetch("http://localhost:5121/api/gastos")
      .then((resposta) => resposta.json())
      .then((dados) => {
        setGastos(dados);
      });
  }, []);



  return (
    <div>
      <form onSubmit={adicionarGasto}>
          <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />

        <input
          type="date"
          placeholder="Data de vencimento"
          value={vencimento}
          onChange={(e) => setVencimento(e.target.value)}
        />

        <button type="submit"> Adicionar gastos</button>
      </form>

      <h1>Controle de Gastos</h1>
      <p>Quantidade: {quantidadeGastos}</p>
      <p>Valor total: R$ {valorTotal.toFixed(2)}</p>


      {gastos.map((gasto) => (
        <div className="gasto" key={gasto.id}>
          {gastoEditando?.id === gasto.id ? (
        <div>
          <input
            type="text"
            value={gastoEditando.nome}
            onChange={(e) =>
              setGastoEditando({
                ...gastoEditando,
                nome: e.target.value
              })
            }
          />

          <input
            type="text"
            value={gastoEditando.descricao}
            onChange={(e) =>
              setGastoEditando({
                ...gastoEditando,
                descricao: e.target.value
              })
            }
          />

          <input
            type="number"
            value={gastoEditando.valor}
            onChange={(e) =>
              setGastoEditando({
                ...gastoEditando,
                valor: e.target.value
              })
            }
          />

          <input
            type="date"
            value={gastoEditando.vencimento.split("T")[0]}
            onChange={(e) =>
              setGastoEditando({
                ...gastoEditando,
                vencimento: e.target.value
              })
            }
          />

          <button onClick={salvarEdicao}>
            Salvar
          </button>
          <button onClick={() => setGastoEditando(null)}>
            Cancelar
          </button>
        </div>
      ) : (
        <div>
          <p>{gasto.nome}</p>
          <p>{gasto.descricao}</p>
          <p>{gasto.valor.toFixed(2)}</p>
          <p>Vencimento: {new Date(gasto.vencimento).toLocaleDateString("pt-BR")}</p>
        
        <button onClick={() => editarGasto(gasto)}>
          Editar
        </button>

        <button onClick={() => excluirGasto(gasto.id)}>
          Excluir
        </button>
        </div>
      )}

      </div>
      ))}
    </div>
  );
}

export default App;