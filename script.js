var doc = document.documentElement
let produtos = [];
let itemsCarrinho = [];

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
function listarPoes(produtos) {
    const gradeProdutos = document.querySelector("#produtos");

    produtos.forEach(produto => {
        const novoProduto = document.createElement("div");
        novoProduto.classList.add("produto");
    
        novoProduto.innerHTML = `
            <img src="${produto.imagem}" alt="Imagem ${produto.nome}" class="imagem">
    
            <div class="informacoes">
                <h3 class="nome">${produto.nome}</h3>
                <h3 class="preco">R$ ${produto.preco.toFixed(2)}</h3>
            </div>

            
            <div class="botoes">
                <div class="quantidade">
                  <button class="diminuir_quantidade" type="button">-</button>
                  <input class="quantidade_input" name="quantidade" type="number" value="1">
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

  aumentar.forEach(function(button) {
    button.addEventListener("click", () => {
      const quantidade = button.closest(".quantidade");
      
      var value = quantidade.childNodes[3].value;
      
      if (value != 9) {
          quantidade.childNodes[3].value++
        }
    })
  })

  diminuir.forEach(function(button) {
    button.addEventListener("click", () => {
      const quantidade = button.closest(".quantidade");

      var value = quantidade.childNodes[3].value;

      if (value != 1) {
        quantidade.childNodes[3].value--
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
  // document.querySelector(".wrapper").style.opacity = "1";
  /* displayCartItems(); */
}

function closeCart() {
  document.getElementById("cart").style.width = "0";
  // document.querySelector(".wrapper").style.opacity = "0";
}

function addToCart(product) {
  itemsCarrinho.push(product);
  console.log(itemsCarrinho)
  /* displayCartItems(); */
}

/* function displayCartItems() {
  const cartItemsElement = document.getElementById("cart-items");
  cartItemsElement.innerHTML = "";
  let totalPrice = 0;

  cart.forEach(item => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
    cartItemsElement.appendChild(listItem);
    totalPrice += item.price;
  });

  const totalElement = document.getElementById("preco");
  totalElement.textContent = `R$ ${totalPrice.toFixed(2)}`;
}
 */
