/* =========================================================
   DHANASRI FINVISORY
   INTERACTION ENGINE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     CURSOR
  ======================================================= */

  const cursor =
    document.querySelector(".cursor");

  const ring =
    document.querySelector(".cursor-ring");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let ringX = mouseX;
  let ringY = mouseY;


  window.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    if (cursor) {

      cursor.style.left =
        `${mouseX}px`;

      cursor.style.top =
        `${mouseY}px`;

    }

  });


  function animateCursor() {

    ringX +=
      (mouseX - ringX) * 0.13;

    ringY +=
      (mouseY - ringY) * 0.13;

    if (ring) {

      ring.style.left =
        `${ringX}px`;

      ring.style.top =
        `${ringY}px`;

    }

    requestAnimationFrame(
      animateCursor
    );

  }

  animateCursor();


  /* =======================================================
     CURSOR HOVER
  ======================================================= */

  const interactiveElements =
    document.querySelectorAll(
      "a, button, .service-item, .sector-row"
    );


  interactiveElements.forEach((element) => {

    element.addEventListener(
      "mouseenter",
      () => {

        ring?.classList.add("hover");

      }
    );


    element.addEventListener(
      "mouseleave",
      () => {

        ring?.classList.remove("hover");

      }
    );

  });


  /* =======================================================
     MAGNETIC ELEMENTS
  ======================================================= */

  const magneticElements =
    document.querySelectorAll(
      ".magnetic"
    );


  magneticElements.forEach((element) => {

    element.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          element.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left -
          rect.width / 2;

        const y =
          event.clientY -
          rect.top -
          rect.height / 2;

        element.style.transform =
          `translate(
            ${x * 0.15}px,
            ${y * 0.15}px
          )`;

      }
    );


    element.addEventListener(
      "mouseleave",
      () => {

        element.style.transform = "";

      }
    );

  });


  /* =======================================================
     PAGE PROGRESS
  ======================================================= */

  const progress =
    document.querySelector(
      ".progress-bar"
    );


  function updateProgress() {

    const scrollTop =
      window.scrollY;

    const documentHeight =
      document.documentElement
        .scrollHeight;

    const viewportHeight =
      window.innerHeight;

    const scrollable =
      documentHeight -
      viewportHeight;

    const percentage =
      scrollable > 0
        ? (scrollTop / scrollable) * 100
        : 0;


    if (progress) {

      progress.style.width =
        `${percentage}%`;

    }

  }


  window.addEventListener(
    "scroll",
    updateProgress,
    { passive: true }
  );


  /* =======================================================
     REVEAL
  ======================================================= */

  const reveals =
    document.querySelectorAll(
      ".reveal"
    );


  const revealObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              entry.target
                .classList
                .add("visible");

            }

          }
        );

      },
      {
        threshold: 0.15
      }
    );


  reveals.forEach(
    (element) => {

      revealObserver.observe(
        element
      );

    }
  );


  /* =======================================================
     STATEMENT MOTION
  ======================================================= */

  const statement =
    document.querySelector(
      ".statement"
    );

  const wordOne =
    document.querySelector(
      ".word-one"
    );

  const wordTwo =
    document.querySelector(
      ".word-two"
    );


  function statementMotion() {

    if (!statement) return;


    const rect =
      statement.getBoundingClientRect();


    const viewport =
      window.innerHeight;


    const progress =
      (viewport - rect.top) /
      (viewport + rect.height);


    const clamped =
      Math.max(
        0,
        Math.min(1, progress)
      );


    if (wordOne) {

      wordOne.style.transform =
        `translateX(
          ${clamped * -100}px
        )`;

    }


    if (wordTwo) {

      wordTwo.style.transform =
        `translateX(
          ${clamped * 120}px
        )`;

    }

  }


  window.addEventListener(
    "scroll",
    statementMotion,
    { passive: true }
  );


  /* =======================================================
     HERO PARALLAX
  ======================================================= */

  const hero =
    document.querySelector(
      ".hero"
    );

  const heroImage =
    document.querySelector(
      ".hero-image img"
    );


  function heroParallax() {

    if (!hero || !heroImage)
      return;


    const rect =
      hero.getBoundingClientRect();


    const amount =
      Math.max(
        -60,
        Math.min(
          60,
          rect.top * -0.08
        )
      );


    heroImage.style.transform =
      `scale(1.03)
       translateY(${amount}px)`;

  }


  window.addEventListener(
    "scroll",
    heroParallax,
    { passive: true }
  );


  /* =======================================================
     SERVICE INTERACTION
  ======================================================= */

  const serviceItems =
    document.querySelectorAll(
      ".service-item"
    );

  const serviceImage =
    document.querySelector(
      "#serviceVisual"
    );

  const serviceNumber =
    document.querySelector(
      ".service-image-number"
    );


  function activateService(item) {

    serviceItems.forEach(
      (service) => {

        service.classList
          .remove("active");

      }
    );


    item.classList.add("active");


    const newImage =
      item.dataset.image;

    const newNumber =
      item.dataset.number;


    if (serviceImage) {

      serviceImage.style.opacity =
        "0";

      serviceImage.style.transform =
        "scale(1.05)";


      setTimeout(() => {

        serviceImage.src =
          newImage;


        serviceImage.onload = () => {

          serviceImage.style.opacity =
            "1";

          serviceImage.style.transform =
            "scale(1)";

        };

      }, 250);

    }


    if (serviceNumber) {

      serviceNumber.textContent =
        newNumber;

    }

  }


  serviceItems.forEach(
    (item) => {


      item.addEventListener(
        "mouseenter",
        () => {

          activateService(item);

        }
      );


      item.addEventListener(
        "click",
        () => {

          activateService(item);

        }
      );

    }
  );


  /* =======================================================
     SECTOR INTERACTION
  ======================================================= */

  const sectorRows =
    document.querySelectorAll(
      ".sector-row"
    );

  const sectorFloat =
    document.querySelector(
      ".sector-float strong"
    );


  sectorRows.forEach(
    (row) => {

      row.addEventListener(
        "mouseenter",
        () => {

          const number =
            row.dataset.sector;


          if (sectorFloat) {

            sectorFloat.textContent =
              number;

          }

        }
      );

    }
  );


  /* =======================================================
     SUBTLE SECTOR PARALLAX
  ======================================================= */

  window.addEventListener(
    "scroll",
    () => {

      const viewportCenter =
        window.innerHeight / 2;


      sectorRows.forEach(
        (row) => {

          const rect =
            row.getBoundingClientRect();


          const rowCenter =
            rect.top +
            rect.height / 2;


          const distance =
            rowCenter -
            viewportCenter;


          const normalized =
            Math.max(
              -1,
              Math.min(
                1,
                distance /
                window.innerHeight
              )
            );


          const movement =
            normalized * 4;


          row.style.transform =
            `translateX(
              ${movement}px
            )`;

        }
      );

    },
    { passive: true }
  );


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const menuToggle =
    document.querySelector(
      ".menu-toggle"
    );

  const mobileMenu =
    document.querySelector(
      ".mobile-menu"
    );


  menuToggle?.addEventListener(
    "click",
    () => {

      mobileMenu.classList.toggle(
        "open"
      );

    }
  );


  const mobileLinks =
    document.querySelectorAll(
      ".mobile-menu a"
    );


  mobileLinks.forEach(
    (link) => {

      link.addEventListener(
        "click",
        () => {

          mobileMenu.classList
            .remove("open");

        }
      );

    }
  );


  /* =======================================================
     ACTIVE NAV
  ======================================================= */

  const sections = [

    document.querySelector(
      "#about"
    ),

    document.querySelector(
      "#services"
    ),

    document.querySelector(
      "#sectors"
    ),

    document.querySelector(
      "#team"
    ),

    document.querySelector(
      "#contact"
    )

  ];


  const navLinks =
    document.querySelectorAll(
      ".main-nav a"
    );


  const navObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              !entry.isIntersecting
            ) return;


            const id =
              entry.target
                .getAttribute(
                  "id"
                );


            navLinks.forEach(
              (link) => {

                link.classList
                  .remove("active");


                if (
                  link.getAttribute(
                    "href"
                  ) === `#${id}`
                ) {

                  link.classList
                    .add("active");

                }

              }
            );

          }
        );

      },
      {
        threshold: 0.4
      }
    );


  sections.forEach(
    (section) => {

      if (section) {

        navObserver.observe(
          section
        );

      }

    }
  );


  /* =======================================================
     INITIALIZE
  ======================================================= */

  updateProgress();

  statementMotion();

  heroParallax();

});