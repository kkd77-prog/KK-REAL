// let slideIndex = 0;
// let slides = document.querySelectorAll(".slide");
// let dots = document.querySelectorAll(".dot");
// showSlides();

// console.log(slides.length)
// function showSlides() {
// if (slides.length === 0){
//     console.error("No slides found");
//     return;
// }


//     slides.forEach(slide => slide.style.display = "none");

//     slideIndex++;
//     if (slideIndex > slides.length) {
//         slideIndex = 1;
//     }
//     slides[slideIndex - 1].style.display = "block";

//     dots.forEach(dot => dot.classList.remove("active"));
//     if (dots.length >= slideIndex){
//         dots[slideIndex - 1].classList.add("active");
//     }

    
//     console.log("showing slide:", slideIndex);

//     setTimeout(showSlides, 3000);
// }
// function changeSlide(n) {
//     slideIndex += n - 1;
//     if(slideIndex < 1) slideIndex = slides.length;
//     if(slideIndex>slides.length) slideIndex =1;
//     showSlides();
// }

// function currentSlide(n) {
//     slideIndex = n - 1;
//     showSlides();
// }


let slideIndex = 0;
let slideTimer;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

// Function to update slide and dot classes
function updateSlides() {
    slides.forEach((slide, index) => {
        slide.classList.toggle("active", index === slideIndex);
    });
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === slideIndex);
    });
}

// Auto slide function
function autoSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    updateSlides();
    slideTimer = setTimeout(autoSlide, 3000);
}

// Reset the timer when a manual change occurs
function resetTimer() {
    clearTimeout(slideTimer);
    slideTimer = setTimeout(autoSlide, 3000);
}

// Manual slide change (prev/next buttons)
function changeSlide(n) {
    clearTimeout(slideTimer);
    // n can be negative (prev) or positive (next)
    slideIndex = (slideIndex + n + slides.length) % slides.length;
    updateSlides();
    resetTimer();
}

// Direct slide jump (dot navigation)
function currentSlide(n) {
    clearTimeout(slideTimer);
    slideIndex = n;
    updateSlides();
    resetTimer();
}

// Start the auto slideshow after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    updateSlides(); // ensure the initial slide is set
    slideTimer = setTimeout(autoSlide, 3000);
});




document.getElementById("search-btn").addEventListener("click", () => {
    const query = document.getElementById("search-input").value.trim();
    if (query) {
        alert(`Searching for properties in ${query}...`);

    } else {
        alert("Please enter a location to search.");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const carousels = document.querySelectorAll(".carousel");

    carousels.forEach((carousel) => {
        const images = carousel.querySelectorAll(".carousel-images img");
        const prevBtn = carousel.querySelector(".prev");
        const nextBtn = carousel.querySelector(".next");
        let currentIndex = 0;


        function updateCarousel() {
            images.forEach((img, index) => {
                img.classList.toggle("active", index === currentIndex);
            })
        }


        if (prevBtn && nextBtn) {
            prevBtn.addEventListener("click", () => {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                updateCarousel();
            });
            nextBtn.addEventListener("click", () => {
                currentIndex = (currentIndex + 1) % images.length;
                updateCarousel();
            });
        }


        let startX = 0;
        let endX = 0;


        carousel.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
        });

        carousel.addEventListener("touchmove", (e) => {
            e.preventDefault();
        }, { passive: false });

        carousel.addEventListener("touchend", (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = endX - startX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff < 0) {

                    currentIndex = (currentIndex + 1) % images.length;
                } else {

                    currentIndex = (currentIndex - 1 + images.length) % images.length;
                }
                updateCarousel();
            }
        }
        updateCarousel();
    });
});
