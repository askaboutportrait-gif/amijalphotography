const photos = [
  {
    title: "Quiet Vows",
    category: "Weddings",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=86",
    alt: "Wedding couple standing together outdoors",
    shape: "wide",
    detail: "Soft daylight coverage for intimate ceremonies and family moments."
  },
  {
    title: "Studio Grace",
    category: "Portraits",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1100&q=86",
    alt: "Editorial portrait with soft natural light",
    shape: "",
    detail: "Clean portraits with a gentle editorial finish."
  },
  {
    title: "Launch Night",
    category: "Events",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1100&q=86",
    alt: "Crowd at an evening event",
    shape: "tall",
    detail: "Atmosphere, guests, details, and the energy around the room."
  },
  {
    title: "Founder Light",
    category: "Brands",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1100&q=86",
    alt: "Professional portrait for a brand story",
    shape: "",
    detail: "Brand portraits shaped for websites, launches, and social campaigns."
  },
  {
    title: "Golden Hour",
    category: "Portraits",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1100&q=86",
    alt: "Outdoor portrait during golden hour",
    shape: "",
    detail: "Natural-light portraits with relaxed direction and warm color."
  },
  {
    title: "First Dance",
    category: "Weddings",
    image:
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1400&q=86",
    alt: "Wedding dance floor celebration",
    shape: "wide",
    detail: "Movement, emotion, and the reception details between the big moments."
  },
  {
    title: "Product Table",
    category: "Brands",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1100&q=86",
    alt: "Styled product photograph",
    shape: "",
    detail: "Detail-rich content libraries for small businesses and makers."
  }
];

const gallery = document.querySelector("#gallery");
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const navToggle = document.querySelector(".nav-toggle");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxTitle = lightbox.querySelector("h3");
const lightboxText = lightbox.querySelector("p");
const closeButton = lightbox.querySelector(".close-button");
const bookingForm = document.querySelector(".booking-form");

let activeFilter = "All";

function visiblePhotos() {
  return photos.filter((photo) => activeFilter === "All" || photo.category === activeFilter);
}

function renderGallery() {
  gallery.innerHTML = visiblePhotos()
    .map(
      (photo, index) => `
        <button class="gallery-item ${photo.shape}" type="button" data-index="${photos.indexOf(photo)}">
          <img src="${photo.image}" alt="${photo.alt}" loading="${index < 2 ? "eager" : "lazy"}">
          <span class="gallery-caption">
            <strong>${photo.title}</strong>
            <span>${photo.category}</span>
          </span>
        </button>
      `
    )
    .join("");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    renderGallery();
  });
});

gallery.addEventListener("click", (event) => {
  const item = event.target.closest("[data-index]");
  if (!item) return;

  const photo = photos[Number(item.dataset.index)];
  lightboxImage.src = photo.image;
  lightboxImage.alt = photo.alt;
  lightboxTitle.textContent = photo.title;
  lightboxText.textContent = photo.detail;

  if (typeof lightbox.showModal === "function") {
    lightbox.showModal();
  }
});

closeButton.addEventListener("click", () => lightbox.close());

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.close();
  }
});

navToggle.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("menu-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
  });
});

bookingForm.addEventListener("submit", () => {
  if (!bookingForm.checkValidity()) return;

  const button = bookingForm.querySelector("button");
  button.disabled = true;
  button.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v5m0 8v5m6.4-15.4-3.5 3.5m-5.8 5.8-3.5 3.5M21 12h-5M8 12H3m15.4 6.4-3.5-3.5M9.1 9.1 5.6 5.6"></path>
    </svg>
    Sending
  `;
});

renderGallery();
