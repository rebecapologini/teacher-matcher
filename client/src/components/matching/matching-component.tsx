import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { useState, useEffect } from "react";
import {
  motion,
  useAnimate,
  usePresence,
  AnimatePresence,
} from "framer-motion";

import ScreenTwo from "./Screens/ScreenTwo";
import ScreenZero from "./Screens/ScreenZero";
import ScreenThree from "./Screens/ScreenThree";
import ScreenFour from "./Screens/ScreenFour";
import ScreenFailure from "./Screens/ScreenFailure";
import ScreenSuccess from "./Screens/ScreenSuccess";
import ScreenOne from "./Screens/ScreenOne";

const config = {
  delta: 10, // min distance(px) before a swipe starts. *See Notes*
  preventScrollOnSwipe: false, // prevents scroll during swipe (*See Details*)
  trackTouch: true, // track touch input
  trackMouse: false, // track mouse input
  rotationAngle: 0, // set a rotation angle
  swipeDuration: Infinity, // allowable duration of a swipe (ms). *See Notes*
  touchEventOptions: { passive: true }, // options for touch listeners (*See Details*)
};
const Matching: React.FC = () => {
  const [scope, animate] = useAnimate();
  const [isPresent, safeToRemove] = usePresence();

  const [currentXPosition, setCurrentXPosition] = useState(1);
  const [currentYPosition, setCurrentYPosition] = useState(0);
  const minXPosition = 0;
  const maxXPosition = 2;
  const minYPosition = 0;
  const maxYPosition = 4;

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? -100 : 100,
        opacity: 1,
      };
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? -100 : 100,
        opacity: 1,
      };
    },
  };

  function ResetPositions(): void {
    setCurrentXPosition(1);
    setCurrentYPosition(0);
  }

  const navigate = useNavigate();
  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      if (eventData.dir === "Up" && currentYPosition < maxYPosition) {
        setCurrentYPosition((prev) => prev + 1);
      } else if (eventData.dir === "Down" && currentYPosition > minYPosition) {
        setCurrentYPosition((prev) => prev - 1);
      } else if (eventData.dir === "Left" && currentXPosition < maxXPosition) {
        setCurrentXPosition((prev) => prev + 1);
      } else if (eventData.dir === "Right" && currentXPosition > minXPosition) {
        setCurrentXPosition((prev) => prev - 1);
      }

      console.log("User Swiped!", eventData);
    },
    ...config,
  });

  return (
    <div {...handlers}>
      <AnimatePresence mode="wait" initial={false} custom={currentXPosition}>
        <motion.div
          key={currentXPosition}
          custom={currentXPosition}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
        >
          {currentXPosition === 1 && (
            <ScreenZero stage={[currentXPosition, currentYPosition]} />
          )}

          {currentXPosition === 0 && (
            <ScreenFailure stage={[currentXPosition, currentYPosition]} />
          )}

          {currentXPosition === 2 && (
            <ScreenSuccess stage={[currentXPosition, currentYPosition]} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
export default Matching;
