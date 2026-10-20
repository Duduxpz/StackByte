let threeP;
function loadThree(){
  if(window.THREE)return Promise.resolve();
  return threeP||(threeP=new Promise(function(res,rej){var s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';s.onload=res;s.onerror=rej;document.head.appendChild(s)}));
}

/* WhatsApp: o número não aparece na página. Em base64, vira link só no clique.
   Para trocar: no console (F12) rode btoa('55DDNUMERO') e cole o resultado em P. */
export default function initHome(){var cl=[],dead=false;function on(t,e,f,o){t.addEventListener(e,f,o);cl.push(function(){t.removeEventListener(e,f,o)})}
var P='NTUzMTk5ODA2Mjk4Mg==',$=function(s){return [].slice.call(document.querySelectorAll(s))};
$('[data-wa]').forEach(function(b){b.onclick=function(){var n=atob(P);if(n==='5500000000000'){alert('Configure o número do WhatsApp no código (variável P).');return}window.open('https://wa.me/'+n+'?text='+encodeURIComponent(b.dataset.wa),'_blank','noopener')}});
var nv=document.getElementById('nv');on(window,'scroll',function(){nv.classList.toggle('s',scrollY>30)},{passive:true});
function count(el){var t=+el.dataset.n,s=el.dataset.s||'',st=performance.now();(function f(now){var q=Math.min((now-st)/1400,1);el.textContent=Math.round(t*(1-Math.pow(1-q,3)))+s;if(q<1)requestAnimationFrame(f)})(st)}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');e.target.querySelectorAll('[data-n]').forEach(count);io.unobserve(e.target)}})},{threshold:.15});
$('.rv').forEach(function(el,i){el.style.transitionDelay=(i%3)*80+'ms';io.observe(el)});
var so=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle('on',e.isIntersecting)})},{rootMargin:'-40% 0px -40% 0px'});$('.st').forEach(function(s){so.observe(s)});
var d=document.documentElement,hero=document.querySelector('.hero'),hl=document.querySelector('.hl'),pg=document.getElementById('pg'),P3=0;
on(window,'pointermove',function(e){d.style.setProperty('--mx',e.clientX+'px');d.style.setProperty('--my',e.clientY+'px')});
function onS(){var r=hero.getBoundingClientRect();P3=Math.max(0,Math.min(1,-r.top/Math.max(1,r.height-innerHeight)));var f=Math.max(0,Math.min(1,(P3-.55)/.45));hl.style.opacity=1-f;hl.style.transform='translateY('+(-f*50)+'px) scale('+(1+f*.06)+')';hl.style.filter='blur('+f*6+'px)';pg.style.transform='scaleX('+scrollY/Math.max(1,document.body.scrollHeight-innerHeight)+')'}
on(window,'scroll',onS,{passive:true});onS();
loadThree().then(function(){var host=document.getElementById('sym'),fb=host.querySelector('img');
if(!window.THREE||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
try{var T=THREE,mob=innerWidth<768,W=host.clientWidth,H=host.clientHeight;
var r=new T.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});
r.setPixelRatio(Math.min(devicePixelRatio||1,mob?1.5:2));r.setSize(W,H);r.outputEncoding=T.sRGBEncoding;r.toneMapping=T.ACESFilmicToneMapping;r.toneMappingExposure=1.15;
r.domElement.className='gl';host.appendChild(r.domElement);
var sc=new T.Scene(),cam=new T.PerspectiveCamera(42,W/H,1,6000);cam.position.set(0,0,2600);
function face(a,b,c){var k=document.createElement('canvas');k.width=k.height=512;var x=k.getContext('2d'),g=x.createLinearGradient(0,0,0,512);g.addColorStop(0,a);g.addColorStop(1,b);x.fillStyle=g;x.fillRect(0,0,512,512);if(c){x.fillStyle=c;x.fillRect(0,150,512,40);x.fillStyle='rgba(255,255,255,.14)';x.fillRect(0,300,512,12);x.fillStyle='rgba(255,157,0,.25)';x.fillRect(0,400,512,60)}return k}
var env=new T.CubeTexture([face('#3b1c08','#050303','rgba(255,255,255,.7)'),face('#512707','#080505','rgba(255,157,0,.7)'),face('#ffffff','#626268','rgba(255,255,255,.9)'),face('#0b0705','#000',null),face('#3b1c08','#080505','rgba(255,157,0,.7)'),face('#2a1506','#070403','rgba(255,255,255,.6)')]);env.encoding=T.sRGBEncoding;env.needsUpdate=true;
sc.environment=new T.PMREMGenerator(r).fromCubemap(env).texture;
var mat=new T.MeshPhysicalMaterial({color:0xfd7b01,metalness:1,roughness:.07,clearcoat:1,clearcoatRoughness:.025,envMapIntensity:2.6,emissive:0x3a1600,emissiveIntensity:.08,side:T.DoubleSide});
function shp(p){var s=new T.Shape();p.forEach(function(q,i){i?s.lineTo(q[0],q[1]):s.moveTo(q[0],q[1])});return s}
var ex={depth:18,bevelEnabled:true,bevelThickness:2.5,bevelSize:2.5,bevelSegments:mob?5:12,curveSegments:16,steps:1};
var L=[[-23.6,40.08],[-47.44,8.72],[-47.6,-7.28],[-23.92,-40.08],[-3.44,-40.08],[-33.36,1.68],[-3.28,40.08]],R=[[3.28,40.08],[33.36,1.68],[3.6,-40.08],[23.92,-40.08],[47.6,-7.44],[47.6,8.56],[23.76,40.08]],Q=[[-9.68,10.32],[-10.16,9.84],[-10.16,-9.68],[-9.68,-10.16],[10,-10],[10.16,10]];
var g=new T.Group(),inner=new T.Group();inner.position.z=-9;g.add(inner);
[[L,ex],[R,ex],[Q,{depth:16,bevelEnabled:true,bevelThickness:1.8,bevelSize:1.8,bevelSegments:ex.bevelSegments,curveSegments:16}]].forEach(function(a){var m=new T.Mesh(new T.ExtrudeGeometry(shp(a[0]),a[1]),mat);m.geometry.computeVertexNormals();inner.add(m)});
var N=mob?60:140,pa=new Float32Array(N*3);for(var i=0;i<N;i++){var a=Math.random()*6.283,b=Math.acos(2*Math.random()-1),rd=85+Math.random()*70;pa[i*3]=rd*Math.sin(b)*Math.cos(a);pa[i*3+1]=rd*Math.sin(b)*Math.sin(a)*.8;pa[i*3+2]=rd*Math.cos(b)}
var pgm=new T.BufferGeometry();pgm.setAttribute('position',new T.BufferAttribute(pa,3));var pts=new T.Points(pgm,new T.PointsMaterial({color:0xfd7b01,size:1.6,transparent:true,opacity:.75}));g.add(pts);sc.add(g);
sc.add(new T.AmbientLight(0xffffff,.35));var dl=new T.DirectionalLight(0xffffff,1.3);dl.position.set(300,400,800);sc.add(dl);
var pl=new T.PointLight(0xfd7b01,2.4);pl.position.set(-500,-250,700);sc.add(pl);var rim=new T.PointLight(0xffffff,1.6);rim.position.set(500,350,-300);sc.add(rim);
var S=1;function fit(){var vh=2*Math.tan(21*Math.PI/180)*2600,vw=vh*cam.aspect;S=Math.min(vw*.7/100,vh*.62/92)}
fit();var m={x:0,y:0,tx:0,ty:0},vis=true;
on(window,'pointermove',function(e){m.tx=e.clientX/innerWidth*2-1;m.ty=e.clientY/innerHeight*2-1});
on(window,'resize',function(){W=host.clientWidth;H=host.clientHeight;r.setSize(W,H);cam.aspect=W/H;cam.updateProjectionMatrix();fit()});
new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(host);
var first=true;function loop(t){if(dead){r.dispose();if(r.domElement.parentNode)r.domElement.parentNode.removeChild(r.domElement);return}requestAnimationFrame(loop);if(!vis)return;m.x+=(m.tx-m.x)*.06;m.y+=(m.ty-m.y)*.06;
g.rotation.y=m.x*.5+P3*Math.PI*1.4+Math.sin(t/1900)*.12;g.rotation.x=-m.y*.3+Math.sin(t/2400)*.06;g.position.y=Math.sin(t/1500)*10;
g.scale.setScalar(S*(1-P3*.08));pts.rotation.z=t/9000;pts.rotation.y=-t/14000;r.render(sc,cam);if(first){first=false;fb.style.display='none'}}
requestAnimationFrame(loop)}catch(e){console.warn('3D indisponível',e)}}).catch(function(){});
return function(){dead=true;cl.forEach(function(f){f()})}}
