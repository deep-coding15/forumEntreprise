//'use client'; // si Next.js 13+ app directory
import React, { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import p5 from "p5";

// Composant p5 pour l'animation de sphères
const SphereAnimation = ({
  bgColor = [35, 25, 90],
  sphereColor = [200, 200, 255],
  sphereSize = 5,
  boxSize = 200,
  speed = 0.01,
}) => {
  const sketchRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      let sphereRadius = boxSize - boxSize / 8;

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
      };

      p.draw = () => {
        p.background(...bgColor);
        p.stroke(...sphereColor);
        p.fill(...sphereColor);

        p.rotateY(p.frameCount * speed);
        p.push();
        p.rotateX(p.frameCount * speed);
        p.rotateZ(p.frameCount * speed * 2);

        for (let s = 0; s <= 180; s++) {
          const radS = p.radians(s);
          const z = sphereRadius * Math.cos(radS);

          for (let t = 0; t < 360; t += 12) {
            const radT = p.radians(t);
            const radius = sphereRadius * Math.sin(radS);
            const x = radius * Math.cos(radT);
            const y = radius * Math.sin(radT);

            p.push();
            p.translate(x, y, z);
            p.sphere(sphereSize, 8);
            p.pop();
          }
        }

        p.pop();
      };

      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
      };
    };

    const myP5 = new p5(sketch, sketchRef.current);

    return () => myP5.remove(); // Cleanup
  }, [bgColor, sphereColor, sphereSize, boxSize, speed]);

  return <div ref={sketchRef} />;
};

// Export par défaut pour Next.js
export default SphereAnimation;

// --- Wrapper dynamique pour désactiver le SSR ---
/* 
 */