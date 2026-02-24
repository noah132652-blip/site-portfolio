toggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
// Menu burger
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
function toggleMenu(force){
const isOpen = force ?? nav.hasAttribute('hidden');
nav.toggleAttribute('hidden', !isOpen);
burger.setAttribute('aria-expanded', String(isOpen));
}
burger?.addEventListener('click', () => toggleMenu());
// Fermeture avec Échap
document.addEventListener('keydown', (e) => {
if (e.key === 'Escape') toggleMenu(false);
});
// Thème persistant
const root = document.documentElement;
const KEY = 'theme-dark';
const toggle = document.getElementById('themeToggle');
// À l’ouverture
const saved = localStorage.getItem(KEY) === '1';
root.classList.toggle('theme-dark', saved);

toggle && (toggle.checked = saved);
// À l’action
toggle?.addEventListener('change', (e) => {
const v = e.target.checked;
root.classList.toggle('theme-dark', v);
localStorage.setItem(KEY, v ? '1' : '0');
});
// Validation simple
const form = document.querySelector('form');
form?.addEventListener('submit', (e) => {
let ok = true;
const nom = form.querySelector('#nom');
const email = form.querySelector('#email');
const message = form.querySelector('#message');
// Reset
form.querySelectorAll('[role="alert"]').forEach(n => n.remove());
[nom, email, message].forEach(el => el?.setAttribute('aria-invalid',
'false'));
// Nom
if (!nom.value.trim()) { ok = false; showError(nom, 'Le nom est
requis.'); }
// Email (regex simple)
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { ok = false;
showError(email, 'Email invalide.'); }
// Message
if (message.value.trim().length < 10) { ok = false; showError(message,
'10 caractères minimum.'); }
if (!ok) e.preventDefault();
});
function showError(el, msg){
el.setAttribute('aria-invalid', 'true');
const p = document.createElement('p');
p.setAttribute('role', 'alert');
p.style.color = '#c1121f';
p.textContent = msg;
el.insertAdjacentElement('afterend', p);
const msg = document.getElementById('message');
const out = document.getElementById('restant');
msg?.addEventListener('input', () => {
if (!out) return;
const max = msg.maxLength || 280;
out.textContent = max - msg.value.length;
});