"use client";
import { useState } from "react";
export default function HeroVideo({ src, poster }: { src?:string|null, poster?:string|null }) {
  const [open,setOpen]=useState(false);
  const videoSrc = src || "/video/hero.mp4";
  const posterSrc = poster || "/images/hero-poster.jpg";
  return (
    <div className="card">
      <div style={{position:"relative",paddingTop:"56.25%"}}>
        <video src={videoSrc} poster={posterSrc} muted playsInline autoPlay loop preload="metadata"
          style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}} />
        <button className="btn" onClick={()=>setOpen(true)} style={{position:"absolute",left:14,bottom:14}}>▶ Play</button>
      </div>
      {open && (
        <div onClick={()=>setOpen(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.7)",display:"grid",placeItems:"center",zIndex:80,padding:16}}>
          <div className="card" onClick={(e)=>e.stopPropagation()} style={{maxWidth:980,width:"100%"}}>
            <video src={videoSrc} controls autoPlay style={{width:"100%"}} />
          </div>
        </div>
      )}
    </div>
  );
}
