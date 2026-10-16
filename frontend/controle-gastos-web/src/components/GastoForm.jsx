import { useState } from 'react';
import { criarGasto } from '../services/gastosServices';

function GastoForm({ onGastoAdicionado }) {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [vencimento, setVencimento] = useState("");

    function adicionarGasto(e) {
    e.preventDefault();

    const novoGasto = {
        nome: nome,
        valor: parseFloat(valor),
        descricao: descricao,
        vencimento: vencimento
    };

    criarGasto(novoGasto)
    .then(() => {
        setNome("");
        setDescricao("");
        setValor("");
        setVencimento("");
        
        // Atualiza a lista de gastos após adicionar um novo gasto
        return onGastoAdicionado();
    })
    .then(() => {
        alert("Gasto adicionado com sucesso!");
    })
    .catch((erro) => {
        console.error(erro);
        alert("Não foi possível concluir o cadastro do gasto.");
    });
    }

    return (
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

            <button type="submit">
                Adicionar gastos
            </button>
        </form>
    );
}

export default GastoForm;