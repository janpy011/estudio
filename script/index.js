// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling para os links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Menu mobile toggle
    const menuToggle = document.querySelector('.header__menu-toggle');
    const navMenu = document.querySelector('.header__nav ul');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('is-open');
            menuToggle.classList.toggle('is-active');
        });

        // Fechar menu ao clicar em um item (no mobile)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) { // Ajuste para o breakpoint md
                    navMenu.classList.remove('is-open');
                    menuToggle.classList.remove('is-active');
                }
            });
        });
    }

    // Simulação de Carrossel de Depoimentos (básico, pode ser melhorado com bibliotecas como Swiper.js ou Slick Carousel)
    const testimonialsCarousel = document.querySelector('.testimonials__carousel');
    if (testimonialsCarousel) {
        let currentIndex = 0;
        const testimonialCards = testimonialsCarousel.querySelectorAll('.testimonial-card');
        const totalCards = testimonialCards.length;

        // Função para rolar o carrossel
        const scrollCarousel = () => {
            const cardWidth = testimonialCards[0].offsetWidth + (parseFloat(getComputedStyle(testimonialCards[0]).marginLeft) * 2); // Largura do card + margem
            testimonialsCarousel.scrollLeft = currentIndex * cardWidth;
        };

        // Você pode adicionar botões de navegação ou autoplay aqui
        // Exemplo de autoplay (remova se for usar botões):
        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalCards;
            scrollCarousel();
        }, 5000); // Rola a cada 5 segundos

        // Ajustar scroll ao redimensionar (para responsividade)
        window.addEventListener('resize', scrollCarousel);
    }

    // Animações com Intersection Observer (opcional, mas adiciona muito!)
    // Exemplo: fade-in de seções quando aparecem na tela
    const sections = document.querySelectorAll('section');
    const options = {
        root: null, // viewport
        threshold: 0.2, // 20% da seção visível
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in'); // Adicione uma classe para animar
                observer.unobserve(entry.target); // Para animar apenas uma vez
            }
        });
    }, options);

    sections.forEach(section => {
        section.classList.add('section-hidden'); // Classe inicial para esconder/preparar animação
        observer.observe(section);
    });

    // Adicione estas classes no seu SCSS para a animação:
    // .section-hidden {
    //     opacity: 0;
    //     transform: translateY(20px);
    //     transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    // }
    // .section-hidden.fade-in {
    //     opacity: 1;
    //     transform: translateY(0);
    // }
});