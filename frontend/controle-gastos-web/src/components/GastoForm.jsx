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
        alert(erro.message || "Não foi possível concluir o cadastro do gasto.");
    });
    }

function validarCampoObrigatorio(e, nomeCampo) {
    const campo = e.currentTarget;
    let mensagem = "";

    if (campo.validity.valueMissing) {
        mensagem = `Informe ${nomeCampo}.`;
    } else if (campo.validity.rangeUnderflow && campo.type === "date") {
        mensagem = "O vencimento deve ser a partir de 01/01/2000.";
    } else if (campo.validity.rangeOverflow && campo.type === "date") {
        mensagem = "O vencimento deve ser até 31/12/2999.";
    } else if (campo.validity.rangeUnderflow && campo.type === "number") {
        mensagem = "O valor deve ser maior que zero.";
    }
    campo.setCustomValidity(mensagem);
}

    return (
        <form className="gasto-form" onSubmit={adicionarGasto}>
            <div className="form-cabecalho">
                <h2>Novo Gasto</h2>
                <p>Preencha os dados para registrar sua despesa.</p>
            </div>
            
            <div className="campo">
                <label htmlFor="nome">Nome</label>

                <input
                    id="nome"
                    type="text"
                    placeholder="Ex: Conta de luz"
                    required
                    maxLength={50}
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    onInvalid={(e) => validarCampoObrigatorio(e, "o nome do gasto")}
                    onInput={(e) => e.currentTarget.setCustomValidity("")}
                />
            </div>

            <div className="campo">
                <label htmlFor="descricao">Descrição</label>
                <input
                    id="descricao"
                    type="text"
                    placeholder="Ex: Pagar antes do fim do mês"
                    required
                    maxLength={100}
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    onInvalid={(e) => validarCampoObrigatorio(e, "a descrição do gasto")}
                    onInput={(e) => e.currentTarget.setCustomValidity("")}
                />
            </div>
            <div className="campos-linha">
                <div className="campo">
                    <label htmlFor="valor">Valor</label>
                    <input
                        id="valor"
                        type="number"
                        placeholder="R$: 0,00"
                        required
                        min="0.01"
                        step="any"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        onInvalid={(e) => validarCampoObrigatorio(e, "o valor do gasto")}
                        onInput={(e) => e.currentTarget.setCustomValidity("")}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="vencimento">Vencimento</label>
                    <input  
                        id="vencimento"
                        type="date"
                        required
                        min="2000-01-01"
                        max="2999-12-31"
                        value={vencimento}
                        onChange={(e) => setVencimento(e.target.value)}
                        onInvalid={(e) => validarCampoObrigatorio(e, "o vencimento do gasto")}
                        onInput={(e) => e.currentTarget.setCustomValidity("")}
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