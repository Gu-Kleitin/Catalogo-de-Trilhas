// Pelo oq eu procurei saber, esse DOMContentLoaded é um nome padrão para evitar um problema, que é o seguinte: o html vai lendo o arquivo, ele lê a tag main (a tag que vai mostrar o conteúdo do site), mas no momento que ela lê a tag script (que carrega a lista e também este documento), o main ainda não foi processado e o html entende que tem que pausar tudo e executar o script imediatamente o que vai dar um 'conflito' e o código não irá funcionar como deve
document.addEventListener('DOMContentLoaded', ()=> {
  //aqui estamos criando uma constante que vai chamar o id que criamos no main
  
  const containerTrilhas = document.getElementById('container-trilhas');
  
  //iremos criar um loop forEach para ler todos os elementos do arquivo trilhas.js: 
  trilhas.forEach(trilha => {
    //vamos criar um elemento section para cada card de trilha:
    const trilhaCard = document.createElement('section');
    trilhaCard.classList.add('trilha-card');
    //Adiciona o ID como um atributo de dado
    trilhaCard.setAttribute('data-id', trilha.id);

    //Criando o elemento da imagem:
    const img = document.createElement('img');
    //tá puxando a primeira foto, mas vou tentar colocar um carrossel
    img.src = trilha.fotos[0];
    // aqui estamos colocando um texto com o nome da trilha
    img.alt = `Imagem da ${trilha.nome}`;
    trilhaCard.appendChild(img);

    //criando uma div pras informações da trilha:
    const trilhaInfo = document.createElement('div');
    trilhaInfo.classList.add('trilha-info');

    //adicionando o nome da trilha:
    const name = document.createElement('h2');
    name.textContent = trilha.nome;
    trilhaInfo.appendChild(name);

    //Adicionando descrição:
    const descricao = document.createElement('p');
    descricao.textContent = trilha.descricao;
    trilhaInfo.appendChild(descricao);

    //Adicionando detalhes como dificuldade, distância e tempo
    const detalhes = document.createElement('div');
    detalhes.classList.add('detalhes');
    detalhes.innerHTML = `
      <span><strong>Localização:</strong> ${trilha.localizacao}</span>
      <span><strong>Forma de Acesso:</strong> ${trilha.acesso}</span>
      <span><strong>Dificuldade:</strong> ${trilha.dificuldade}</span>
      <span><strong>Distância:</strong> ${trilha.distancia}</span>
      <span><strong>Tempo Estimado:</strong> ${trilha.tempoEstimado}</span>
      <span><strong>Pontos Interessantes:</strong> ${trilha.pontosInteresse}</span>
    `;
    trilhaInfo.appendChild(detalhes);

    //Adicionando div de informações ao card da trilha
    trilhaCard.appendChild(trilhaInfo);

    //Adicionando o card da trilha no container main do HTML
    containerTrilhas.appendChild(trilhaCard);

  });

});