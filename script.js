const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const slideWidth = slides[0].getBoundingClientRect().width;
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
        currentTranslate = prevTranslate + currentPosition - startPos;
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
