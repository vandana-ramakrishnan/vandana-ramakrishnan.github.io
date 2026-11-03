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

// Executive summary viewer: upload PDFs to assets/summaries/; links activate automatically.
const summaryTitle=document.getElementById('summary-title');
if(summaryTitle){
 const titles={
  'tariff-markets':['Tariff Attention and Inflation Expectations: Evidence from Financial Markets','tariff-financial-markets.pdf'],
  'inflation-anchoring':['Inflation Expectations Anchoring and the State-Dependent Phillips Curve','inflation-anchoring.pdf'],
  'household-tariffs':['Tariff News and Household Inflation Expectations: Role of Prior Beliefs','household-tariff-expectations.pdf'],
  'payment-frictions':['Payment Frictions and Financial Integration: The Federal Reserve’s Par Collection System','payment-frictions.pdf']
 };
 const id=new URLSearchParams(location.search).get('paper');
 const item=Object.prototype.hasOwnProperty.call(titles,id)?titles[id]:null;
 const status=document.getElementById('summary-status');
 if(!item){summaryTitle.textContent='Executive summary not found';status.textContent='Please return to the research page and choose a paper.';}
 else{
  summaryTitle.textContent=item[0];document.title='Executive Summary | '+item[0];
  const pdf='assets/summaries/'+item[1];
  if(/^https?:$/.test(location.protocol)){
   fetch(pdf,{method:'HEAD'}).then(r=>{if(!r.ok)return;
    const reader=document.getElementById('summary-reader');
    document.getElementById('summary-frame').src=pdf+'#toolbar=1&navpanes=0&view=FitH';
    document.getElementById('summary-open-pdf').href=pdf;
    reader.hidden=false;status.hidden=true;
   }).catch(()=>{});
  }
 }
}


// Paper detail page tabs and inline PDF viewers.
(() => {
  const root = document.querySelector('[data-paper-page]');
  if (!root) return;
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const panels = [...root.querySelectorAll('[role="tabpanel"]')];
  function showTab(tab, focus = false) {
    tabs.forEach(t => {
      const selected = t === tab;
      t.setAttribute('aria-selected', String(selected));
      t.tabIndex = selected ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) panel.hidden = !selected;
    });
    if (focus) tab.focus();
    const activePanel = document.getElementById(tab.getAttribute('aria-controls'));
    const reader = activePanel?.querySelector('[data-pdf-src]');
    if (reader) loadPdf(reader);
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => showTab(tab));
    tab.addEventListener('keydown', e => {
      let next = null;
      if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') next = tabs[0];
      if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); showTab(next, true); }
    });
  });
  function loadPdf(reader) {
    if (reader.dataset.checked === 'true') return;
    reader.dataset.checked = 'true';
    const url = reader.dataset.pdfSrc;
    const status = reader.querySelector('.pdf-status');
    // On local file previews, keep the configured placeholder message.
    // On GitHub Pages, replace it with the PDF viewer when the file exists.
    if (!/^https?:$/.test(location.protocol)) return;
    fetch(url, { method: 'HEAD' }).then(response => {
      const type = response.headers.get('content-type') || '';
      if (!response.ok || (!type.includes('pdf') && !type.includes('octet-stream'))) return;
      const display = reader.querySelector('.pdf-visible');
      const frame = display.querySelector('iframe');
      frame.src = url + '#view=FitH';
      display.querySelector('a.pdf-open-link').href = url;
      status.hidden = true;
      display.hidden = false;
    }).catch(() => {});
  }
})();
