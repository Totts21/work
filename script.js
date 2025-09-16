async function loadContent() {
  const tag = document.getElementById('site-data');
  let data = null;
  if (tag) { try { data = JSON.parse(tag.textContent); } catch (e) {} }
  if (!data) { const res = await fetch('content.json', { cache: 'no-store' }); data = await res.json(); }
  document.getElementById('site-title').textContent = data.site_title;
  document.getElementById('lifespan').textContent = data.lifespan;
  document.getElementById('favorite-quote').textContent = data.favorite_quote;
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('primary-photo').src = data.primary_photo;
  const bioEl = document.getElementById('biography');
  (data.biography||'').split(/\n\n+/).forEach(p => { const el = document.createElement('p'); el.textContent = p; bioEl.appendChild(el); });
  const svc = data.service||{}; const svcList = document.getElementById('service-list');
  [['Date', svc.date], ['Time', svc.time], ['Venue', svc.venue], ['Address', svc.address]].forEach(([label, value]) => { if (!value) return; const li = document.createElement('li'); li.innerHTML = `<strong>${label}:</strong> ${value}`; svcList.appendChild(li); });
  const donEl = document.getElementById('donations'); (data.donations||[]).forEach(d=>{ const li=document.createElement('li'); li.innerHTML = `<a href="${d.url}" target="_blank" rel="noopener">${d.label}</a>`; donEl.appendChild(li); });
  const guest = document.getElementById('guestbook-links'); (data.contacts||[]).forEach((c,i)=>{ const a=document.createElement('a'); a.href=c.url; a.textContent=c.label; guest.appendChild(a); if (i < (data.contacts.length-1)) guest.appendChild(document.createTextNode(' · ')); });
  const gallery = document.getElementById('gallery'); (data.gallery||[]).forEach(path=>{ const img=document.createElement('img'); img.src=path; img.alt='Photo'; img.addEventListener('click',()=>openLightbox(path)); gallery.appendChild(img); });
}
function openLightbox(src){ const dlg=document.getElementById('lightbox'); document.getElementById('lightbox-img').src=src; dlg.showModal(); }
document.addEventListener('keydown',(e)=>{ if(e.key==='Escape'){ const dlg=document.getElementById('lightbox'); if(dlg.open) dlg.close(); } });
loadContent();