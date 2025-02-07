// Seleção de elementos
let prevButton = document.getElementById('prev');
let nextButton = document.getElementById('next');
let container = document.querySelector('.container');
let items = container.querySelectorAll('.list .item');
let indicator = document.querySelector('.indicators');
let dots = indicator.querySelectorAll('ul li');
let list = container.querySelector('.list');

// Variáveis de controle
let active = 0;

// Função para atualizar o slider
function setSlider() {
    // Remove a classe 'active' de todos os itens e dots
    items.forEach(item => item.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Adiciona a classe 'active' ao item e dot ativo
    items[active].classList.add('active');
    dots[active].classList.add('active');

    // Atualiza o número do indicador
    indicator.querySelector('.number').textContent = '0' + (active + 1);
}

// Função para navegar entre os itens
function navigate(direction) {
    list.style.setProperty('--calculation', direction);
    active = (active + direction + items.length) % items.length;
    setSlider();
}

// Eventos de navegação
nextButton.onclick = () => navigate(1);
prevButton.onclick = () => navigate(-1);

// Navegação com teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        navigate(1);
    } else if (e.key === 'ArrowLeft') {
        navigate(-1);
    }
});

// Navegação com toque (swipe)
let touchStartX = 0;
let touchEndX = 0;

list.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

list.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50) {
        navigate(1); // Swipe para a esquerda
    } else if (touchEndX - touchStartX > 50) {
        navigate(-1); // Swipe para a direita
    }
});

// Menu hamburguer
document.getElementById('menu-toggle').addEventListener('click', () => {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
});