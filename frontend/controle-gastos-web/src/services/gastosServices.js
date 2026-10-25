const API_URL = import.meta.env.VITE_API_URL;

export function listarGastos() {
    return fetch(API_URL)
        .then((resposta) => {
            if (!resposta.ok) {
                throw new Error("Erro ao carregar gastos");
            }

            return resposta.json();
        })
}

export function criarGasto(gasto) {
    return fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(gasto)
    })
    .then(async (resposta) => {
        if (!resposta.ok) {
            const dadosErro = await resposta.json().catch(() => null);
            const mensagens = Object.values(dadosErro?.errors ??
                {}).flat();

                throw new Error(
                    mensagens.length > 0
                    ? mensagens.join(" ")
                    : dadosErro?.title ?? "Não foi possível cadastrar o gasto."
                );
        }

        return resposta.json();
    });
}

export function removerGasto(id) {
    return fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })
    .then((resposta) => {
        if (!resposta.ok) {
            throw new Error("Erro ao excluir gasto");
        }
    });
}

export function atualizarGasto(id, gasto) {
    return fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(gasto)
    })
    .then((resposta) => {
        if (!resposta.ok) {
            throw new Error("Erro ao atualizar gasto");
        }
    });
}