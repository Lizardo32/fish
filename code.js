const spd=500;
var msg,nm,kill=0,tu=0,lv=0,it=4;
var hp=0,sp=10,dm=5,fh=0,fd=0;
var hpi=0,spi=0,dmi=0;

function rn(n){var v=Math.floor(Math.random()*n);return v;}
function st(){txt.innerHTML='HP:'+hp+' SP:'+Math.floor(sp)+'\nitem:'+it+msg;}
function bh(){a.innerHTML='';b.innerHTML='';c.innerHTML='';d.innerHTML='';}
function sleep(ms){return new Promise(resolve => setTimeout(resolve, ms));}

function sfx(w){
 var audio=new Audio('sfx/'+w);
 audio.play();
}

function main(){
 img=document.getElementById('img');
 txt=document.getElementById('txt');
 a=document.getElementById('a');
 b=document.getElementById('b');
 c=document.getElementById('c');
 d=document.getElementById('d');
 newfish();
 turn();
}

function turn(){
 img.style.display='';
 a.innerHTML='f';
 b.innerHTML='i';
 c.innerHTML='s';
 d.innerHTML='h';
 a.setAttribute("onclick","bt(0)");
 msg='';
 st();  
}

async function fish(){
 if(fh<1){
  sfx('kill');
  img.style.display='none';
  txt.innerHTML='&#x2713;\n\nfish died\n'+tu+' turns';
  a.setAttribute("onclick","newfish()"); a.innerHTML='continue';
 }
 else{
  nm=rn(fd);
  if(nm>0){
   sfx('hurt');
   msg='\n-'+nm;
   hp-=nm
   sp+=nm
  }
  else{sfx('miss');msg='\nmiss';}
  st();
  if(hp<1){death();}
  else{
   await sleep(spd);
   turn()
  }
 }
}

function foe(name){
 if(name=='fish'){
  fh=(10);
  fd=5;
 }
 console.log('foe:'+fh+'.'+fd)
}

function newfish(){
 lv++;kill++;hp+=10;it++
 if(kill<5){foe('fish')}
 else{}
 turn();
}

function death(){
 sfx('death');
 img.style.display='none';
 txt.innerHTML='&#x271D;\n\nyou died\n'+kill+' kills';
 a.setAttribute("onclick",'location.reload()'); a.innerHTML='reload';
}

function luck(){
 if(it>0){it--; nm=rn(4);
  sfx('item');
  if(nm<1){msg='\n...';}
  if(nm>0&&nm<3){msg='\nhealth++'; hp+=(10*lv);}
  if(nm>2&&nm<5){msg='\ndamage++!'; dm+=5;}
 }
 else{sfx('miss');msg='\nno';}
 st();
}

function fight(){
 nm=rn(dm);
 if(nm>0){
  sfx('hit');
  msg='\n-'+nm;
  fh-=nm;
 }
 else{sfx('miss');msg='\nmiss';}
 st();
}


async function spell(){
 if(sp>9){
  sp-=10; nm=rn(4);
  //msg='\nspell!';st();
  sfx('item');
  if(nm<1){
   sfx('hit');
   nm=dm+rn(dm)
   msg='\n*-'+nm+'*';
   fh-=nm;
  }
  if(nm>0&&nm<3){msg='\nhealth++'; hp+=(10*lv);}
  if(nm>2&&nm<5){msg='\ndamage++!'; dm+=5;}
 }
 else{sfx('miss');msg='\nno';}
 st();
}

async function bt(i){
 bh(); tu++;
 if(i==0){fight();}
 if(i==1){luck();}
 if(i==2){spell();}
 await sleep(spd);
 fish();
}
