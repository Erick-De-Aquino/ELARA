// Variables globales
let currentSlide = 0;

// Menú hamburguesa
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
});

// Cerrar menú al hacer clic en un enlace
const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Carrusel
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

function showSlide(n) {
    if (n >= slides.length) currentSlide = 0;
    if (n < 0) currentSlide = slides.length - 1;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

prevBtn.addEventListener('click', () => {
    currentSlide--;
    showSlide(currentSlide);
});

nextBtn.addEventListener('click', () => {
    currentSlide++;
    showSlide(currentSlide);
});

dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
        currentSlide = idx;
        showSlide(currentSlide);
    });
});

// Auto-slide cada 5 segundos

setInterval(() => {
    currentSlide++;
    showSlide(currentSlide);
}, 4000);

// Datos de servicios con enlaces CORREGIDOS
const servicios = [
    {
        id: 1, 
        nombre: "Punto a punto",
        icono: "fa-map-marker-alt",
        desc: "Servicio de corta distancia dentro o fuera de Valencia.",
        color: "#1C4D8D",
        enlace: "pages/servicioPAP.html"  // ENLACE CORREGIDO
    },
    {
        id: 2,
        nombre: "Larga distancia",
        icono: "fa-road",
        desc: "Recorridos mayores a 20 km fuera de Valencia.",
        color: "#0C2C55",
        enlace: "pages/servicioLD.html"
    },
    {
        id: 3,
        nombre: "Servicio periódico",
        icono: "fa-calendar-day",
        desc: "Traslados diarios al trabajo, universidad o colegio.",
        color: "#2A6BBF",
        enlace: "pages/servicioPeriodico.html"
    },
    {
        id: 4,
        nombre: "Full day",
        icono: "fa-clock",
        desc: "Chofer disponible todo el día para múltiples destinos.",
        color: "#4D4D4D",
        enlace: "pages/servicioFD.html"
    },
    {
        id: 5,
        nombre: "Servicio turismo",
        icono: "fa-landmark",
        desc: "Tours por atracciones turísticas y gastronómicas.",
        color: "#ACBAC4",
        enlace: "pages/servicio-5.html"
    },
    {
        id: 6,
        nombre: "Traslado aeropuerto",
        icono: "fa-plane",
        desc: "Recogida y entrega en aeropuertos con puntualidad.",
        color: "#1C4D8D",
        enlace: "pages/servicioAero.html"
    },
    {
        id: 7,
        nombre: "Traslado mascotas",
        icono: "fa-dog",
        desc: "Transporte de mascotas con comodidad y seguridad.",
        color: "#1C4D8D",
        enlace: "pages/servicioPET.html"
    }
];

// Cargar servicios en el grid con enlaces CORREGIDOS
function cargarServicios() {
    const grid = document.getElementById('serviciosGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    servicios.forEach(serv => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <div class="service-icon">
                <i class="fas ${serv.icono}"></i>
            </div>
            <h3>${serv.nombre}</h3>
            <p>${serv.desc}</p>
            <a href="${serv.enlace}" class="btn-outline">Más info</a>
        `;
        grid.appendChild(card);
    });
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    cargarServicios();
});