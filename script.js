function rolarParaSecao2() {
    document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
}


fetch('https://github.com/PaoDaSerra/paodaserra/info.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro de requisição: ${response.status}`);
    }

    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Erro na requisição:', error);
  });
