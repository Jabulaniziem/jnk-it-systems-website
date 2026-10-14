
      // Header shadow on scroll + Back to top visibility
      const sectionLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));
      const linkedSections = sectionLinks
        .map((link) => ({ link, section: document.querySelector(link.getAttribute("href")) }))
        .filter((item) => item.section)
        .sort((a, b) =>
          a.section.compareDocumentPosition(b.section) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
        );

      function updateActiveNav() {
        const header = document.getElementById("header");
        const activationLine = (header?.offsetHeight || 0) + 36;
        let current = linkedSections[0];

        for (const item of linkedSections) {
          if (item.section.getBoundingClientRect().top <= activationLine) {
            current = item;
          } else {
            break;
          }
        }

        sectionLinks.forEach((link) => {
          const isActive = link === current?.link;
          link.classList.toggle("active", isActive);
          if (isActive) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });

        document.querySelectorAll("nav .nav-dropdown").forEach((dropdown) => {
          dropdown.classList.toggle("active", Boolean(dropdown.querySelector("a.active")));
        });
      }

      sectionLinks.forEach((link) => {
        link.addEventListener("click", () => {
          document.querySelectorAll("nav .nav-dropdown[open]").forEach((dropdown) => {
            dropdown.removeAttribute("open");
          });
        });
      });

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

        updateActiveNav();
      });

      window.addEventListener("resize", updateActiveNav);
      updateActiveNav();

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

      // Business consultation enquiries are prepared for WhatsApp review.
      const businessConsultationForm = document.getElementById("businessConsultationForm");
      if (businessConsultationForm) {
        businessConsultationForm.addEventListener("submit", function (event) {
          event.preventDefault();
          const getValue = (id) => document.getElementById(id)?.value.trim() || "Not provided";
          const lines = [
            "Hello JNK IT Systems! I would like a business consultation.",
            "",
            `*Name:* ${getValue("consultName")}`,
            `*Business name:* ${getValue("consultBusiness")}`,
            `*Email:* ${getValue("consultEmail")}`,
            `*Phone:* ${getValue("consultPhone")}`,
            `*Business stage:* ${getValue("consultStage")}`,
            `*Service/package:* ${getValue("consultService")}`,
            `*Details:* ${getValue("consultDetails")}`
          ];
          const url = `https://wa.me/27651286003?text=${encodeURIComponent(lines.join("\n"))}`;
          window.open(url, "_blank", "noopener,noreferrer");
        });
      }

      // Package buttons preselect the matching enquiry option and focus the form.
      document.querySelectorAll(".package-select").forEach((button) => {
        button.addEventListener("click", function () {
          const serviceSelect = document.getElementById("consultService");
          const packageName = this.dataset.package;
          if (serviceSelect) {
            const option = Array.from(serviceSelect.options).find(
              (item) => item.text.trim() === packageName
            );
            if (option) serviceSelect.value = option.value;
          }
          document.getElementById("business-consultation")?.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
          window.setTimeout(() => {
            document.getElementById("consultName")?.focus({ preventScroll: true });
          }, 450);
        });
      });

