import React, { useEffect, useRef } from "react";

const BackgroundCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let stack = [];
    let w = window.innerWidth;
    let h = window.innerHeight;

    const resizeCanvas = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const drawer = () => {
      ctx.fillStyle = "#111111"; // or even "#FF00FF" just to test
 // or "transparent" to see through
      ctx.fillRect(0, 0, w, h);
      stack.forEach((el) => el());
      requestAnimationFrame(drawer);
    };

    const anim = () => {
      let x = 0;
      const maxTall = Math.random() * 100 + 200;
      const maxSize = Math.random() * 10 + 5;
      const speed = Math.random() * 2;
      const position = Math.random() * w - w / 2;
      const c = (l, u = 255) => Math.round(Math.random() * u + l || 0);
      const color = `rgb(${c(60, 10)},${c(201, 50)},${c(120, 50)})`;

      return function () {
        const deviation = Math.cos(x / 30) * Math.min(x / 40, 50);
        const tall = Math.min(x / 2, maxTall);
        const size = Math.min(x / 50, maxSize);
        x += speed;

        ctx.save();
        ctx.strokeWidth = 10;
        ctx.translate(w / 2 + position, h);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.lineTo(-size, 0);
        ctx.quadraticCurveTo(-size, -tall / 2, deviation, -tall);
        ctx.quadraticCurveTo(size, -tall / 2, size, 0);
        ctx.fill();
        ctx.restore();
      };
    };

    for (let i = 0; i < 400; i++) {
      stack.push(anim());
    }

    drawer();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        id="bg-canvas"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "#00FF00", // <--- bright green test
          zIndex: -1,
          pointerEvents: "none",
        }}
      />
    </>
  );
  

export default BackgroundCanvas;
