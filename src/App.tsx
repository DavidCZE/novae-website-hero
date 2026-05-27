import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { LoadingOverlay } from "./LoadingOverlay";
import { EntryScreen } from "./EntryScreen";

 
const CARDS_CONFIG = [
  {
    id: "c1",
    label: "Partnerships",
    image: "images/cards2.png",
    position: { top: "62%", left: "33%" },
    rotation: 5,
    link: "#partnerships",
    size: { w: 430, h: 240 },
    zIndex: 3,
    labelPosition: "top",
    labelOffset: 30,
  },
  {
    id: "c2",
    label: "NOVAe",
    image: "images/novae.png",
    position: { top: "12%", left: "30%" },
    rotation: 15,
    link: "#novae",
    size: { w: 520, h: 430 },
    zIndex: 2,
    labelPosition: "top",
    labelOffset: 70,

  },
  {
    id: "c3",
    label: "Newsletter",
    image: "images/newsletter.png",
    position: { top: "60%", right: "55%" },
    rotation: -20,
    link: "#newsletter",
    size: { w: 720, h: 320 },
    zIndex: 4,
    labelOffset: 90,
    labelPosition: "bottom",
  },
  {
    id: "c4",
    label: "Projects",
    image: "images/notebook.png",
    position: { bottom: "15%", right: "76%" },
    rotation: -15,
    link: "#projects",
    size: { w: 300, h: 380 },
    zIndex: 2,
    labelOffset: 40,
    labelPosition: "bottom",
  },
  {
    id: "c5",
    label: "Meet the Team",
    image: "images/photo.png",
    position: { bottom: "40%", left: "75%" },
    rotation: 15,
    link: "#team",
    size: { w: 380, h: 290 },
    zIndex: 3,
    labelOffset: 18,
    labelPosition: "bottom",
  },
  {
    id: "c6",
    label: "Knowledge Base",
    image: "images/folder2.png",
    position: { bottom: "-25%", right: "0%" },
    rotation: 20,
    link: "#knowledge-base",
    size: { w: 410, h: 410 },
    zIndex: 2,
    labelPosition: "top",
    labelOffset: 40,
  },
  {
    id: "c7",
    label: "Current Project",
    image: "images/note.png",
    position: { bottom: "42%", right: "20%" },
    rotation: 15,
    link: "#current-project",
    size: { w: 200, h: 200 },
    zIndex: 2,
    labelPosition: "bottom",
    labelOffset: 6,
  },
];
 
 
const NAV_LINKS = [
  { label: "About Us", href: "#novae" },
  { label: "Projects", href: "#projects" },
  { label: "Partnerships", href: "#partnerships" },
  { label: "Team", href: "#team" },
  { label: "Newsletter", href: "#newsletter" },
  { label: "Knowledge Base", href: "#knowledge-base" },
];

function NavLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "10px",
        fontWeight: 400,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: hovered ? "#ccff00" : "rgba(255,255,255,0.55)",
        transition: "color 0.22s ease",
        textDecoration: "none",
        paddingBottom: 4,
      }}
    >
      {label}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "#ccff00",
          transformOrigin: "left",
        }}
      />
    </a>
  );
}

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      style={{
        position: "fixed",
        top: 24,
        right: 32,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        gap: 12,
        pointerEvents: "auto",
      }}
    >
      {NAV_LINKS.map((link) => (
        <NavLink key={link.href} label={link.label} href={link.href} />
      ))}
    </motion.nav>
  );
}
 
 
function FloatingCard({ card, index}) {
  const [isHovered, setIsHovered] = useState(false);
  const positionStyle = {
    position: "absolute",
    width: card.size.w,
    height: card.size.h,
    zIndex: isHovered ? 50 : card.zIndex,
    ...card.position,
  };
 
  const baseRotate = card.rotation;
  const hoverRotateShift = card.rotation > 0 ? -1.2 : 1.2;
 
  return (
    
    <motion.a
      href={card.link}
      style={positionStyle}
      initial={{ opacity: 0, y: 30, rotate: baseRotate }}
      animate={{ opacity: 1, y: 0, rotate: baseRotate }}
     transition={{
  opacity: { duration: 0.8, delay: 0.4 + index * 0.1, ease: [0.16, 1, 0.3, 1] },
  y: { duration: 0.2, ease: "easeOut" },
  x: { duration: 0.2, ease: "easeOut" },
  scale: { duration: 0.2, ease: "easeOut" },
  rotate: { duration: 0.2, ease: "easeOut" },
}}
      whileHover={{
        y: -14,
        x: card.rotation > 0 ? 5 : -5,
        scale: 1.03,
        rotate: baseRotate + hoverRotateShift,
        zIndex: 50,
        transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Card body */}
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          
          
          position: "relative",
          cursor: "pointer",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Background image */}
<img
  src={card.image}
  alt={card.label}
  style={{
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "contain",
    pointerEvents: "none",
    filter: isHovered
      ? "drop-shadow(-7px 8px 10px rgba(0,0,0,0.70)) drop-shadow(-3px 3px 4px rgba(0,0,0,0.50))"
      : "drop-shadow(-12px 20px 10px rgba(0,0,0,0.85)) drop-shadow(-3px 3px 4px rgba(0,0,0,0.50))",
    transition: "filter 0.4s ease",
  }}
/>
 
       


      </motion.div>
 
      {/* Floating label */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.94 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            style={{
                position: "absolute",
                ...(card.labelPosition === "top"
                  ? { top: (card.labelOffset ?? 12), bottom: "auto" }
                  : { bottom: (card.labelOffset ?? 12), top: "auto" }),
                left: "50%",
                transform: "translateX(-50%)",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                zIndex: 60,
            }}
          >
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 14px",
              borderRadius: 24,
              backdropFilter: "blur(20px) saturate(1.6)",
              WebkitBackdropFilter: "blur(20px) saturate(1.6)",
              background: "rgba(255,255,255,0.09)",
              border: "0.5px solid rgba(255,255,255,0.16)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            }}>
              <div style={{
                width: 5, height: 5,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.65)",
              }} />
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 400,
                letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.78)",
                textTransform: "uppercase",
              }}>
                {card.label}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.a>
  );
}
 
export function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "var(--bg-deep)",
      }}
    >
      {/* Background — swap this div's backgroundImage for any asset */}
      <div style={{
  position: "absolute",
  inset: 0,
  background: "url('images/background.png')",
  zIndex: 0,
  backgroundSize: "100% 100%",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
}} />
 
      {/* Subtle noise grain */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        opacity: 0.025,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
        pointerEvents: "none",
      }} />
 
 {/* Slogan */}
      <motion.img
  src="images/slogan.png"
  alt="BUILD SOMETHING"
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 1,
    delay: 1.1,
    ease: [0.16, 1, 0.3, 1],
  }}
  style={{
    position: "absolute",
    top: -170,
    left: -150,
    zIndex: 15,
    width: 900, // adjust depending on your design
    height: "auto",
    pointerEvents: "none",
    userSelect: "none",
  }}


/>

{/* Logo */}
      <motion.img
  src="images/logo.png"
  alt="NOVAe"
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 1,
    delay: 1.1,
    ease: [0.16, 1, 0.3, 1],
  }}
  style={{
    position: "absolute",
    top: 30,
    left: 480,
    zIndex: 15,
    width: 120, // adjust depending on your design
    height: "auto",
    pointerEvents: "none",
    userSelect: "none",
  }}


/>
      {/* Center fine grid decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.0, delay: 0.8 }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 80%)",
          pointerEvents: "none",
        }}
      />
      {/* Logo landing table */}
      {/*
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: "50%",
          transform: "translateX(-50%)",
          width: 400,
          height: 40,
          background: "linear-gradient(to top, #111, #333)",
          borderRadius: 12,
          zIndex: 5,
          boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
        }}
      ></div>
      */}
 
      {/* Floating cards */}
      <div style={{ position: "absolute", inset: 0, zIndex: 10 }}>
        {CARDS_CONFIG.map((card, i) => (
          <FloatingCard key={card.id} card={card} index={i} />
        ))}
      </div>
 
      {/* Center ambient glow */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600, height: 300,
        background: "radial-gradient(ellipse, rgba(120, 80, 200, 0.06) 0%, transparent 70%)",
        zIndex: 2,
        pointerEvents: "none",
      }} />
 
      {/* Bottom fade */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: "25%",
        background: "linear-gradient(to top, rgba(8,8,8,0.8) 0%, transparent 100%)",
        zIndex: 8,
        pointerEvents: "none",
      }} />
 
      {/* Top fade for navbar blending */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "20%",
        background: "linear-gradient(to bottom, rgba(8,8,8,0.5) 0%, transparent 100%)",
        zIndex: 8,
        pointerEvents: "none",
      }} />
 
      {/* Minimal center wordmark — decorative only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
            opacity: 1,
            y: [0, -6, 0],
        }}
        transition={{
            opacity: { duration: 1.2, delay: 1.2, ease: "easeOut" },
            y: { duration: 3.2, delay: 2.4, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{
          position: "absolute",
          bottom: 12,
          left: "41%",
          transform: "translateX(-50%)",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          pointerEvents: "none",
        }}
      >
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "11px",
          fontWeight: 300,
          letterSpacing: "0.22em",
          color: "rgba(255,255,255,0.65)",
          textTransform: "uppercase",
        }}>
          Click on the elements to explore
        </span>
      </motion.div>
    </section>
  );
}

export default function App() {
  const [stage, setStage] = useState<"entry" | "loading" | "ready">("entry");

  const handleEnter = () => {
    const audio = new Audio("images/audio4.mp3");
    audio.volume = 1.0;
    audio.play().catch(() => {});
    setStage("loading");
  };

  return (
    <>
      <AnimatePresence>
        {stage === "entry" && (
          <EntryScreen onEnter={handleEnter} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === "loading" && (
          <LoadingOverlay onRevealComplete={() => setStage("ready")} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: stage === "ready" ? 1 : 0 }}
        transition={{ duration: 2.8, ease: "easeOut", delay: 0 }}
      >
        <Navbar />
        <HeroSection />
      </motion.div>
    </>
  );
}