let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener("resize", (e) => {
    e.preventDefault();

    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

let swiper = new Swiper(".swiper", {
    breakpoints: {
        320: {
            slidesPerView: 3,
            spaceBetween: 8
        },
        576: {
            slidesPerView: 5,
            spaceBetween: 16
        }
    },
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

let circles = document.querySelector("body.circles");
if (circles) {
    let colors = ["#BFD7EA", "#4ECDC4", "#4062BB", "#E0FF4F"];
    for (let i = 0; i < colors.length; i++) {
        let circleDiv = document.createElement("div");
        circleDiv.className = "color-circle";
        circleDiv.style.backgroundColor = colors[i];
        circleDiv.style.top = (10 + 90 * (i / colors.length)) + "%";
        if (i % 2 == 0) {
            circleDiv.style.right = "64px";
        } else {
            circleDiv.style.left = "64px";
        }

        document.body.prepend(circleDiv);
    }
}

let regionPaths = document.querySelectorAll(".ukraine-map-wrapper svg path");
if (regionPaths) {
    let modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay";
    modalOverlay.addEventListener("click", (e) => {
        e.preventDefault();

        document.body.style.overflow = "auto";
        modalOverlay.classList.remove("active");
        modal.classList.remove("active");
    });

    let modal = document.createElement("div");
    modal.className = "modal";

    let modalImage = document.createElement("img");
    modalImage.className = "modal-image";
    let modalTitle = document.createElement("a");
    modalTitle.className = "modal-title";
    let modalText = document.createElement("p");
    modalText.className = "modal-text";
    let modalGoToButton = document.createElement("a");
    modalGoToButton.className = "modal-go-to-button";
    let goToButtonArrow = '<svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.4687 10.7812C10.3437 10.6562 10.25 10.4687 10.25 10.25C10.25 10.0625 10.3437 9.875 10.5 9.75L13.4687 6.75L0.75 6.75C0.34375 6.75 -1.99433e-07 6.4375 -2.18557e-07 6C-2.36315e-07 5.59375 0.34375 5.25 0.75 5.25L13.4687 5.25L10.5 2.28125C10.1875 2 10.1875 1.53125 10.5 1.25C10.7812 0.9375 11.25 0.9375 11.5625 1.25L15.8125 5.5C16.0937 5.78125 16.0937 6.25 15.8125 6.53125L11.5625 10.7812C11.25 11.0937 10.7813 11.0937 10.4687 10.7812Z" fill="#1A191C" /></svg>';

    modal.append(modalImage, modalTitle, modalText, modalGoToButton);

    document.body.append(modalOverlay, modal);

    let regionHint = document.createElement("div");
    regionHint.className = "region-hint";

    regionPaths.forEach(regionPath => {
        regionPath.onmouseover = () => {
            regionHint.innerHTML = regionPath.getAttribute("data-region-title");
            document.body.append(regionHint);

            regionPath.addEventListener("mousemove", (e) => {
                e.preventDefault();

                regionHint.style.top = e.pageY + 1 + "px";
                if (window.innerWidth > 767) {
                    regionHint.style.left = e.pageX - 1 + "px";
                } else {
                    regionHint.style.left = window.innerWidth / 2 + "px";
                }
            }, false);
        }

        regionPath.onmouseout = () => {
            document.body.removeChild(regionHint);
        }

        regionPath.addEventListener("click", (e) => {
            e.preventDefault();

            modalImage.src = regionPath.getAttribute("data-modal-image");
            modalImage.alt = regionPath.getAttribute("data-region-title");

            modalTitle.innerHTML = regionPath.getAttribute("data-region-title");
            modalTitle.href = "regions/" + regionPath.getAttribute("data-region-title").toLowerCase() + ".html";

            modalText.innerHTML = regionPath.getAttribute("data-modal-text");

            modalGoToButton.innerHTML = "Go to " + regionPath.getAttribute("data-region-title") + goToButtonArrow;
            modalGoToButton.href = "regions/" + regionPath.getAttribute("data-region-title").toLowerCase() + ".html";

            document.body.style.overflow = "hidden";
            modalOverlay.classList.add("active");
            modal.classList.add("active");

            document.body.addEventListener("keyup", (e) => {
                if (e.key == "Escape") {
                    document.body.style.overflow = "auto";
                    modalOverlay.classList.remove("active");
                    modal.classList.remove("active");
                }
            }, false);
        });
    });
}

let navLinks = document.querySelectorAll(".header-link");
navLinks.forEach(link => {
    let linkPathname = link.pathname;
    let pathname = window.location.pathname;
    if (linkPathname == pathname) {
        link.classList.add("current");
    } else if (pathname == "/cooking/" || pathname == "/") {
        navLinks[0].classList.add("current");
    } else if (pathname == "/city.html") {
        navLinks[1].classList.add("current");
    }
});

let watchVideoButton = document.querySelector(".watch-video-button");
let mediaImage = document.querySelector(".media-image");
let mediaVideo = document.querySelector(".media-video");
if (watchVideoButton) {
    watchVideoButton.addEventListener("click", (e) => {
        e.preventDefault();

        mediaImage.classList.add("hidden");
        setTimeout(() => {
            mediaImage.style.display = "none";
            mediaVideo.style.display = "block";
            setTimeout(() => {
                mediaVideo.classList.remove("hidden");
            }, 50);
        }, 300);
    });
}