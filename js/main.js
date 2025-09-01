const imagenes = [
  {
    id: 1,
    url: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Paisaje 1",
    category: "paisaje",
    author: "John Doe",
    description:
      "Un hermoso paisaje capturado durante el atardecer, mostrando la majestuosidad de la naturaleza.",
  },
  {
    id: 2,
    url: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Retrato 1",
    category: "retrato",
    author: "Jane Smith",
    description:
      "Un retrato expresivo que captura la esencia y personalidad del sujeto, resaltando sus emociones.",
  },
  {
    id: 3,
    url: "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Arquitectura 1",
    category: "arquitectura",
    author: "Alice Johnson",
    description:
      "Una impresionante estructura arquitectónica que combina diseño moderno con funcionalidad, destacando en el entorno urbano.",
  },
  {
    id: 4,
    url: "https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Paisaje 2",
    category: "paisaje",
    author: "Bob Brown",
    description:
      "Un paisaje sereno que invita a la contemplación, con montañas y un lago reflejando el cielo.",
  },
  {
    id: 5,
    url: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Retrato 2",
    category: "retrato",
    author: "Charlie Davis",
    description:
      "Un retrato íntimo que revela la profundidad y complejidad del sujeto, capturando un momento de introspección.",
  },
  {
    id: 6,
    url: "https://images.pexels.com/photos/374710/pexels-photo-374710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Arquitectura 2",
    category: "arquitectura",
    author: "Diana Evans",
    description:
      "Una obra maestra de la arquitectura contemporánea, con líneas limpias y un diseño innovador que desafía las convenciones.",
  },
];

function renderGallery() {
  const gallery = document.getElementById("gallery");

  if (gallery.children.length === 0) {
    const html = imagenes
      .map(
        (img) => `
          <div class="col gallery-item" data-category="${img.category}">
            <figure class="ratio ratio-4x3 rounded overflow-hidden mb-0 shadow-sm" style="cursor:pointer;">
              <img
                src="${img.url}"
                loading="lazy" 
                decoding="async"
                class="w-100 h-100"
                style="object-fit:cover;"
                alt="${img.title}"
                data-image-id="${img.id}">
            </figure>
            <p class="text-center mt-2 mb-0">
              <strong>${img.title}</strong><br>
              <small class="text-muted">por ${img.author}</small>
            </p>
          </div>
        `
      )
      .join("");

    gallery.innerHTML = html;
  }
}

function filterGallery(category) {
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn) => {
    if (
      btn.textContent.toLowerCase() === category ||
      (category === "all" && btn.textContent.toLowerCase() === "todos")
    ) {
      btn.classList.remove("btn-outline-primary");
      btn.classList.add("btn-primary");
    } else {
      btn.classList.remove("btn-primary");
      btn.classList.add("btn-outline-primary");
    }
  });
  const items = document.querySelectorAll(".gallery-item");
  items.forEach((item) => {
    if (category === "all" || item.getAttribute("data-category") === category) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

function showImageDetail(imageId) {
  const image = imagenes.find((img) => img.id === parseInt(imageId));
  if (image) {
    const detailContent = document.getElementById("detail-content");
    detailContent.innerHTML = `
          <div class="row">
            <div class="col-md-8">
              <img src="${image.url}" alt="${image.title}" class="img-fluid rounded shadow">
            </div>
            <div class="col-md-4 mt-3 mt-md-0">
              <h3>${image.title}</h3>
              <p class="lead">por ${image.author}</p>
              <p>${image.description}</p>
              <p><strong>Categoría:</strong> ${image.category}</p>
              <button class="btn btn-outline-primary" onclick="document.getElementById('gallery').scrollIntoView()">
                ← Volver a la galería
              </button>
            </div>
          </div>
        `;

    document.getElementById("detail").scrollIntoView({ behavior: "smooth" });
  }
}

document.addEventListener("click", (e) => {
  if (e.target.matches("[data-image-id]")) {
    showImageDetail(e.target.dataset.imageId);
  }
});

document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    if (this.checkValidity()) {
      alert("¡Mensaje enviado con éxito! Te contactaremos pronto.");
      this.reset();
      this.classList.remove("was-validated");
    } else {
      this.classList.add("was-validated");
    }
  });

document.addEventListener("DOMContentLoaded", () => renderGallery());
filterGallery("all");
