const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  const links = document.querySelectorAll(".menu a");

  links.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  });
}

const contactoForm = document.getElementById("contactoForm");

if (contactoForm) {
  contactoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const empresa = document.getElementById("empresa").value;
    const telefono = document.getElementById("telefono").value;
    const correo = document.getElementById("correo").value;
    const mensaje = document.getElementById("mensaje").value;

    const texto = `Hola, soy ${nombre}.
Empresa: ${empresa}
Teléfono: ${telefono}
Correo: ${correo}
Mensaje: ${mensaje}`;

    const url = `https://wa.me/573228667813?text=${encodeURIComponent(texto)}`;

    window.open(url, "_blank");
  });
}

console.log("Página Insight Core SAS cargada correctamente.");