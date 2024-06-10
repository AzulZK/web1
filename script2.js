document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM totalmente carregado e analisado");

    // Modal
    const modal = document.getElementById('contact-modal');
    const contactButton = document.querySelector('.contato');
    const closeButton = document.querySelector('.close-button');

    if (!modal) {
        console.error("Modal não encontrado!");
    } else {
        console.log("Modal encontrado!");
    }
    if (!contactButton) {
        console.error("Botão de contato não encontrado!");
    } else {
        console.log("Botão de contato encontrado!");
    }
    if (!closeButton) {
        console.error("Botão de fechar não encontrado!");
    } else {
        console.log("Botão de fechar encontrado!");
    }

    // Abre o modal ao clicar em "Entre em Contato"
    if (contactButton) {
        contactButton.addEventListener('click', function() {
            console.log("Botão de contato clicado");
            modal.style.display = 'block';
        });
    }

    // Fecha o modal ao clicar no botão de fechar
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            console.log("Botão de fechar clicado");
            modal.style.display = 'none';
        });
    }

    // Fecha o modal se o usuário clicar fora dele
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            console.log("Clicado fora do modal");
            modal.style.display = 'none';
        }
    });

    // Envia o formulário ao ser submetido
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const status = document.querySelector('.form-status');
            try {
                let response = await fetch(form.action, {
                    method: form.method,
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                if (response.ok) {
                    status.textContent = "Mensagem enviada com sucesso!";
                    form.reset();
                } else {
                    status.textContent = "Ocorreu um problema ao enviar a mensagem.";
                }
            } catch (error) {
                status.textContent = "Ocorreu um problema ao enviar a mensagem.";
            }
        });
    } else {
        console.error("Formulário não encontrado!");
    }

    // Configuração do carrossel
    document.querySelectorAll('.carousel').forEach(setupCarousel);
});

// Função para configurar o carrossel
function setupCarousel(carouselContainer) {
    const track = carouselContainer.querySelector('.carousel-track');
    if (!track) {
        console.error("Carousel track não encontrado!");
        return;
    }

    const slides = Array.from(track.children);
    if (slides.length === 0) {
        console.error("Slides não encontrados!");
        return;
    }

    const slideWidth = slides[0].getBoundingClientRect().width;
    const prevButton = carouselContainer.querySelector('.prev-button');
    const nextButton = carouselContainer.querySelector('.next-button');

    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    let currentIndex = 0;

    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    track.addEventListener('mousedown', startDrag);
    track.addEventListener('touchstart', startDrag);
    track.addEventListener('mouseup', endDrag);
    track.addEventListener('touchend', endDrag);
    track.addEventListener('mouseleave', endDrag);
    track.addEventListener('mousemove', drag);
    track.addEventListener('touchmove', drag);

    track.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });

    function startDrag(event) {
        isDragging = true;
        startPos = getPositionX(event);
        animationID = requestAnimationFrame(animation);
        track.style.cursor = 'grabbing';
    }

    function endDrag() {
        isDragging = false;
        cancelAnimationFrame(animationID);
        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -100 && currentIndex < slides.length - 1) {
            currentIndex += 1;
        }
        if (movedBy > 100 && currentIndex > 0) {
            currentIndex -= 1;
        }

        setPositionByIndex();
        track.style.cursor = 'grab';
    }

    function drag(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            const diff = currentPosition - startPos;
            currentTranslate = prevTranslate + diff;
            setSliderPosition();
        }
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }

    function setSliderPosition() {
        track.style.transform = `translateX(${currentTranslate}px)`;
    }

    function setPositionByIndex() {
        currentTranslate = currentIndex * -slideWidth;
        prevTranslate = currentTranslate;
        setSliderPosition();
    }

    prevButton.addEventListener('click', moveToPrevSlide);
    nextButton.addEventListener('click', moveToNextSlide);

    function moveToPrevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            setPositionByIndex();
        }
    }

    function moveToNextSlide() {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            setPositionByIndex();
        }
    }
}
document.addEventListener("DOMContentLoaded", function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slideshow img');
    
    setInterval(function() {
        slides[currentSlide].style.display = 'none';
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].style.display = 'block';
    }, 1300);
});
