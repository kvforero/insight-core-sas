document.addEventListener("DOMContentLoaded", function () {
  // =====================================
  // MENÚ MÓVIL
  // =====================================

  const menuBtn = document.getElementById("menuBtn");
  const menu = document.getElementById("menu");

  if (menuBtn && menu) {
    function closeMenu(returnFocus = false) {
      menu.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Abrir menú");

      if (returnFocus) {
        menuBtn.focus();
      }
    }

    menuBtn.addEventListener("click", function () {
      const isOpen = menu.classList.toggle("open");

      menuBtn.setAttribute("aria-expanded", String(isOpen));

      menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú"
      );
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeMenu();
      });
    });

    // Cerrar con Escape.
    document.addEventListener("keydown", function (event) {
      if (
        event.key === "Escape" &&
        menu.classList.contains("open")
      ) {
        closeMenu(true);
      }
    });

    // Cerrar al pulsar fuera del menú.
    document.addEventListener("click", function (event) {
      const insideMenu = menu.contains(event.target);
      const insideButton = menuBtn.contains(event.target);

      if (!insideMenu && !insideButton) {
        closeMenu();
      }
    });

    // Restablecer el menú al cambiar de tamaño de pantalla.
    const mobile = window.matchMedia("(max-width: 860px)");

    mobile.addEventListener("change", function () {
      closeMenu();
    });
  }

  // =====================================
  // CONTROL DEL FONDO ANIMADO
  // =====================================

  const motionToggle = document.getElementById("motionToggle");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  let pausedByUser = false;

  function updateMotion() {
    const paused = reducedMotion.matches || pausedByUser;

    document.body.classList.toggle("motion-paused", paused);

    if (!motionToggle) {
      return;
    }

    motionToggle.setAttribute("aria-pressed", String(paused));
    motionToggle.disabled = reducedMotion.matches;

    if (reducedMotion.matches) {
      motionToggle.textContent = "Movimiento reducido activado";
    } else if (paused) {
      motionToggle.textContent = "Activar animación";
    } else {
      motionToggle.textContent = "Pausar animación";
    }
  }

  if (motionToggle) {
    motionToggle.addEventListener("click", function () {
      pausedByUser = !pausedByUser;
      updateMotion();
    });
  }

  reducedMotion.addEventListener("change", updateMotion);
  updateMotion();

  // =====================================
  // IMÁGENES NO DISPONIBLES
  // =====================================

  // Mantiene los textos visibles si una imagen no existe.
  document.querySelectorAll("img").forEach(function (img) {
    function hideUnavailableImage() {
      img.hidden = true;
    }

    img.addEventListener("error", hideUnavailableImage);

    if (img.complete && img.naturalWidth === 0) {
      hideUnavailableImage();
    }
  });

  // =====================================
  // FORMULARIO EN VISTA LOCAL
  // =====================================

  const form = document.getElementById("contactoForm");
  const formStatus = document.getElementById("formStatus");

  // El formulario publicado conserva el envío nativo de Netlify.
  // Abrir el HTML directamente no permite enviar al servidor.
  if (form && window.location.protocol === "file:") {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (formStatus) {
        formStatus.textContent =
          "Este formulario no envía mensajes desde un archivo local. " +
          "Contáctanos por WhatsApp o correo con los enlaces de esta sección.";
      }
    });
  }
});