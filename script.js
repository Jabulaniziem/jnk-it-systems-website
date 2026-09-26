
      // Header shadow on scroll + Back to top visibility
      window.addEventListener("scroll", function () {
        const header = document.getElementById("header");
        const backToTop = document.getElementById("backToTop");

        if (window.scrollY > 60) {
          header.style.boxShadow = "0 4px 30px rgba(0,0,0,0.4)";
        } else {
          header.style.boxShadow = "0 4px 30px rgba(0,0,0,0.25)";
        }

        if (window.scrollY > 500) {
          backToTop.classList.add("show");
        } else {
          backToTop.classList.remove("show");
        }
      });

      // Phase tabs
      document.querySelectorAll(".phase-tab").forEach((tab) => {
        tab.addEventListener("click", function () {
          document
            .querySelectorAll(".phase-tab")
            .forEach((t) => t.classList.remove("active"));
          document
            .querySelectorAll(".phase-content")
            .forEach((c) => c.classList.remove("active"));
          this.classList.add("active");
          document.getElementById(this.dataset.phase).classList.add("active");
        });
      });

      // FAQ Accordion
      document.querySelectorAll(".faq-question").forEach((question) => {
        question.addEventListener("click", function () {
          const item = this.parentElement;
          const isOpen = item.classList.contains("open");

          // Close all
          document
            .querySelectorAll(".faq-item")
            .forEach((i) => i.classList.remove("open"));

          // Open clicked (if it wasn't already open)
          if (!isOpen) {
            item.classList.add("open");
          }
        });
      });

      // WhatsApp Form Handler
      document
        .getElementById("serviceRequestForm")
        .addEventListener("submit", function (e) {
          e.preventDefault();

          const name = document.getElementById("name").value.trim();
          const email = document.getElementById("email").value.trim();
          const phone = document.getElementById("phone").value.trim();
          const service = document.getElementById("service").value;
          const message = document.getElementById("message").value.trim();

          let whatsappMsg =
            "Hello JNK IT Systems! I would like to request a service.%0A%0A";
          whatsappMsg += `*Name:* ${name || "Not provided"}%0A`;
          whatsappMsg += `*Email:* ${email || "Not provided"}%0A`;
          whatsappMsg += `*Phone:* ${phone || "Not provided"}%0A`;
          whatsappMsg += `*Service:* ${service || "Not selected"}%0A`;
          whatsappMsg += `*Message:* ${message || "No message"}`;

          const phoneNumber = "7651286003";
          const url = `https://wa.me/${phoneNumber}?text=${whatsappMsg}`;
          window.open(url, "_blank");
        });

      // Visual reveal animation for the redesigned sections.
      const revealTargets = document.querySelectorAll(
        "section:not(#home), .trust-bar, .cta-banner, .service-card, .why-card, .process-step, .market-card, .review-card, .faq-item, .tech-chip, .infra-grid"
      );
      revealTargets.forEach((el) => el.classList.add("reveal"));
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.10 });
      revealTargets.forEach((el) => revealObserver.observe(el));

