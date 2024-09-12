
document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:3000/produtos")
        .then(response => response.json())
        .then(data => {
            const produtosContainer = document.getElementById("produtos-container");

            data.forEach(produto => {
                const card = criarCardProduto(produto);
                produtosContainer.appendChild(card);
            });
        })
        .catch(error => console.error("Erro ao carregar os produtos:", error));
});

function gerarCardsProdutos(produtos) {
    const produtosContainer = document.getElementById("produtos-container");
    produtosContainer.innerHTML = "";

    let row;
    produtos.forEach((produto, index) => {
        if (index % 3 === 0) {
            row = criarLinha();
            produtosContainer.appendChild(row);
        }

        const card = criarCardProduto(produto);
        row.appendChild(card);
    });
}

function criarLinha() {
    const row = document.createElement("div");
    row.className = "row";
    return row;
}

function criarCardProduto(produto) {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4"; // Coluna para o layout de grid do Bootstrap

    card.innerHTML = `
        <div class="card">
            <img src="${produto.imagem}" alt="${produto.nome}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${produto.nome}</h5>
                <p class="card-text">${produto.descricao}</p>
                <a href="produto.html?id=${produto.id}" class="btn btn-primary ver-mais">Ver mais</a>
            </div>
        </div>  
    `;

    return card;
}
