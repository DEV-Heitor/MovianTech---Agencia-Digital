// ========================================
// MovianTech - JavaScript
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  // Initialize Lucide icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // ========================================
  // Header Scroll Effect
  // ========================================
  const header = document.getElementById("header");

  function handleHeaderScroll() {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleHeaderScroll);
  handleHeaderScroll(); // Check on load

  // ========================================
  // Mobile Menu Toggle
  // ========================================
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  menuToggle.addEventListener("click", function () {
    menuToggle.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  const mobileNavLinks = document.querySelectorAll(
    ".mobile-nav-link, .mobile-menu .btn"
  );
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", function () {
      menuToggle.classList.remove("active");
      mobileMenu.classList.remove("active");
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
      menuToggle.classList.remove("active");
      mobileMenu.classList.remove("active");
    }
  });

  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();

        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ========================================
  // Scroll Animations (Intersection Observer)
  // ========================================
  const animatedElements = document.querySelectorAll(
    ".feature-card, .process-step, .service-card, .plan-card, .seo-card, .contact-card, .about-content, .seo-content"
  );

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add delay based on index for staggered animation
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => {
    el.classList.add("animate-on-scroll");
    observer.observe(el);
  });

  // ========================================
  // Active Navigation Link Highlight
  // ========================================
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function highlightNavLink() {
    const scrollPosition = window.scrollY + header.offsetHeight + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNavLink);

  // ========================================
  // Button Ripple Effect
  // ========================================
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement("span");
      ripple.style.cssText = `
        position: absolute;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        width: 100px;
        height: 100px;
        left: ${x - 50}px;
        top: ${y - 50}px;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
      `;

      button.style.position = "relative";
      button.style.overflow = "hidden";
      button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add ripple animation keyframes
  const style = document.createElement("style");
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // ========================================
  // Parallax Effect for Hero Blobs
  // ========================================
  const heroBlobs = document.querySelectorAll(".hero-blob");

  window.addEventListener("scroll", function () {
    const scrolled = window.scrollY;

    heroBlobs.forEach((blob, index) => {
      const speed = 0.3 + index * 0.1;
      blob.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // ========================================
  // Counter Animation for Prices (Optional Enhancement)
  // ========================================
  function animateCounter(element, target, duration = 1000) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * easeOut);

      element.textContent = current.toLocaleString("pt-BR");

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // Animate prices when they come into view
  const priceElements = document.querySelectorAll(".plan-price .amount");
  const priceObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.textContent.replace(/\D/g, ""));
          animateCounter(entry.target, target, 1500);
          priceObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  priceElements.forEach((el) => priceObserver.observe(el));

  // ========================================
  // Keyboard Navigation
  // ========================================
  document.addEventListener("keydown", function (e) {
    // Close mobile menu with Escape
    if (e.key === "Escape") {
      menuToggle.classList.remove("active");
      mobileMenu.classList.remove("active");
    }
  });

  // ========================================
  // Preload Critical Images (if any)
  // ========================================
  function preloadImage(src) {
    const img = new Image();
    img.src = src;
  }

  // ========================================
  // Performance: Debounce scroll events
  // ========================================
  function debounce(func, wait = 10) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // Apply debounce to scroll-heavy functions
  window.addEventListener("scroll", debounce(handleHeaderScroll, 10));
  window.addEventListener("scroll", debounce(highlightNavLink, 50));

  console.log("MovianTech website initialized successfully! 🚀");
});
