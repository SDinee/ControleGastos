import "./GastoForm.css";
import { useState } from 'react';
import { criarGasto } from '../services/gastosServices';
import "./GastoForm.css";

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
        <form className="gasto-form" onSubmit={adicionarGasto}>
            <div className="form-cabecalho">
                <h2>Novo gasto</h2>
                <p>Preencha os dados para registrar sua despesa.</p>
            </div>
            
            <div className="campo">
                <label htmlFor="nome">Nome</label>

                <input
                    id="nome"
                    type="text"
                    placeholder="Ex: Conta de luz"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
            </div>

            <div className="campo">
                <label htmlFor="nome">Descrição</label>
                <input
                    type="text"
                    placeholder="Ex: Pagar antes do fim do mês"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />
            </div>
            <div className="campos-linha">
                <div className="campo">
                    <label htmlFor="nome">Valor</label>
                    <input
                        type="number"
                        placeholder="R$: 0,00"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="nome">Vencimento</label>
                    <input
                    type="date"
                    pmin="2000-01-01"
                    max="2999-12-31"
                    value={vencimento}
                    onChange={(e) => setVencimento(e.target.value)}
                />
                </div>
            </div>

            <button className="btn-adicionar" type="submit">
                Adicionar gastos
            </button>
        </form>
    );
}

export default GastoForm;