const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.site-nav');
if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));});document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');}});}


// A single Google Drive CV URL powers every CV link on the site.
// Until a real URL is configured, the site displays a non-clickable label.
const cvDriveUrl = String(window.CV_GOOGLE_DRIVE_URL || '').trim();
let validDriveLink = false;
try {
  const u = new URL(cvDriveUrl);
  validDriveLink = u.protocol === 'https:' &&
    (u.hostname === 'drive.google.com' || u.hostname === 'docs.google.com');
} catch (_) { /* Link not configured yet. */ }
document.querySelectorAll('[data-cv-drive-link]').forEach(link => {
  link.hidden = !validDriveLink;
  if (validDriveLink) link.href = cvDriveUrl;
});
document.querySelectorAll('[data-cv-pending]').forEach(el => {
  el.hidden = validDriveLink;
});
