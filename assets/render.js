(function () {
  var cfg = window.LANDING_CONFIG || {};

  // 1) Titolo della pagina = nome creator (se nodo presente)
  if (cfg.name) {
    var t = document.querySelector("title[data-bind='name']");
    if (t) t.textContent = cfg.name;
  }

  // 2) Foto profilo
  var photo = document.querySelector("[data-bind='photo']");
  if (photo && cfg.photoSrc) photo.setAttribute("src", cfg.photoSrc);

  // 3) Nome dentro all'h2
  var nameEl = document.querySelector("[data-bind='name-text']");
  if (nameEl && cfg.name) nameEl.textContent = cfg.name;

  // 4) Badge "verified"
  var badge = document.querySelector("[data-bind='badge']");
  if (badge && cfg.badgeSrc) badge.setAttribute("src", cfg.badgeSrc);

  // 5) CTA href (telegram per home, ads per /entraora/)
  var cta = document.querySelector("[data-bind='cta']");
  if (cta) {
    var pageType = document.body.getAttribute("data-page") || "home";
    var url = pageType === "entraora" ? cfg.adsUrl : cfg.telegramUrl;
    if (url) cta.setAttribute("href", url);
  }

  // 6) Meta Pixel (solo se configurato)
  if (cfg.metaPixelId) {
    var s = document.createElement("script");
    s.text = "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','" + cfg.metaPixelId + "');fbq('track','PageView');";
    document.head.appendChild(s);
    var ns = document.createElement("noscript");
    ns.innerHTML = '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=' + encodeURIComponent(cfg.metaPixelId) + '&ev=PageView&noscript=1" />';
    document.head.appendChild(ns);
  }

  // 7) Google Tag (solo se configurato)
  if (cfg.googleTagId) {
    var g1 = document.createElement("script");
    g1.async = true;
    g1.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(cfg.googleTagId);
    document.head.appendChild(g1);
    var g2 = document.createElement("script");
    g2.text = "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','" + cfg.googleTagId + "');";
    document.head.appendChild(g2);
  }
})();
