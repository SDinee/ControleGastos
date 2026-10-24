import { useState } from "react";
import { removerGasto } from "../services/gastosServices";
import { atualizarGasto } from "../services/gastosServices";
import "./GastoList.css";

function GastoList({ gastos, onGastoAlterado }) {
    const [gastoEditando, setGastoEditando] = useState(null);
    
    function excluirGasto(id) {
        removerGasto(id)
        .then(() => {
        // Atualiza a lista de gastos após a exclusão
        return onGastoAlterado();
        })
        .catch((erro) => {
            console.error(erro);
            alert("Não foi possível excluir o gasto");
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

        atualizarGasto(gastoEditando.id, gastoAtualizado)
        .then(() => {
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
            <div className="gasto-edicao">
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
            <div className="gasto-acoes">
                <button 
                    className="btn-salvar"  
                    onClick={salvarEdicao}>
                    Salvar
                </button>
                <button 
                    className="btn-cancelar"
                    onClick={() => setGastoEditando(null)}>
                    Cancelar
                </button>
            </div>
            </div>
        ) : (
            <div>
            <p>{gasto.nome}</p>
            <p>{gasto.descricao}</p>
            <p>{gasto.valor.toFixed(2)}</p>
            <p>Vencimento: {new Date(gasto.vencimento).toLocaleDateString("pt-BR")}</p>
            <div className="gasto-acoes">
                <button 
                    className="btn-editar"
                    onClick={() => editarGasto(gasto)}>
                    Editar
                </button>

                <button
                    className="btn-excluir"
                    onClick={() => excluirGasto(gasto.id)}>
                    Excluir
                </button>    
            </div>
            </div>
        )}

        </div>
        ))}

        </div>
    );
}

export default GastoList;