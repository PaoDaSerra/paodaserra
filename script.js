var doc = document.documentElement
let produtos = [];
let itemsCarrinho = [];
let totalPrice = 0;

// --------------------------------------------------------------------
window.addEventListener('scroll', changeOpacity)

function changeOpacity(e) {
  var opacity = window.scrollY / 200;
  if (opacity > 1) {
    opacity = 1
  }

  doc.style.setProperty('--op', opacity)
  doc.style.setProperty('--ops', opacity / 5)
}


// --------------------------------------------------------------------
function listarPoes() {
    const gradeProdutos = document.querySelector("#produtos");

    produtos.forEach(produto => {
        const novoProduto = document.createElement("div");
        novoProduto.classList.add("produto");
    
        novoProduto.innerHTML = `
            <img src="${produto.imagem}" alt="Imagem ${produto.nome}" class="imagem">
    
            <div class="informacoes">
                <h3 class="nome">${produto.nome}</h3>
                <h3 class="preco">R$${produto.preco.toFixed(2)}</h3>
            </div>

            
            <div class="botoes">
                <div class="quantidade">
                  <button class="diminuir_quantidade" type="button">-</button>
                  <input class="quantidade_input" name="quantidade" type="number" value="${produto.quantidade}">
                  <button class="aumentar_quantidade" type="button">+</button>
                </div>
                <button class="comprar" type="button">Comprar</button>
            </div>
        `;
    
        gradeProdutos.appendChild(novoProduto);

      });
    listeners();
}


// --------------------------------------------------------------------
function listeners() {
  const diminuir = document.querySelectorAll(".diminuir_quantidade");
  const aumentar = document.querySelectorAll(".aumentar_quantidade");
  const comprarBotoes = document.querySelectorAll('.comprar');
  
  
  comprarBotoes.forEach((botao, indice) => {
    botao.addEventListener('click', () => {
      addToCart(produtos[indice]);
      openCart();
    });
  });

  aumentar.forEach((botao, indice) => {
    botao.addEventListener("click", () => {
      const quantidade = botao.closest(".quantidade");

      if (produtos[indice].quantidade != 9) {
        produtos[indice].quantidade++;
        quantidade.childNodes[3].value = produtos[indice].quantidade;
      }
    })
  })

  diminuir.forEach((button, indice) => {
    button.addEventListener("click", () => {
      const quantidade = button.closest(".quantidade");

      if (produtos[indice].quantidade != 1) {
        produtos[indice].quantidade--;
        quantidade.childNodes[3].value = produtos[indice].quantidade;
      }
    })
  })
}

// --------------------------------------------------------------------
fetch('https://raw.githubusercontent.com/PaoDaSerra/paodaserra/main/info.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro de requisição: ${response.status}`);
    }

    return response.json();
  })
  .then(data => {
    produtos = data.produtos;
    listarPoes(produtos);
  })
  .catch(error => {
    console.error('Erro na requisição:', error);
  });


// --------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  var verprodutos = document.getElementById("verProdutos");
  var contato = document.getElementById("contatoNav");
  var produtoNav = document.getElementById("produtoNav");
  var targetSection = document.getElementById("nossosProdutos");
  var targetSection2 = document.getElementById("contatos");

  verprodutos.addEventListener("click", function () {
      targetSection.scrollIntoView({ behavior: "smooth" });
  });
  produtoNav.addEventListener("click", function () {
      targetSection.scrollIntoView({ behavior: "smooth" });
  });
  contato.addEventListener("click", function () {
      targetSection2.scrollIntoView({ behavior: "smooth" });
  });
});


// --------------------------------------------------------------------
function openCart() {
  document.getElementById("cart").style.width = "320px";
  document.querySelector("#filtro").style.display = "block"
  document.querySelector("#filtro").style.opacity = ".5"
  // document.querySelector(".wrapper").style.opacity = "1";
  /* displayCartItems(); */
}

function closeCart() {
  document.getElementById("cart").style.width = "0";
  document.querySelector("#filtro").style.display = "none"
  document.querySelector("#filtro").style.opacity = "0"
  // document.querySelector(".wrapper").style.opacity = "0";
}

function addToCart(produto) {
  itemsCarrinho.push(produto);
  console.log(itemsCarrinho)
  displayCartItems();
}

function displayCartItems() {
  const cartItemsElement = document.getElementById("cart-items");
  cartItemsElement.innerHTML = "";

  itemsCarrinho.forEach(item => {
    const listItem = document.createElement("div");
    listItem.classList.add("item")
    cartItemsElement.appendChild(listItem);

    listItem.innerHTML += `
    <img src="${item.imagem}" alt="">
    <div class="informacoesProduto">
        <h3>${item.nome}</h3>
        <p>Tamanho: Grande</p>
        <p id="preco">R$ ${item.preco.toFixed(2)}</p>
    </div>
    <div class="optButtons">
        <div class="quantidade">
            <button class="diminuir_quantidade" type="button">-</button>
            <input class="quantidade_input" name="quantidade" type="number" value="${item.quantidade}">
            <button class="aumentar_quantidade" type="button">+</button>
        </div>
        <button class="lixo" type="button">
            <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    </div>`

    // listItem.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
    totalPrice += item.preco * item.quantidade;
  });
  
  // listeners();
  const totalElement = document.querySelector(".subtotal > #preco");
  totalElement.textContent = `R$ ${totalPrice.toFixed(2)}`;
}

function sendMessage() {
  var link = "https://wa.me/+5511992752013?text=";

  var horaAtual = new Date().getHours();

  if (horaAtual >= 6 && horaAtual < 12) {
    link += 'Oi,%20bom%20dia!%20';
  } else if (horaAtual >= 12 && horaAtual < 18) {
    link += 'Oi,%20boa%20tarde!%20';
  } else {
    link += 'Oi,%20boa%20noite!%20';
  }

  link += "Gostaria%20fazer%20o%20seguinte%20pedido:%0A%0A";

  itemsCarrinho.forEach(item => {
    link += `-%20${item.quantidade}x%20${item.nome};%0A`;
  })

  link += `%0A*Total:*                                    %20R$%20${totalPrice.toFixed(2)}`

  window.open(link, '_blank');
}