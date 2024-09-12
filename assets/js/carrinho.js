document.addEventListener("DOMContentLoaded", function () {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const carrinhoContainer = document.getElementById("carrinho-container");
    let total = 0;
    let totalQuantidade = 0;

    function atualizarCarrinho() {
        carrinhoContainer.innerHTML = ""; 
        total = 0;
        totalQuantidade = 0;

        if (carrinho.length === 0) {
            carrinhoContainer.innerHTML = "<p>Carrinho vazio!</p>";
        } else {
            carrinho.forEach((produto, index) => {
                const produtoDiv = document.createElement("div");
                produtoDiv.className = "product";
                produtoDiv.innerHTML = `
                    <img src="${produto.imagem}" alt="${produto.nome}">
                    <h3 class="product-title">${produto.nome}</h3>
                    <p class="product-price">Preço: R$${produto.preco}</p>
                    <p class="product-quantity">Quantidade: ${produto.quantidade}</p>
                    <button class="btn btn-danger btn-remover" data-index="${index}">Remover</button>
                `;

                carrinhoContainer.appendChild(produtoDiv);

                total += parseFloat(produto.preco.replace('R$', '').replace('.', '').replace(',', '.')) * produto.quantidade;
                totalQuantidade += produto.quantidade;
            });

            const totalDiv = document.createElement("div");
            totalDiv.innerHTML = `
                <h2>Total: R$${total.toFixed(2).replace('.', ',')}</h2>
                <h2>Quantidade Total: ${totalQuantidade}</h2>
            `;
            carrinhoContainer.appendChild(totalDiv);

            const botoesRemover = document.querySelectorAll(".btn-remover");
            botoesRemover.forEach(botao => {
                botao.addEventListener("click", function () {
                    const index = this.dataset.index;

                    if (carrinho[index].quantidade > 1) {
                        carrinho[index].quantidade -= 1; 
                    } else {
                        carrinho.splice(index, 1); 
                    }

                    localStorage.setItem("carrinho", JSON.stringify(carrinho)); 
                    atualizarCarrinho(); 
                });
            });
        }
    }

    atualizarCarrinho(); 
});
