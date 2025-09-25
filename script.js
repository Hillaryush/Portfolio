
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
navToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

const links = document.querySelectorAll('.nav-link');
links.forEach(a => {
  a.addEventListener('click', e => {
    if (a.hash) {
      e.preventDefault();
      document.querySelector(a.hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      nav.classList.remove('open');
      history.replaceState(null, '', a.hash);
    }
  });
});

const sections = [...document.querySelectorAll('section[id]')];
window.addEventListener('scroll', () => {
  const y = window.scrollY + 120;
  let current = sections[0].id;
  sections.forEach(sec => {
    if (y >= sec.offsetTop) current = sec.id;
  });
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  document.querySelector('.progress').style.width = `${scrolled}%`;
});


const typedEl = document.getElementById('typed');
const titles = ['Software Engineer', 'Full-Stack Developer', 'Data Scientist'];
let ti = 0, ci = 0, dir = 1, pause = 0;

function typeLoop(){
  if (!typedEl) return;
  if (pause > 0){ pause--; return requestAnimationFrame(typeLoop); }
  const word = titles[ti];
  ci += dir;
  typedEl.textContent = word.slice(0, ci);

  if (dir === 1 && ci === word.length){ pause = 40; dir = -1; }
  if (dir === -1 && ci === 0){ dir = 1; ti = (ti + 1) % titles.length; pause = 12; }
  setTimeout(typeLoop, 50);
}
typeLoop();
const IO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('visible');
      IO.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll('.reveal-up, .reveal-pop').forEach(el => IO.observe(el));
document.getElementById('year').textContent = new Date().getFullYear();
document.querySelector('.contact-form')?.addEventListener('submit', (e) => {
  const form = e.currentTarget;
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  let valid = true;
  inputs.forEach(inp => { if (!inp.value.trim()) valid = false; });
  if (!valid){
    alert('Please fill all required fields.');
    return;
  }
  alert('Thanks! Your message has been noted (demo).');
  form.reset();
});
const hero = document.querySelector('.hero-card .card');
window.addEventListener('mousemove', (e) => {
  if (!hero) return;
  const { innerWidth:w, innerHeight:h } = window;
  const rx = (e.clientY - h/2) / h * -6;
  const ry = (e.clientX - w/2) / w * 6;
  hero.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
});
