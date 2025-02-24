//fish game v0.8
//code by lizard32
//====-=-=---- - -
//*backgrounds
//*particles
//*ownaudio
//*h>analyze
//*variety
//*upgrade++
//*titlecard
//*score
//*randommessages
//*options
//====-=-=---- - -

//system variables
const spd=500; var msg,dc,bgmf,sfxf;
//game variables
var score=0, kill=0, turn=0;
//player variables
var hp=10, sp=10, dm=10, it=10, xp=0;
//enemy variables
var ehp,edm;

function st(){ch(txt,'&#x2764;'+hp+' &#x2605;'+sp+' &#x2625;'+it+'\n'+msg);}

function ch(a,b){a.innerHTML=b;} //change text
function cc(a,b){a.setAttribute("onclick",b);} //change onclick
function rn(n){var v=Math.floor(Math.random()*n); return v;} //random number
function bh(){a.innerHTML=''; b.innerHTML=''; c.innerHTML=''; d.innerHTML='';} //hide buttons
function sfx(f){sfxf=new Audio('sfx/'+f); sfxf.volume=0.8; sfxf.play();} //play sound
function bgm(f){if(bgmf!=null){bgmf.pause();}bgmf=new Audio('bgm/'+f); bgmf.volume=0.5; bgmf.play(); bgmf.loop=true;} //play bgm
function sleep(ms){return new Promise(resolve => setTimeout(resolve, ms));}
function pc(a,b){a=a*100; return a/b} //percentage (remove?)

//init-game
function init(){
 img=document.getElementById('img');
 txt=document.getElementById('txt');
 a=document.getElementById('a');
 b=document.getElementById('b');
 c=document.getElementById('c');
 d=document.getElementById('d');
 if(bgmf!=undefined){bgmf.pause();}
 bgm('0'+rn(6))
 console.clear();
 newfoe();
}

//reset
function rebirth(){
 score=turn=kill=0
 hp=10;sp=10;dm=10
 it=10;xp=0
 init()
}

//end turn
function end(){
 img.style.display=''
 ch(a,'f'); ch(b,'i')
 ch(c,'s'); ch(d,'h')
 cc(a,'bt(0)'); cc(b,'bt(1)')
 cc(c,'bt(2)'); cc(d,'bt(3)')
 msg=''
 st()
}


//main-function
async function main(){
 if(ehp<1){
  sfx('kill');
  img.style.display='none';
  ch(txt,'&#x2713;\n\nfish died\n'+turn+' turns');
  it++; ch(a,'continue');
  if(xp>2){a.setAttribute("onclick","upgrade()");}
  else{a.setAttribute("onclick","newfoe()");}
 }
 else{
  dc=rn(edm);
  if(dc>0){
   sfx('hurt');
   msg='-'+dc;
   hp-=dc
   sp+=Math.floor(dc)
  }
  else{sfx('miss');msg='miss';}
  st();
  if(hp<1){death();}
  else{
   await sleep(spd);
   end()
  }
 }
}

//upgrade
function upgrade(){
sfx("level"); xp=0;
ch(txt,"&#x262E;\n\nlevel up");
ch(a,'hp+'); cc(a,'sfx("up");hp+=10;newfoe()');
ch(b,'dm+'); cc(b,'sfx("up");dm+=5;newfoe()');
ch(c,'sp+'); cc(c,'sfx("up");sp+=10;newfoe()');
ch(d,''); cc(d,'');
}

//new-enemy
function newfoe(){
 kill++; xp++;
 ehp=5+rn(kill*5); edm=5+rn(kill);
 console.log("foe:"+ehp+"."+edm)
 end();
}

//game-over
function death(){
 sfx('death');
 bgmf.pause();
 img.style.display='none';
 ch(txt,'&#x271D;\n\nyou died\n'+kill+' kills');
 ch(a,'reload'); cc(a,'rebirth()');
}

//fight
function fight(){
 dc=rn(dm);
 if(dc>0){
  sfx('hit');
  msg='-'+dc;
  ehp-=dc;
 }
 else{sfx('miss');msg='miss';}
 st();
}

//item
function item(){
 if(it>0){
  it--; sfx('item')
  var dc=rn(3);
  if(dc==0){msg='...';}
  if(dc==1){msg='hp+'; hp+=10;}
  if(dc==2){msg='dm+'; dm+=5;}
  if(dc==3){sp='hp+'; sp+=10;}
 }
 else{msg='no';}
 st();
}

//skill
async function skill(){
 if(sp>9){
  sp-=10; sfx('skill')
  msg='skill'; sfx('up'); st();
  await sleep(spd/2)
  fight()
  await sleep(spd/2)
  fight()
  await sleep(spd/2)
  fight()
  await sleep(spd/2)
  fight()
  await sleep(spd)
  msg=''; st()
  main()
 }
 else{
  msg='no'; st()
  await sleep(spd)
  main()
 } 
}

//help
function help(){
//todo//////////////////////////////////////////////////////////////
}

//buttons
async function bt(i){
 bh(); turn++;
 if(i==0){fight()}
 if(i==1){item()}
 if(i==2){skill()}
 if(i==3){help()}
 if(i!=2){
  await sleep(spd);
  main();
 }
}
