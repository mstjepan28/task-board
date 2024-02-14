import { useEffect, useMemo } from "react";
import { Boid } from "./Boid";

export const BoidsSimulations = () => {
  // --- handle boids ---
  useEffect(() => {
    const canvas = document.getElementById("boids-canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const boids: Boid[] = Array.from({ length: 1000 }).map(() => {
      const randX = Math.random() * canvas.width;
      const randY = Math.random() * canvas.height;
      const randDx = Math.random() * 2 - 1;
      const randDy = Math.random() * 2 - 1;

      return new Boid(randX, randY, randDx, randDy);
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const boid of boids) {
        boid.update(canvas.width, canvas.height);
        boid.draw(ctx);
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  // --- handle board generation ---
  const generateTransformations = () => {
    const generateRandInt = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const skewX = generateRandInt(-20, 20);
    const skewY = generateRandInt(-20, 20);
    const rotate = generateRandInt(-20, 20);
    const translateX = generateRandInt(-200, 200);
    const translateY = generateRandInt(-200, 200);
    const scale = generateRandInt(90, 150) / 100;

    return {
      transform: `skewX(${skewX}deg) skewY(${skewY}deg) rotate(${rotate}deg) translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
    };
  };

  const generateBoard = () => {
    const BoardCell = () => {
      // const skew;
      // const transformations = generateTransformations();

      // return (
      //   <div style={transformations} className="w-40 aspect-square rounded-xl overflow-hidden">
      //     <div style={{ backdropFilter: "blur(5px)" }} className="w-full h-full"></div>
      //   </div>
      // );
      return <div style={{ backdropFilter: "blur(5px)" }} className="w-full h-full overflow-hidden bg-red-600" />;
    };

    return Array.from({ length: 8 }).map(() => <BoardCell />);
  };

  const glassBoard = useMemo(generateBoard, []);

  // --- render ---
  return (
    <div className="h-full flex justify-center items-center relative">
      {/* <div className="grid grid-cols-4 gap-8 z-10 absolute">{glassBoard}</div> */}
      <div style={{ backdropFilter: "blur(5px)" }} className="absolute inset-0 z-10" />
      <canvas id="boids-canvas" width={1000} height={750} className="fixed" />
    </div>
  );
};
