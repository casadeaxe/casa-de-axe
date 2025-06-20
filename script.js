const produtos = [
  { id: 1, nome: "Erva de Defumação", preco: 15.00 },
  { id: 2, nome: "Vela 7 Dias", preco: 10.00 },
  { id: 3, nome: "Guia de Contas", preco: 25.00 }
];

function renderizarProdutos() {
  const container = document.getElementById("produtos-container");
  if (!container) return;
  produtos.forEach(p => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${p.nome}</h3>
      <p>R$ ${p.preco.toFixed(2)}</p>
      <button onclick="adicionarAoCarrinho(${p.id})">Adicionar ao carrinho</button>
    `;
    container.appendChild(div);
  });
}

function adicionarAoCarrinho(id) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.push(id);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  alert("Produto adicionado ao carrinho!");
}

function renderizarCarrinho() {
  const container = document.getElementById("carrinho-container");
  if (!container) return;
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  if (carrinho.length === 0) {
    container.innerHTML = "<p>Seu carrinho está vazio.</p>";
    return;
  }
  let total = 0;
  container.innerHTML = "<ul>" + carrinho.map(id => {
    const produto = produtos.find(p => p.id === id);
    total += produto.preco;
    return `<li>${produto.nome} - R$ ${produto.preco.toFixed(2)}</li>`;
  }).join("") + "</ul><p><strong>Total:</strong> R$ " + total.toFixed(2) + "</p><button>Finalizar Compra</button>";
}

renderizarProdutos();
renderizarCarrinho();
