// function rolarParaSecao2() {
//     document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
// }




function listarPoes(produtos) {
    const gradeProdutos = document.querySelector("#produtos");

    
    produtos.forEach(produto => {
        const novoProduto = document.createElement("div");
        novoProduto.classList.add("produto");
    
        novoProduto.innerHTML = `
            <img src="" alt="">
    
            <div class="informacoes">
                <h3>${produto.nome}</h3>
                <h3>${produto.preco}</h3>
            </div>
    
            <div>
                <div></div>
                <button type="button">Comprar</button>
            </div>
        `;
    
        gradeProdutos.appendChild(novoProduto);
    });
}





fetch('https://raw.githubusercontent.com/PaoDaSerra/paodaserra/main/info.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro de requisição: ${response.status}`);
    }

    return response.json();
  })
  .then(data => {
    console.log(data.produtos[1].nome);
    listarPoes(data.produtos);
  })
  .catch(error => {
    console.error('Erro na requisição:', error);
  });

