let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener("resize", (e) => {
    e.preventDefault();

    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

let swiper = new Swiper(".swiper", {
    slidesPerView: 5,
    spaceBetween: 16,
    pagination: {
        el: ".cities-slider-pagination",
        bulletClass: "cities-slider-pagination-bullet",
        bulletActiveClass: "cities-slider-pagination-bullet-active",
        clickable: true,
    },
    navigation: {
        nextEl: ".cities-slider-next",
        prevEl: ".cities-slider-previous",
    },
});