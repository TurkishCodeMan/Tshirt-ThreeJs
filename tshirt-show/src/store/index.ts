import { proxy } from "valtio";

const state=proxy({
 intro:true,
 color:'#EFBD48',
 isLogoTexture:true,
 isFullTexture:false,
 isDragHand:false,
 isDragHandFull:false,
 logoDecal:'./threejs.png',
 fullDecal:'./threejs.png',

 pointer:{
    y:0,
    x:-0.5
 }
});

export default state;