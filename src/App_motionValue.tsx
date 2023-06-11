import styled from "styled-components";
import { Variants, motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Wrapper = styled(motion.div)`
  height: 200vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(255,255,255,0.2);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  background-color: white;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  const gradient = useTransform(
    x,
    [-800, 800],
    ["linear-gradient(135deg,rgb(0, 238, 222),rgb(0, 48, 238))",
      "linear-gradient(135deg,rgb(32, 238, 0),rgb(238, 218, 0))"
    ]
  );
  const { scrollY, scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);

  return (
    <Wrapper style={{ background: gradient }}>
      <button onClick={() => x.set(200)}>click me</button>
      <BiggerBox ref={biggerBoxRef}>
        <Box
          style={{ x, rotateZ, scale }}
          drag="x"
          dragSnapToOrigin
        />
      </BiggerBox>
    </Wrapper>
  );
}

export default App;