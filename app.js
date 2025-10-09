/* app.js — Cleaned & consolidated
   Requirements: jQuery, OwlCarousel, Typed.js (Typed optional but will be used if present)
   Load order in HTML: jQuery -> owl.carousel.min.js -> typed.min.js -> app.js
*/
(function (window, document, $) {
  "use strict";

  // small helper to guard use of optional libs
  function exists(obj) { return typeof obj !== "undefined" && obj !== null; }

  // Run after DOM ready
  $(function () {
    // ---------- Debounced scroll handler using requestAnimationFrame ----------
    (function () {
      var lastKnownScrollY = window.scrollY || window.pageYOffset;
      var ticking = false;

      function handleScroll(scrollY) {
        if (scrollY > 24) $(".navbar").addClass("sticky");
        else $(".navbar").removeClass("sticky");

        if (scrollY > 520) $(".scroll-up-btn").addClass("show");
        else $(".scroll-up-btn").removeClass("show");
      }

      function onScroll() {
        lastKnownScrollY = window.scrollY || window.pageYOffset;
        if (!ticking) {
          window.requestAnimationFrame(function () {
            handleScroll(lastKnownScrollY);
            ticking = false;
          });
          ticking = true;
        }
      }

      // attach listener
      window.addEventListener("scroll", onScroll, { passive: true });

      // set initial state
      handleScroll(lastKnownScrollY);
    })();

    // ---------- Smooth scroll-up ----------
    $(".scroll-up-btn").off("click").on("click", function (e) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, 600, "swing");
    });

    // ---------- Menu link smooth behavior (when clicked) ----------
    $(".navbar .menu li a").on("click", function () {
      $("html").css("scrollBehavior", "smooth");
      // close mobile menu if open
      $(".navbar .menu").removeClass("active");
      $(".menu-btn i").removeClass("active");
    });

    // ---------- Mobile menu toggle ----------
    $(".menu-btn").off("click").on("click", function () {
      $(".navbar .menu").toggleClass("active");
      $(".menu-btn i").toggleClass("active");
    });

    // ---------- Typed.js (if available) ----------
    if (exists(window.Typed)) {
      try {
        new Typed(".typing", {
          strings: [
            "Business &amp; Information Analyst",
            "Data-Driven Innovator",
            "AI-Focused Researcher",
          ],
          typeSpeed: 60,
          backSpeed: 40,
          backDelay: 1200,
          smartBackspace: true,
          loop: true,
          showCursor: false,
        });

        // keep second instance in case you use it elsewhere
        new Typed(".typing-2", {
          strings: [
            "Business &amp; Information Analyst",
            "Data-Driven Innovator",
            "AI-Focused Researcher",
          ],
          typeSpeed: 60,
          backSpeed: 35,
          backDelay: 1000,
          smartBackspace: true,
          loop: true,
          showCursor: false,
        });
      } catch (err) {
        /* typed initialization failed — ignore but log for debugging */
        // console.warn("Typed.js init error:", err);
      }
    }

    // ---------- Owl carousel initialization (projects + services) ----------
    // Guard: make sure plugin exists before calling
    if ($.fn && $.fn.owlCarousel) {
      // Projects carousel (selector: .carousel)
      try {
        $(".carousel").owlCarousel({
          margin: 24,
          loop: true,
          autoplay: true,
          autoplayTimeout: 4500,
          autoplayHoverPause: true,
          smartSpeed: 700,
          nav: true,
          navText: ["<", ">"],
          dots: true,
          responsive: {
            0: { items: 1, nav: false },
            600: { items: 1, nav: false },
            900: { items: 1, nav: true },
            1200: { items: 1, nav: true },
          },
        });
      } catch (err) {
        // console.warn("Projects carousel init failed", err);
      }

      // Services carousel (selector: .services-carousel)
      try {
        $(".services-carousel").owlCarousel({
          items: 1, // one card at a time
          loop: true,
          margin: 20,
          autoplay: true,
          autoplayTimeout: 4000,
          autoplayHoverPause: true,
          smartSpeed: 700,
          nav: true,
          dots: true,
          navText: [
            '<span aria-hidden="true">&larr;</span>',
            '<span aria-hidden="true">&rarr;</span>',
          ],
          responsive: {
            0: { items: 1, nav: false },
            600: { items: 1, nav: false },
            900: { items: 1, nav: true },
            1200: { items: 1, nav: true },
          },
        });
      } catch (err) {
        // console.warn("Services carousel init failed", err);
      }
    } else {
      // If Owl not loaded, remove nav/dots placeholders so the page doesn't show broken controls
      // console.warn("OwlCarousel plugin not found; carousels will not initialize.");
    }

    // ---------- Fade-in on scroll using IntersectionObserver ----------
    (function () {
      // add fade-in class to relevant elements
      document.querySelectorAll("section, .card").forEach(function (el) {
        if (!el.classList.contains("fade-in")) el.classList.add("fade-in");
      });

      // setup observer
      var ioOptions = { threshold: 0.12 };
      var observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      }, ioOptions);

      document.querySelectorAll(".fade-in").forEach(function (el) {
        observer.observe(el);
      });
    })();

    // ---------- Update date/time widget ----------
    (function () {
      function updateDateTime() {
        var currentDate = new Date();
        var day = currentDate.toLocaleString("en-US", { day: "numeric" });
        var month = currentDate.toLocaleString("en-US", { month: "short" });
        var time = currentDate.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: false,
        });
        var formattedDate =
          currentDate.toLocaleString("en-US", { weekday: "short" }) +
          " " +
          day +
          " " +
          month +
          " [" +
          time +
          "]";
        var el = document.getElementById("currentDateTime");
        if (el) el.textContent = formattedDate;
      }
      updateDateTime();
      setInterval(updateDateTime, 1000);
    })();

    // ---------- Accessibility: ensure focus-visible styles set for keyboard nav ----------
    // (This is mainly CSS, but keep tab-focus friendly JS if needed in future)

    // ---------- End of document ready ----------
  }); // end $(function)

  // ---------- Utility functions available globally if needed ----------

  // createConfetti: creates confetti elements in .confetti-container (kept but not auto-run)
  window.createConfetti = function createConfetti() {
    var confettiContainer = document.querySelector(".confetti-container");
    if (!confettiContainer) return;
    var colors = [
      "confetti-blue",
      "confetti-violet",
      "confetti-pink",
      "confetti-white",
      "confetti-gold",
    ];
    for (var i = 0; i < 30; i++) {
      var confetti = document.createElement("div");
      confetti.className = "confetti " + colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.top = Math.random() * 100 + "vh";
      confettiContainer.appendChild(confetti);
      (function (node) {
        node.addEventListener("animationend", function () {
          try {
            node.remove();
          } catch (e) {
            /* ignore removal errors */
          }
        });
      })(confetti);
    }
  };

  // handleSubmit stub (if you wire form submission)
  window.handleSubmit = function handleSubmit(e) {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    // implement submission logic if needed
  };

})(window, document, window.jQuery);
