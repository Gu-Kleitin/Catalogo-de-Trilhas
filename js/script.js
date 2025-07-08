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

    // --- INÍCIO DA LÓGICA DO CARROSSEL ---
    const carouselContainer = document.createElement('div');
    carouselContainer.classList.add('carousel-container');

    const carouselImagesWrapper = document.createElement('div');
    carouselImagesWrapper.classList.add('carousel-images-wrapper'); // Wrapper para as imagens

    // Adiciona todas as imagens da trilha ao carrossel
    trilha.fotos.forEach((fotoUrl, index) => {
        const img = document.createElement('img');
        img.src = fotoUrl;
        img.alt = `Imagem da ${trilha.nome} - ${index + 1}`;
        img.classList.add('carousel-img');
        if (index === 0) { // A primeira imagem é visível por padrão
            img.classList.add('active');
        }
        carouselImagesWrapper.appendChild(img);
    });

    // Botões de navegação
    const prevButton = document.createElement('button');
    prevButton.classList.add('carousel-button', 'prev');
    prevButton.innerHTML = '&#10094;'; // Caractere de seta para a esquerda
    prevButton.setAttribute('aria-label', 'Imagem anterior');

    const nextButton = document.createElement('button');
    nextButton.classList.add('carousel-button', 'next');
    nextButton.innerHTML = '&#10095;'; // Caractere de seta para a direita
    nextButton.setAttribute('aria-label', 'Próxima imagem');

    carouselContainer.appendChild(carouselImagesWrapper);
    carouselContainer.appendChild(prevButton);
    carouselContainer.appendChild(nextButton);

    trilhaCard.appendChild(carouselContainer);
    // --- FIM DA LÓGICA DO CARROSSEL ---

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

  }); // Fim do forEach

  // --- LÓGICA DE CONTROLE DO CARROSSEL (FORA DO forEach) ---
  // Esta função será chamada para cada carrossel individualmente
  function setupCarousel(carouselElement) {
      const images = carouselElement.querySelectorAll('.carousel-img');
      const prevButton = carouselElement.querySelector('.prev');
      const nextButton = carouselElement.querySelector('.next');
      let currentImageIndex = 0;

      // Se não houver imagens ou apenas uma, desabilita os botões
      if (images.length <= 1) {
          prevButton.style.display = 'none';
          nextButton.style.display = 'none';
          return; // Sai da função, não precisa de lógica de navegação
      }

      function showImage(index) {
          images.forEach((img, i) => {
              img.classList.remove('active');
              if (i === index) {
                  img.classList.add('active');
              }
          });
      }

      prevButton.addEventListener('click', () => {
          currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
          showImage(currentImageIndex);
      });

      nextButton.addEventListener('click', () => {
          currentImageIndex = (currentImageIndex + 1) % images.length;
          showImage(currentImageIndex);
      });
  }

  // Inicializa cada carrossel após todos os cards serem criados
  document.querySelectorAll('.carousel-container').forEach(carousel => {
      setupCarousel(carousel);
  });

}); // Fim do DOMContentLoaded
