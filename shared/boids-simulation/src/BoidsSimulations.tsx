import { useMemo } from "react";

export const BoidsSimulations = () => {
  const generateTransformations = () => {
    const generateRandInt = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const skewX = generateRandInt(-20, 20);
    const skewY = generateRandInt(-20, 20);
    const rotate = generateRandInt(-20, 20);
    const translateX = generateRandInt(-20, 20);
    const translateY = generateRandInt(-20, 20);
    const scale = generateRandInt(75, 125) / 100;

    return {
      transform: `skewX(${skewX}deg) skewY(${skewY}deg) rotate(${rotate}deg) translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
    };
  };

  const generateBoard = () => {
    const BoardCell = () => {
      // const skew;
      const transformations = generateTransformations();

      return (
        <div style={transformations} className="w-40 aspect-square rounded-xl overflow-hidden">
          <div style={{ backdropFilter: "blur(5px)" }} className="w-full h-full"></div>
        </div>
      );
    };

    return Array.from({ length: 16 }).map(() => <BoardCell />);
  };

  const glassBoard = useMemo(generateBoard, []);

  return (
    <div className="h-full flex justify-center items-center">
      <div className="grid grid-cols-4 gap-8 z-10 absolute">{glassBoard}</div>
      <div className="text-4xl max-w-[90%] flex justify-center">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium, laborum! Officiis eaque odio et
        consectetur aperiam, totam cupiditate sunt illo corporis ducimus fuga, non perferendis dolorum sit minima
        veritatis labore?
      </div>
    </div>
  );
};
