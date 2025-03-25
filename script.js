/* úprava animace kolečka */
document.addEventListener("DOMContentLoaded", () => {
  const circle = document.querySelector(".circle");
  if (circle) {
    circle.style.animation = "rotateCircle 2s linear infinite";
    window.addEventListener("scroll", () => {
      circle.style.animation = "rotateCircle 2s linear infinite";
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(() => {
        circle.style.animation = "none";
        circle.style.transform = "translateY(0.1em) rotate(0deg)";
      }, 1000);
    });
  }
  /* myš */
  const cursor = document.querySelector(".cursor");
  if (cursor) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;
    });
    const interactiveElements = document.querySelectorAll("a, button, input");

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("hovered");
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("hovered");
      });
    });
  }
  /* dovednosti */
  const dovednostiSekce = document.querySelector(".dovednosti");
  if (dovednostiSekce) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            dovednostiSekce.classList.add("active");
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(dovednostiSekce);
  }
  /* prace */

  const images = document.querySelectorAll(".carousel-image");
  const title = document.getElementById("carousel-title");
  const description = document.getElementById("carousel-description");
  const titles = ["Sitemap", "Emphaty map", "Návrh etikety"];
  const descriptions = [
    "Sitemap je důležitou součástí procesu tvorby webu. Pomáhá nám ujasnit si potřebnou logickou strukturu a obsah webu.",
    "Mapa empatie pomáhá vcítit se do uživatelů a získat neočekávané poznatky o potřebách uživatelů. ",
    "Soutěžní návrh etikety pro 130. výročí slivovice značky R.Jelínek.",
  ];
  let currentIndex = 0;

  function updateCarousel(index) {
    images.forEach((img) => img.classList.remove("active"));
    images[index].classList.add("active");
    if (title && description) {
      title.textContent = titles[index];
      description.textContent = descriptions[index];
    }
  }
  const leftArrow = document.querySelector(".carousel-arrow.left");
  const rightArrow = document.querySelector(".carousel-arrow.right");
  if (leftArrow && rightArrow) {
    leftArrow.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateCarousel(currentIndex);
    });
    rightArrow.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateCarousel(currentIndex);
    });
  }

  // Reakce na pohyb myši
  const carouselCircle = document.querySelector(".carousel-circle");
  if (carouselCircle) {
    carouselCircle.addEventListener("mousemove", (e) => {
      const x = (e.offsetX / e.target.clientWidth - 0.5) * 10;
      const y = (e.offsetY / e.target.clientHeight - 0.5) * 10;
      e.currentTarget.style.transform = `rotateX(${y}deg) rotateY(${-x}deg)`;
    });

    carouselCircle.addEventListener("mouseleave", (e) => {
      e.currentTarget.style.transform = "rotateX(0) rotateY(0)";
    });
  }

  // formular
  const tlacitkoAhoj = document.getElementById("tlacitko-ahoj");
  const sekceFormular = document.getElementById("formular");
  const zavriBtn = document.getElementById("zavrit-formular");

  tlacitkoAhoj.addEventListener("click", function () {
    sekceFormular.classList.add("aktivni");
    document.body.classList.add("no-scroll");
  });

  zavriBtn.addEventListener("click", function () {
    sekceFormular.classList.remove("aktivni");
    document.body.classList.remove("no-scroll");
  });

  const odeslatBtn = document.querySelector(".tlacitko-odeslat");
  const formular = document.getElementById("kontakt-formular");
  odeslatBtn.addEventListener("click", () => {
    formular.requestSubmit();
  });
  // otevreni formulare
  tlacitkoAhoj.addEventListener("click", function () {
    sekceFormular.classList.add("aktivni");
    sekceFormular.style.display = "flex";

    document.body.classList.add("no-scroll");
  });

  // zavreni formulare
  zavriBtn.addEventListener("click", function () {
    sekceFormular.classList.remove("aktivni");
    sekceFormular.style.display = "none";

    document.body.classList.remove("no-scroll");
  });
});
