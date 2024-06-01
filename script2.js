// Função para configurar o carrossel
function setupCarousel(carouselContainer) {
    const track = carouselContainer.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const slideWidth = slides[0].getBoundingClientRect().width;
    const prevButton = carouselContainer.querySelector('.prev-button');
    const nextButton = carouselContainer.querySelector('.next-button');
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    let currentIndex = 0;

    // Arrange the slides next to one another
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

    // Evitar o comportamento padrão de arrastar do navegador
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

// Inicializar todos os carrosséis na página
document.querySelectorAll('.carousel').forEach(setupCarousel);

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  
}
