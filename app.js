const carousel = document.getElementById("carousel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("dots");
const slides = carousel.children;

let currentIndex = 0;

const getVisibleSlides = () => (window.innerWidth < 640 ? 1 : 4);
const totalGroups = Math.ceil(slides.length / getVisibleSlides());

const updateCarousel = () => {
  const slideWidth = slides[0].offsetWidth + 16;
  carousel.style.transform = `translateX(-${
    currentIndex * slideWidth * getVisibleSlides()
  }px)`;
  [...dotsContainer.children].forEach((dot, idx) => {
    dot.classList.toggle("bg-[#6A6BF8]", idx === currentIndex);
    dot.classList.toggle("bg-gray-300", idx !== currentIndex);
  });
};

const createDots = () => {
  dotsContainer.innerHTML = "";
  for (let i = 0; i < totalGroups; i++) {
    const dot = document.createElement("div");
    dot.className =
      "w-3 h-3 rounded-full border border-[#6A6BF8] bg-gray-300 cursor-pointer";
    dot.addEventListener("click", () => {
      currentIndex = i;
      updateCarousel();
    });
    dotsContainer.appendChild(dot);
  }
};

const goToNext = () => {
  currentIndex = (currentIndex + 1) % totalGroups;
  updateCarousel();
};

const goToPrev = () => {
  currentIndex = (currentIndex - 1 + totalGroups) % totalGroups;
  updateCarousel();
};

prevBtn.addEventListener("click", goToPrev);
nextBtn.addEventListener("click", goToNext);

// let autoScrollInterval = setInterval(goToNext, 5000);

window.addEventListener("resize", () => {
  currentIndex = 0;
  createDots();
  updateCarousel();
});

// Initial
createDots();
updateCarousel();

const headers = document.querySelectorAll(".accordion-header");

headers.forEach((header) => {
  header.addEventListener("click", () => {
    const content = header.nextElementSibling;
    const icon = header.querySelector("span:last-child");

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      icon.textContent = "+";
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      icon.textContent = "–";
    }
  });
});
