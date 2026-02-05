(function(){
  var d=document;
  var s=d.currentScript;
  var lang=(navigator.language||'en').toLowerCase().startsWith('fr')?'fr':'en';
  var src=(s && s.getAttribute('data-src')) || ('https://soccermidable.ca/'+lang+'/widget');
  var w=(s && s.getAttribute('data-width')) || '100%';
  var h=(s && s.getAttribute('data-height')) || '680';
  var targetId=(s && s.getAttribute('data-target')) || null;
  var host=targetId ? d.getElementById(targetId) : s.parentElement;
  if(!host) return;
  var iframe=d.createElement('iframe');
  iframe.src=src;
  iframe.style.width=w;
  iframe.style.height=(String(h).match(/\D/) ? h : (h+'px'));
  iframe.style.border='0';
  iframe.loading='lazy';
  iframe.referrerPolicy='no-referrer-when-downgrade';
  host.appendChild(iframe);
})();
