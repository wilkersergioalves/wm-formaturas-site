const INSTAGRAM='https://www.instagram.com/wmformaturaseeventos/';const WHATSAPP='https://wa.me/553171556356?text='+encodeURIComponent('Olá! Conheci o trabalho da WM Formaturas pelo site e gostaria de solicitar um orçamento.');document.querySelectorAll('.js-instagram').forEach(a=>{a.href=INSTAGRAM;a.target='_blank';a.rel='noopener noreferrer'});document.querySelectorAll('.js-whatsapp').forEach(a=>{a.href=WHATSAPP;a.target='_blank';a.rel='noopener noreferrer'});const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');toggle?.addEventListener('click',()=>{let open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open))});document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));if(nav){const indicator=document.createElement('span');indicator.className='nav-indicator';nav.appendChild(indicator);const active=nav.querySelector('a.active');function move(a){if(!a)return;const n=nav.getBoundingClientRect(),r=a.getBoundingClientRect();indicator.style.left=(r.left-n.left)+'px';indicator.style.width=r.width+'px'}nav.querySelectorAll('a').forEach(a=>a.addEventListener('mouseenter',()=>move(a)));nav.addEventListener('mouseleave',()=>move(active));window.addEventListener('resize',()=>move(active));requestAnimationFrame(()=>move(active))}
const photos=[...document.querySelectorAll('.gallery-item')],lightbox=document.querySelector('#lightbox');let current=0;function show(i){if(!lightbox)return;current=(i+photos.length)%photos.length;lightbox.querySelector('img').src=photos[current].dataset.full;lightbox.querySelector('img').alt=photos[current].dataset.caption;lightbox.querySelector('figcaption').textContent=photos[current].dataset.caption;lightbox.hidden=false;document.body.style.overflow='hidden'}function close(){if(lightbox){lightbox.hidden=true;document.body.style.overflow=''}}photos.forEach((p,i)=>p.addEventListener('click',()=>show(i)));lightbox?.querySelector('.lightbox-close').addEventListener('click',close);lightbox?.querySelector('.lightbox-prev').addEventListener('click',()=>show(current-1));lightbox?.querySelector('.lightbox-next').addEventListener('click',()=>show(current+1));lightbox?.addEventListener('click',e=>{if(e.target===lightbox)close()});document.addEventListener('keydown',e=>{if(!lightbox?.hidden){if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(current-1);if(e.key==='ArrowRight')show(current+1)}});document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x===b));photos.forEach((p,i)=>{p.hidden=b.dataset.filter==='formaturas'? ![0,4,5].includes(i):b.dataset.filter==='outros'?[0,4,5].includes(i):false})}));
function ytId(url){try{let u=new URL(url);if(['youtube.com','www.youtube.com','m.youtube.com','youtube-nocookie.com','www.youtube-nocookie.com'].includes(u.hostname)){let id=u.searchParams.get('v')||u.pathname.match(/^\/(?:shorts|embed|live)\/([\w-]{11})/)?.[1];return /^[\w-]{11}$/.test(id||'')?id:null}if(['youtu.be','www.youtu.be'].includes(u.hostname)){let id=u.pathname.slice(1).split('/')[0];return /^[\w-]{11}$/.test(id)?id:null}}catch{}return null}document.querySelector('#video-test')?.addEventListener('click',()=>{let id=ytId(document.querySelector('#youtube-url').value.trim()),feedback=document.querySelector('#video-feedback');if(!id){feedback.textContent='Cole um link válido do YouTube (youtube.com ou youtu.be).';return}const box=document.querySelector('#video-player'),wrap=document.querySelector('#player-wrap');wrap.replaceChildren();const iframe=document.createElement('iframe');iframe.src='https://www.youtube-nocookie.com/embed/'+id;iframe.title='Prévia de vídeo do YouTube';iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';iframe.allowFullscreen=true;iframe.referrerPolicy='strict-origin-when-cross-origin';wrap.append(iframe);box.hidden=false;feedback.textContent='Prévia carregada. O vídeo não foi adicionado permanentemente ao site.';box.scrollIntoView({behavior:'smooth'})});document.querySelector('#close-player')?.addEventListener('click',()=>{document.querySelector('#player-wrap').replaceChildren();document.querySelector('#video-player').hidden=true});
// Navegação do carrossel (manual; sem rotação automática).
(()=>{const slides=[...document.querySelectorAll('.wm-carousel .wm-slide')],dots=[...document.querySelectorAll('.wm-dot')];if(!slides.length)return;let index=0;function go(n){index=(n+slides.length)%slides.length;slides.forEach((el,i)=>el.hidden=i!==index);dots.forEach((el,i)=>{el.classList.toggle('selected',i===index);el.setAttribute('aria-current',String(i===index))})}document.querySelector('.wm-car-prev')?.addEventListener('click',()=>go(index-1));document.querySelector('.wm-car-next')?.addEventListener('click',()=>go(index+1));dots.forEach((el,i)=>el.addEventListener('click',()=>go(i)));})();

// Som discreto, apenas em interações explícitas. Respeita preferência por movimento reduzido.
(()=>{let ctx;document.addEventListener('click',e=>{const target=e.target.closest('a,button');if(!target||target.disabled)return;try{const AudioContextClass=window.AudioContext||window.webkitAudioContext;if(!AudioContextClass)return;ctx=ctx||new AudioContextClass();if(ctx.state==='suspended')ctx.resume();const osc=ctx.createOscillator(),gain=ctx.createGain(),t=ctx.currentTime;osc.type='sine';osc.frequency.setValueAtTime(850,t);osc.frequency.exponentialRampToValueAtTime(530,t+.035);gain.gain.setValueAtTime(.0001,t);gain.gain.exponentialRampToValueAtTime(.018,t+.004);gain.gain.exponentialRampToValueAtTime(.0001,t+.055);osc.connect(gain).connect(ctx.destination);osc.start(t);osc.stop(t+.06)}catch(_){}});})();
// Abre o programa de e-mail local; nenhum envio é feito pelo site.
document.querySelector('#wm-email-form')?.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(e.currentTarget);const subject=encodeURIComponent(d.get('assunto'));const body=encodeURIComponent('Nome: '+d.get('nome')+'\nE-mail: '+d.get('email')+'\n\n'+d.get('mensagem'));window.location.href='mailto:?subject='+subject+'&body='+body;});

/* Mosaico responsivo com alturas calculadas a partir da proporção real de cada fotografia. */
(function(){
 const gallery=document.querySelector('.wm-mosaic');
 if(!gallery)return;
 const items=Array.from(gallery.querySelectorAll('.wm-mosaic-item'));
 // Intercala retratos e paisagens, evitando sequências homogêneas.
 const portraits=items.filter(el=>el.classList.contains('wm-portrait'));
 const landscapes=items.filter(el=>!el.classList.contains('wm-portrait'));
 const order=[];
 while(portraits.length||landscapes.length){
  if(portraits.length)order.push(portraits.shift());
  if(landscapes.length)order.push(landscapes.shift());
  if(landscapes.length)order.push(landscapes.shift());
 }
 order.forEach((el,i)=>{gallery.appendChild(el);if(el.classList.contains('wm-landscape') && i%7===4)el.classList.add('wm-wide')});
 function layout(){
  const styles=getComputedStyle(gallery),row=parseFloat(styles.gridAutoRows)||8,gap=parseFloat(styles.rowGap)||10;
  items.forEach(el=>{
   const img=el.querySelector('img');if(!img)return;
   const ratio=img.naturalWidth&&img.naturalHeight?img.naturalHeight/img.naturalWidth:(el.classList.contains('wm-portrait')?1.35:.68);
   const h=Math.max(110,el.getBoundingClientRect().width*ratio);
   el.style.gridRow='span '+Math.ceil((h+gap)/(row+gap));
  });
 }
 items.forEach(el=>{const img=el.querySelector('img');if(img&&!img.complete)img.addEventListener('load',layout,{once:true})});
 window.addEventListener('resize',layout);
 requestAnimationFrame(layout);
})();
