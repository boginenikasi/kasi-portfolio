
document.addEventListener("DOMContentLoaded", () => {

  // 1. MOBILE NAVIGATION

  const menuToggle =
    document.getElementById("menuToggle");

  const navLinks =
    document.getElementById("navLinks");

  if (menuToggle && navLinks) {

    function closeMenu() {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
      );
    }

    menuToggle.addEventListener("click", () => {
      const isOpen =
        navLinks.classList.toggle("active");

      menuToggle.classList.toggle(
        "active",
        isOpen
      );

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation menu"
          : "Open navigation menu"
      );
    });

    // Close menu after selecting a link
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    // Close menu with Escape key
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    // Reset menu when switching to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        closeMenu();
      }
    });
  }


  // 2. SCROLL REVEAL ANIMATIONS

  const revealElements =
    document.querySelectorAll(
      ".section-heading, " +
      ".about-container, " +
      ".skill-card, " +
      ".project-card, " +
      ".experience-card, " +
      ".education-card, " +
      ".certification-card, " +
      ".resume-card, " +
      ".contact-card, " +
      ".contact-message"
    );

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (
    "IntersectionObserver" in window &&
    !reduceMotion
  ) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );
            }

          });

        },
        {
          threshold: 0.08,
          rootMargin: "0px 0px 30px 0px"
        }
      );

    revealElements.forEach(element => {

      element.classList.add("reveal");

      revealObserver.observe(element);

    });
  }


  // 3. BACK TO TOP BUTTON

  const backToTop =
    document.getElementById("backToTop");

  if (backToTop) {

    function updateBackToTop() {
      backToTop.classList.toggle(
        "show",
        window.scrollY > 350
      );
    }

    window.addEventListener(
      "scroll",
      updateBackToTop,
      { passive: true }
    );

    updateBackToTop();

    backToTop.addEventListener("click", () => {

      window.scrollTo({
        top: 0,
        behavior: reduceMotion
          ? "instant"
          : "smooth"
      });

    });
  }


  // 4. ACTIVE NAVIGATION LINKS

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );

  const navigationLinks =
    document.querySelectorAll(
      ".nav-links a"
    );

  if ("IntersectionObserver" in window) {

    const sectionObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              const sectionId =
                entry.target.id;

              navigationLinks.forEach(link => {

                const isActive =
                  link.getAttribute("href") ===
                  "#" + sectionId;

                link.classList.toggle(
                  "current",
                  isActive
                );

              });
            }
          });

        },
        {
          rootMargin: "-20% 0px -65% 0px",
          threshold: 0
        }
      );

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }

});
