import { useState, useEffect } from 'react';
import GastoForm from '../components/GastoForm';
import GastoList from '../components/GastoList';
import { listarGastos } from '../services/gastosServices';
import "./Home.css"

function Home() {
    const [gastos, setGastos] = useState([]);
    const quantidadeGastos = gastos.length;
    const valorTotal = gastos.reduce((total, gasto) => {
        return total + gasto.valor;
    }, 0);

    function carregarGastos() {
        return listarGastos()
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
        <main className="home">
            <header className="home-cabecalho">
                <h1>Controle de Gastos</h1>
                <p>Gerencie suas despesas de forma simples.</p>
            </header>

            <section className="home-resumo">
                <div className="resumo-card">
                    <h3>Quantidade de gastos</h3>
                    <p>{quantidadeGastos}</p>
                </div>

                <div className="resumo-card">
                    <h3>Valor total</h3>
                    <p>R$ {valorTotal.toFixed(2)}</p>
                </div>
            </section>

        <GastoForm onGastoAdicionado={carregarGastos} />
        
        <GastoList
        gastos={gastos}
        onGastoAlterado={carregarGastos}
        />
        </main>
    )
}

export default Home;