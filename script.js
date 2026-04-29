/* ================================================
   REHAN SHAIKH PORTFOLIO — script.js
   ================================================ */

/* ===================================================
   1. CUSTOM CURSOR TRACKER
   =================================================== */
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

// Move dot instantly with mouse
document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top  = my + 'px';
});

// Ring follows with smooth lag
function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();

// Enlarge cursor on interactive elements
document.querySelectorAll('a, button, .gal-item, .ach-card, .proj-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    dot.style.width        = '14px';
    dot.style.height       = '14px';
    dot.style.background   = 'var(--accent3)';
    ring.style.width       = '54px';
    ring.style.height      = '54px';
    ring.style.borderColor = 'var(--accent3)';
  });
  el.addEventListener('mouseleave', () => {
    dot.style.width        = '8px';
    dot.style.height       = '8px';
    dot.style.background   = 'var(--accent)';
    ring.style.width       = '36px';
    ring.style.height      = '36px';
    ring.style.borderColor = 'var(--accent)';
  });
});


/* ===================================================
   2. PARTICLE BACKGROUND (Canvas)
   =================================================== */
const canvas = document.getElementById('particles');
const ctx    = canvas.getContext('2d');
let W, H, pts = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// Create a single particle
function rp() {
  return {
    x:  Math.random() * W,
    y:  Math.random() * H,
    vx: (Math.random() - 0.5) * 0.45,
    vy: (Math.random() - 0.5) * 0.45,
    r:  Math.random() * 1.4 + 0.3,
    a:  Math.random() * 0.5 + 0.1,
    c:  Math.random() > 0.5 ? '0,212,255' : '123,47,255'
  };
}

// Spawn 110 particles
for (let i = 0; i < 110; i++) pts.push(rp());

// Draw loop
function draw() {
  ctx.clearRect(0, 0, W, H);

  // Draw each particle
  pts.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = W;
    if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H;
    if (p.y > H) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.c},${p.a})`;
    ctx.fill();
  });

  // Connect nearby particles with lines
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx   = pts[i].x - pts[j].x;
      const dy   = pts[i].y - pts[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 90) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0,212,255,${0.07 * (1 - dist / 90)})`;
        ctx.lineWidth   = 0.5;
        ctx.moveTo(pts[i].x, pts[i].y);
        ctx.lineTo(pts[j].x, pts[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
}
draw();


/* ===================================================
   3. ANIMATED TYPING EFFECT (Hero Section)
   =================================================== */
const phrases = [
  'B.Tech CSE Student',
  'Python Developer',
  'AI Enthusiast',
  'Design Thinker',
  'Sports Lover 🏓🏸⚽',
  'Guitar Learner 🎸'
];
let pi  = 0;   // phrase index
let ci  = 0;   // char index
let del = false; // deleting?

const typingEl = document.getElementById('typing-text');

function type() {
  const phrase = phrases[pi];
  if (!del) {
    typingEl.textContent = phrase.substring(0, ci + 1) + '|';
    ci++;
    if (ci === phrase.length) {
      del = true;
      setTimeout(type, 1400);
      return;
    }
  } else {
    typingEl.textContent = phrase.substring(0, ci - 1) + '|';
    ci--;
    if (ci === 0) {
      del = false;
      pi  = (pi + 1) % phrases.length;
    }
  }
  setTimeout(type, del ? 50 : 90);
}
type();


/* ===================================================
   4. DARK / LIGHT MODE TOGGLE
   =================================================== */
const toggleBtn = document.getElementById('dark-toggle');
let lightMode   = false;

toggleBtn.addEventListener('click', () => {
  lightMode = !lightMode;
  document.body.classList.toggle('light-mode', lightMode);
  toggleBtn.innerHTML = lightMode
    ? '<i class="fas fa-moon"></i>'
    : '<i class="fas fa-sun"></i>';
});


/* ===================================================
   5. MOBILE NAV HAMBURGER
   =================================================== */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger.addEventListener('click', () => mobileNav.classList.toggle('open'));

function closeMNav() {
  mobileNav.classList.remove('open');
}
// Make closeMNav available globally for inline onclick
window.closeMNav = closeMNav;


/* ===================================================
   6. SCROLL REVEAL ANIMATION
   =================================================== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ===================================================
   7. SKILL PROGRESS BARS (Animate on Scroll)
   =================================================== */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.acard').forEach(card => skillObserver.observe(card));


/* ===================================================
   8. GALLERY LIGHTBOX
   =================================================== */
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lb-img');
const lbCap    = document.getElementById('lb-cap');

// Open lightbox on gallery item click
document.querySelectorAll('.gal-item').forEach(item => {
  item.addEventListener('click', () => {
    const src = item.dataset.src;
    if (!src) return;
    lbImg.src           = src;
    lbCap.textContent   = item.dataset.cap || '';
    lightbox.classList.add('active');
  });
});

// Close on X button
document.getElementById('lb-close').addEventListener('click', () => {
  lightbox.classList.remove('active');
});

// Close on background click
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) lightbox.classList.remove('active');
});

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') lightbox.classList.remove('active');
});


/* ===================================================
   9. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
   =================================================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--accent)'
      : '';
  });
});


/* ===================================================
   10. CONTACT FORM SUBMIT (Demo)
   =================================================== */
const contactBtn = document.getElementById('contact-submit');
if (contactBtn) {
  contactBtn.addEventListener('click', () => {
    alert('Message sent! I will get back to you soon. 🙌');
  });
}
