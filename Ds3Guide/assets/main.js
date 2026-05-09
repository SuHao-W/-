
document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('.collapsible').forEach(c=>{
    const h=c.querySelector('.collapsible-header');
    if(h)h.addEventListener('click',()=>c.classList.toggle('open'));
  });
  const current=window.location.pathname.split('/').pop()||'index.html';
  const folder=window.location.pathname.split('/').slice(-2)[0];
  document.querySelectorAll('.nav-links a').forEach(l=>{
    l.classList.remove('active');
    const href=l.getAttribute('href');
    if(href){const f=href.split('/').slice(-2)[0],p=href.split('/').pop();if(current===p||folder===f)l.classList.add('active');}
  });
});
