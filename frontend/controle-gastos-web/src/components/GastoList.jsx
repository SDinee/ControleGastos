import { useState } from "react";

function GastoList({ gastos, onGastoAlterado }) {
    const [gastoEditando, setGastoEditando] = useState(null);
    
    function excluirGasto(id) {
        fetch(`http://localhost:5121/api/gastos/${id}`, {
        method: "DELETE",
        })
        .then((resposta) => {
        if (!resposta.ok) {
            throw new Error("Erro ao excluir gasto");
        }

        // Atualiza a lista de gastos após a exclusão
        return onGastoAlterado();
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
        
        return onGastoAlterado();
        })
        .then(() => {

        setGastoEditando(null);

        alert("Gasto atualizado com sucesso!");
        })
        .catch((erro) => {
        console.error(erro);
        alert("Ocorreu um erro ao atualizar o gasto.");
        });
    }

    return (
        <div>
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

export default GastoList;