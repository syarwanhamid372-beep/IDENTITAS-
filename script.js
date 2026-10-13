/* =========================================================
   WEBSITE PORTFOLIO - SCRIPT
   Semua interaksi ada di sini.
   ========================================================= */

/* ---------------------------------------------------------
   1. LOADER
   --------------------------------------------------------- */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hide'), 600);
});


/* ---------------------------------------------------------
   2. THEME TOGGLE (Dark / Light Mode)
   --------------------------------------------------------- */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const root = document.documentElement;

// Ambil tema yang tersimpan, default = light
const savedTheme = localStorage.getItem('theme') || 'light';
root.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}


/* ---------------------------------------------------------
   3. NAVBAR: scroll effect + hamburger + active link
   --------------------------------------------------------- */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Efek navbar saat scroll
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  toggleBackToTop();
  updateActiveLink();
});

// Toggle menu mobile
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Tutup menu saat link diklik
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Active link saat scroll
function updateActiveLink() {
  const scrollPos = window.scrollY + 120;
  document.querySelectorAll('section').forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}


/* ---------------------------------------------------------
   4. TYPING ANIMATION (Hero)
   --------------------------------------------------------- */
const typingEl = document.getElementById('typing');
// GANTI: Daftar profesi / keahlian yang akan diketik bergantian
const typingTexts = [
  'Siswa SMKN 42 Jakarta',
  'Desainer Grafis',
  'Editor Video',
  'Web Developer Pemula'
];

let typeIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentText = typingTexts[typeIndex];

  if (isDeleting) {
    typingEl.textContent = currentText.substring(0, charIndex--);
  } else {
    typingEl.textContent = currentText.substring(0, charIndex++);
  }

  let delay = isDeleting ? 60 : 110;

  if (!isDeleting && charIndex === currentText.length + 1) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    typeIndex = (typeIndex + 1) % typingTexts.length;
    delay = 400;
  }

  setTimeout(typeEffect, delay);
}
typeEffect();


/* ---------------------------------------------------------
   5. SCROLL REVEAL ANIMATION
   --------------------------------------------------------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');

      // Animasi skill bar (hanya di section About)
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width;
      });
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ---------------------------------------------------------
   6. PORTFOLIO FILTER
   --------------------------------------------------------- */
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    portfolioCards.forEach(card => {
      const category = card.dataset.category;
      if (filter === 'all' || category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'none';
        setTimeout(() => {
          card.style.animation = 'fadeIn 0.5s ease forwards';
        }, 10);
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Keyframe fadeIn untuk filter
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);


/* ---------------------------------------------------------
   7. MODAL: Foto Galeri
   --------------------------------------------------------- */
const imageModal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    imageModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  });
});

modalClose.addEventListener('click', closeImageModal);
imageModal.addEventListener('click', (e) => {
  if (e.target === imageModal) closeImageModal();
});

function closeImageModal() {
  imageModal.classList.remove('show');
  document.body.style.overflow = '';
}

// Tutup dengan Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeImageModal();
    closeDetailModal();
  }
});


/* ---------------------------------------------------------
   8. MODAL: Detail Karya
   --------------------------------------------------------- */
const detailModal = document.getElementById('detailModal');
const detailTitle = document.getElementById('detailTitle');
const detailDesc = document.getElementById('detailDesc');
const detailClose = document.getElementById('detailClose');

document.querySelectorAll('.view-detail').forEach(btn => {
  btn.addEventListener('click', () => {
    detailTitle.textContent = btn.dataset.title;
    detailDesc.textContent = btn.dataset.desc;
    detailModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  });
});

detailClose.addEventListener('click', closeDetailModal);
detailModal.addEventListener('click', (e) => {
  if (e.target === detailModal) closeDetailModal();
});

function closeDetailModal() {
  detailModal.classList.remove('show');
  document.body.style.overflow = '';
}


/* ---------------------------------------------------------
   9. BACK TO TOP
   --------------------------------------------------------- */
const backToTop = document.getElementById('backToTop');

function toggleBackToTop() {
  backToTop.classList.toggle('show', window.scrollY > 400);
}

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ---------------------------------------------------------
   10. TESTIMONIAL SLIDER
   --------------------------------------------------------- */
const track = document.getElementById('testimonialTrack');
const slides = document.querySelectorAll('.testimonial-card');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
const dotsContainer = document.getElementById('sliderDots');

let currentSlide = 0;
const totalSlides = slides.length;

// Buat dots otomatis
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll('button');

function goToSlide(index) {
  currentSlide = (index + totalSlides) % totalSlides;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

// Auto slide setiap 6 detik
let autoplay = setInterval(() => goToSlide(currentSlide + 1), 6000);

// Hentikan autoplay saat hover
const sliderEl = document.querySelector('.testimonial-slider');
sliderEl.addEventListener('mouseenter', () => clearInterval(autoplay));
sliderEl.addEventListener('mouseleave', () => {
  autoplay = setInterval(() => goToSlide(currentSlide + 1), 6000);
});

// Swipe support untuk mobile
let startX = 0;
track.addEventListener('touchstart', (e) => startX = e.touches[0].clientX);
track.addEventListener('touchend', (e) => {
  const diff = startX - e.changedTouches[0].clientX;
  if (diff > 50) goToSlide(currentSlide + 1);
  if (diff < -50) goToSlide(currentSlide - 1);
});


/* ---------------------------------------------------------
   11. CONTACT FORM → WhatsApp
   --------------------------------------------------------- */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // GANTI: Nomor WhatsApp tujuan (format internasional tanpa + dan tanpa 0 di depan)
  const waNumber = '6281234567890';

  const waText = `Halo, saya ${name}%0AEmail: ${email}%0A%0A${message}`;
  const waURL = `https://wa.me/${waNumber}?text=${waText}`;

  // Buka WhatsApp di tab baru
  window.open(waURL, '_blank');

  // Reset form
  contactForm.reset();
  alert('Pesan Anda akan diarahkan ke WhatsApp. Terima kasih! 🙏');
});


/* ---------------------------------------------------------
   12. SMOOTH SCROLL untuk link internal
   (CSS scroll-behavior sudah handle, tapi ini untuk fallback)
   --------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


/* ---------------------------------------------------------
   13. KONSOL INFO
   --------------------------------------------------------- */
console.log('%c🚀 Website Portfolio Loaded!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cEdit data di index.html dan script.js untuk personalisasi.', 'color: #8b5cf6; font-size: 12px;');
