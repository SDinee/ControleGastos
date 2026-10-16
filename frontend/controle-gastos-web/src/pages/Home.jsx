import { useState, useEffect } from 'react';
import GastoForm from '../components/GastoForm';
import GastoList from '../components/GastoList';

function Home() {
    const [gastos, setGastos] = useState([]);
    const quantidadeGastos = gastos.length;
    const valorTotal = gastos.reduce((total, gasto) => {
        return total + gasto.valor;
    }, 0);

    function carregarGastos() {
        return fetch("http://localhost:5121/api/gastos")
        .then((resposta) => resposta.json())
        .then((dados) => {
        setGastos(dados);
        });
    }

    useEffect(() => {
        carregarGastos().catch((erro) => {
        console.error(erro);
        alert("Ocorreu um erro ao carregar os gastos.");
        });
    }, []);

    return (
        <div>
        <GastoForm onGastoAdicionado={carregarGastos} />

        <h1>Controle de Gastos</h1>
        <p>Quantidade: {quantidadeGastos}</p>
        <p>Valor total: R$ {valorTotal.toFixed(2)}</p>

        <GastoList
        gastos={gastos}
        onGastoAlterado={carregarGastos}
        />
        </div>
    )
}

export default Home;