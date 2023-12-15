var doc = document.documentElement

window.addEventListener('scroll', changeOpacity)

function changeOpacity(e) {
  var opacity = window.scrollY / 200;
  if (opacity > 1) {
    opacity = 1
  }

  doc.style.setProperty('--op', opacity)
  doc.style.setProperty('--ops', opacity / 5)
}



function listarPoes(produtos) {
    const gradeProdutos = document.querySelector("#produtos");

    produtos.forEach(produto => {
        const novoProduto = document.createElement("div");
        novoProduto.classList.add("produto");
    
        novoProduto.innerHTML = `
            <img src="assets/images/imagem.png" alt="Imagem ${produto.nome}" class="imagem">
    
            <div class="informacoes">
                <h3 class="nome">${produto.nome}</h3>
                <h3 class="preco">R$ ${produto.preco}</h3>
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



function listeners() {
  const diminuir = document.querySelectorAll(".diminuir_quantidade");
  const aumentar = document.querySelectorAll(".aumentar_quantidade");

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



fetch('https://raw.githubusercontent.com/PaoDaSerra/paodaserra/main/info.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro de requisição: ${response.status}`);
    }

    return response.json();
  })
  .then(data => {
    listarPoes(data.produtos);
  })
  .catch(error => {
    console.error('Erro na requisição:', error);
  });



document.addEventListener("DOMContentLoaded", function () {
  var scrollButton = document.getElementById("verProdutos");
  var targetSection = document.getElementById("nossosProdutos");

  scrollButton.addEventListener("click", function () {
      targetSection.scrollIntoView({ behavior: "smooth" });
  });
});
