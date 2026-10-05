(function(){
  var nav=document.getElementById('nav'), bar=document.getElementById('progress');
  function onScroll(){
    var y=window.scrollY||document.documentElement.scrollTop;
    nav.classList.toggle('stuck', y>60);
    var h=document.documentElement.scrollHeight-window.innerHeight;
    bar.style.width=(h>0?(y/h)*100:0)+'%';
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();

  var groups=new WeakMap();
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting) return;
      var el=e.target, p=el.parentElement;
      var i=groups.get(p)||0; groups.set(p,i+1);
      var d=Math.min(i,6)*70;
      el.style.transitionDelay=d+'ms';
      el.classList.add('in');
      setTimeout(function(){el.style.transitionDelay='';},d+950);
      io.unobserve(el);
    });
  },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.rv').forEach(function(el){io.observe(el);});
})();
