/* ============================================================
   PRORED - FEDPAZCO · Tarjeta digital (estilo compacto)
   Todo lo editable está en CONFIG. No se inventan datos: los
   campos marcados como pendientes deben completarse con datos
   reales del cliente.
   ============================================================ */

const CONFIG = {
  cliente: {
    nombre: "PRORED",
    nombreCompleto: "PRORED - FEDPAZCO",
    org: "Fundación FEDPAZCO",
    profesion: "Ecosistema Profesional · Fundación FEDPAZCO",
    tagline: "Red de profesionales y emprendimiento para el desarrollo y la paz del Pacífico Colombiano",
    disponible: true,
    verificado: true
  },
  colores: {
    primary:  "#E52E2E",
    secondary:"#FDE68A",
    accent:   "#FEF2F2"
  },
  contacto: {
    telefonoDisplay: "+57 310 817 2929",
    telefonoE164: "+573108172929",
    whatsapp: "573108172929",
    mensajeWhatsapp: "Hola PRORED, vi tu tarjeta digital y quiero obtener información sobre la red de profesionales.",
    email: ""
  },
  urlTarjeta: window.location.href,

  redes: {
    instagram: "https://instagram.com/fedpazco",
    facebook:  "https://facebook.com/fedpazco",
    tiktok:    ""
  },

  servicios: [
    { icono:"fa-solid fa-user-tie", nombre:"Red de Profesionales", descripcion:"Conexión e integración de expertos de diversas disciplinas en el Pacífico.", precio:"" },
    { icono:"fa-solid fa-graduation-cap", nombre:"Docentes Pensionados", descripcion:"Aprovechamiento de la experiencia y conocimiento de educadores para el desarrollo social.", precio:"" },
    { icono:"fa-solid fa-handshake", nombre:"Aliados y Emprendimientos", descripcion:"Vinculación de empresas, instituciones y negocios para potenciar el ecosistema económico.", precio:"" }
  ],

  /* Fotos reales de actividades. Mientras no existan, se muestran
     láminas "Foto pendiente" para completar el carrusel. */
  galeria: [],

  cobertura: {
    texto: "Articulación e impacto en el Pacífico Colombiano.",
    zonas: ["Chocó", "Pacífico Colombiano"]
  },

  informacion: {
    direccion: "Chocó, Colombia"
  }
};

/* ── utilidades ── */
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

(function(){
  "use strict";

  /* ── Servicios (con precio, o "Precio a consultar" si falta) ── */
  const listaServicios = $('#lista-servicios');
  CONFIG.servicios.forEach(s => {
    const precio = s.precio ? `<span class="precio">${esc(s.precio)}</span>` : `<span class="precio precio-pend">Precio a consultar</span>`;
    listaServicios.insertAdjacentHTML('beforeend', `
      <div class="servicio-item">
        <div class="ic"><i class="${s.icono}" aria-hidden="true"></i></div>
        <div class="servicio-cuerpo"><h3>${esc(s.nombre)}</h3><p>${esc(s.descripcion)}</p>${precio}</div>
      </div>`);
  });

  /* ── Galería: fotos reales + láminas "Foto pendiente" ── */
  const wrapper = $('#swiper-wrapper');
  CONFIG.galeria.forEach(g => {
    wrapper.insertAdjacentHTML('beforeend', `<div class="swiper-slide"><img src="${g.src}" alt="${esc(g.alt)}" loading="lazy"></div>`);
  });
  const FALTANTES = 6 - CONFIG.galeria.length;
  for (let i = 0; i < FALTANTES; i++) {
    wrapper.insertAdjacentHTML('beforeend', `
      <div class="swiper-slide">
        <div class="ph" role="img" aria-label="Foto pendiente por agregar">
          <i class="fa-regular fa-image" aria-hidden="true"></i>
          <span>Foto pendiente</span>
        </div>
      </div>`);
  }

  /* ── Cobertura (sección visible) ── */
  const coberturaVista = $('#cobertura-chips-vista');
  CONFIG.cobertura.zonas.forEach(z => {
    coberturaVista.insertAdjacentHTML('beforeend', `<span class="chip">${esc(z)}</span>`);
  });

  /* ── Información (dirección → Google Maps, correo → mailto) ── */
  const listaInfo = $('#lista-informacion');
  if (CONFIG.informacion.direccion) {
    const q = encodeURIComponent(CONFIG.informacion.direccion);
    listaInfo.insertAdjacentHTML('beforeend', `
      <a class="info-row info-link" href="https://www.google.com/maps/search/?api=1&query=${q}" target="_blank" rel="noopener noreferrer">
        <span class="ic"><i class="fa-solid fa-location-dot" aria-hidden="true"></i></span>
        <span>${esc(CONFIG.informacion.direccion)}</span>
      </a>`);
  }
  if (CONFIG.contacto.email) {
    listaInfo.insertAdjacentHTML('beforeend', `
      <a class="info-row info-link" href="mailto:${esc(CONFIG.contacto.email)}">
        <span class="ic"><i class="fa-regular fa-envelope" aria-hidden="true"></i></span>
        <span>${esc(CONFIG.contacto.email)}</span>
      </a>`);
  }

  const chips = $('#cobertura-chips');
  CONFIG.cobertura.zonas.forEach(z => {
    chips.insertAdjacentHTML('beforeend', `<span class="chip">${esc(z)}</span>`);
  });

  /* ── Redes: solo se muestran si hay enlace real ── */
  const redesRow = $('#redes-row');
  const redes = [
    { key:'instagram', icono:'fa-brands fa-instagram', nombre:'Instagram' },
    { key:'facebook',  icono:'fa-brands fa-facebook-f', nombre:'Facebook' },
    { key:'tiktok',    icono:'fa-brands fa-tiktok', nombre:'TikTok' }
  ];
  let redesVisibles = 0;
  redes.forEach(r => {
    const url = CONFIG.redes[r.key];
    if (url && !/^https:\/\/(instagram|facebook|tiktok)\.com\/?$/.test(url)) {
      redesRow.insertAdjacentHTML('beforeend',
        `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="${r.nombre}"><i class="${r.icono}" aria-hidden="true"></i></a>`);
      redesVisibles++;
    }
  });
  if (!redesVisibles) redesRow.style.display = 'none';

  /* ── Acciones ── */
  function accionWhatsApp(){
    window.open(`https://wa.me/${CONFIG.contacto.whatsapp}?text=${encodeURIComponent(CONFIG.contacto.mensajeWhatsapp)}`, '_blank');
  }
  function accionLlamar(){
    window.location.href = `tel:${CONFIG.contacto.telefonoE164}`;
  }
  function accionGuardarContacto(){
    const v = [
      "BEGIN:VCARD","VERSION:3.0",
      `FN:${CONFIG.cliente.nombreCompleto}`,
      `ORG:${CONFIG.cliente.org}`,
      `TITLE:${CONFIG.cliente.profesion}`,
      `TEL;TYPE=CELL:${CONFIG.contacto.telefonoE164}`
    ];
    if (CONFIG.contacto.email) v.push(`EMAIL:${CONFIG.contacto.email}`);
    v.push(`ADR;TYPE=WORK:;;${CONFIG.informacion.direccion};;;Colombia`);
    v.push(`URL:${CONFIG.urlTarjeta}`);
    v.push("END:VCARD");
    const blob = new Blob([v.join("\n")], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'PRORED_FEDPAZCO.vcf';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1200);
    mostrarToast("Contacto descargado");
  }
  async function accionShareNativo(){
    try {
      await navigator.share({
        title: CONFIG.cliente.nombreCompleto,
        text: CONFIG.cliente.tagline,
        url: CONFIG.urlTarjeta
      });
    } catch (e) { /* cancelado por el usuario */ }
  }
  function accionCopiarLink(){
    const t = CONFIG.urlTarjeta;
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(t).then(() => mostrarToast("Vínculo copiado"), () => copiarFallback(t));
    } else {
      copiarFallback(t);
    }
  }
  function copiarFallback(texto){
    const ta = document.createElement('textarea');
    ta.value = texto; ta.style.position = 'fixed'; ta.style.left = '-9999px';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); mostrarToast("Vínculo copiado"); } catch (e) { mostrarToast("Copia: " + texto); }
    ta.remove();
  }

  /* ── Modales ── */
  let swiperInstance = null;
  function abrirModal(id){
    const el = document.getElementById(id);
    el.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    if (id === 'modal-galeria' && !swiperInstance) {
      swiperInstance = new Swiper('#swiper-galeria', {
        loop: true, spaceBetween: 10, autoplay: { delay: 3500, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true }
      });
    }
    if (id === 'modal-compartir') {
      const qrEl = $('#qr-code');
      if (!qrEl.dataset.rendered) {
        new QRCode(qrEl, { text: CONFIG.urlTarjeta, width: 150, height: 150, colorDark: CONFIG.colores.primary });
        qrEl.dataset.rendered = "1";
      }
    }
  }
  function cerrarModal(el){
    el.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  function cerrarTodos(){
    document.querySelectorAll('.modal.is-open').forEach(m => cerrarModal(m));
  }

  /* ── Delegación de clics ── */
  document.addEventListener('click', function(e){
    const btnAction = e.target.closest('[data-action]');
    if (btnAction) {
      const act = btnAction.dataset.action;
      if (act === 'whatsapp') accionWhatsApp();
      else if (act === 'llamar') accionLlamar();
      else if (act === 'guardar') accionGuardarContacto();
      else if (act === 'copiar-link') accionCopiarLink();
      else if (act === 'compartir') abrirModal('modal-compartir');
      return;
    }

    const btnScroll = e.target.closest('[data-scroll]');
    if (btnScroll) {
      const destino = document.getElementById(btnScroll.dataset.scroll);
      if (destino) destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    const btnModal = e.target.closest('[data-modal]');
    if (btnModal) { abrirModal(btnModal.dataset.modal); return; }

    if (e.target.closest('[data-close]')) { cerrarModal(e.target.closest('[data-modal-root]')); return; }
    if (e.target.hasAttribute('data-modal-root')) { cerrarModal(e.target); return; }
  });

  /* ── Compartir nativo (solo si el navegador lo soporta) ── */
  const btnShare = $('#btn-share-nativo');
  if (navigator.share) {
    btnShare.style.display = '';
    btnShare.addEventListener('click', accionShareNativo);
  }

  /* ── Teclado: Escape cierra modales ── */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarTodos();
  });

  function mostrarToast(msg){
    const t = $('#toast'); t.textContent = msg; t.classList.add('is-visible');
    setTimeout(() => t.classList.remove('is-visible'), 2200);
  }

  /* ── Splash, año y service worker ── */
  window.addEventListener('load', () => {
    setTimeout(() => $('#splash').classList.add('is-hidden'), 800);
    $('#anio').textContent = new Date().getFullYear();
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./service-worker.js').catch(() => {});
    }
  });
})();
