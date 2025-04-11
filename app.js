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

document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".categoryBtns > div");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterButtons.forEach((el) => {
        const p = el.querySelector("p");
        const img = el.querySelector("img");

        p.style.color = "#1111117A"; // noactive color
        img.src = "./imgs/chechnoact.svg";
      });

      const p = this.querySelector("p");
      const img = this.querySelector("img");

      p.style.color = "#6C5FBC"; // active color
      img.src = "./imgs/checkact.svg";
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".yearsBtns");
  const children = Array.from(container.children);
  const yearItems = children.filter((el) => el.tagName === "DIV");
  const leftBtn = children[0];
  const rightBtn = children[children.length - 1];

  const years = [
    "2025",
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
  ];

  // Ikki alohida o'zgaruvchi: ko'rsatilayotgan yillar va aktiv yil
  let displayStartIndex = 0;
  let activeYearIndex = 0;

  const updateDisplay = () => {
    // Faqat 6 ta yil ko'rsatamiz
    const displayedYears = years.slice(
      displayStartIndex,
      displayStartIndex + 6
    );

    // Agar oxirgi yillarga yetib borsak, to'ldiramiz
    if (displayedYears.length < 6) {
      const needed = 6 - displayedYears.length;
      displayedYears.unshift(
        ...years.slice(displayStartIndex - needed, displayStartIndex)
      );
    }

    // HTML elementlarini yangilaymiz
    yearItems.forEach((item, idx) => {
      if (idx < displayedYears.length) {
        const p = item.querySelector("p");
        const img = item.querySelector("img");

        p.textContent = displayedYears[idx];
        p.style.color =
          years.indexOf(displayedYears[idx]) === activeYearIndex
            ? "#6C5FBC"
            : "#1111117A";
        img.src =
          years.indexOf(displayedYears[idx]) === activeYearIndex
            ? "./imgs/checkact.svg"
            : "./imgs/chechnoact.svg";
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  };

  // Tugmalar ishlashi - faqat ko'rinadigan yillarni o'zgartiradi
  leftBtn.addEventListener("click", () => {
    if (displayStartIndex > 0) {
      displayStartIndex--;
      updateDisplay();
    }
  });

  rightBtn.addEventListener("click", () => {
    if (displayStartIndex < years.length - 6) {
      displayStartIndex++;
      updateDisplay();
    } else if (years.length - displayStartIndex > 6) {
      displayStartIndex = years.length - 6;
      updateDisplay();
    }
  });

  // Yil elementlariga bosish - faqat aktiv yilni o'zgartiradi
  yearItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      const clickedYear = item.querySelector("p").textContent;
      activeYearIndex = years.indexOf(clickedYear);
      updateDisplay();
    });
  });

  // Dastlabki holatni o'rnatish
  updateDisplay();
});

const blogTrack = document.getElementById("blog-carousel-track");
const blogDots = document.querySelectorAll(".blog-dot");
const blogPrev = document.getElementById("blog-prev-btn");
const blogNext = document.getElementById("blog-next-btn");

let blogIndex = 0;
const blogTotal = blogDots.length;

function updateCarousel1() {
  blogTrack.style.transform = `translateX(-${blogIndex * 100}%)`;
  blogDots.forEach((dot, i) => {
    dot.classList.toggle("opacity-100", i === blogIndex);
    dot.classList.toggle("opacity-50", i !== blogIndex);
  });
}

blogPrev.addEventListener("click", () => {
  blogIndex = (blogIndex - 1 + blogTotal) % blogTotal;
  updateCarousel1();
});

blogNext.addEventListener("click", () => {
  blogIndex = (blogIndex + 1) % blogTotal;
  updateCarousel1();
});

blogDots.forEach((dot, idx) => {
  dot.addEventListener("click", () => {
    blogIndex = idx;
    updateCarousel1();
  });
});

updateCarousel1(); // Initial
