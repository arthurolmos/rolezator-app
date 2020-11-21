import React from "react";
import styled, { keyframes } from "styled-components";

function Index({ active, action, question, suggestion }) {
  return (
    <CrystallBallContainer>
      <Overlayer
        active={active}
        onClick={() => {
          if (!active) {
            action();
          }
        }}
      />
      <CrystallBallAura active={active} />
      <CrystalBall src="img/crystal-ball-crop.png" alt="crystal-ball" />
      <CrystallBallTexture />
      <QuestionText active={active}>{question}</QuestionText>
      <SuggestionText active={active}>{suggestion.option}</SuggestionText>
    </CrystallBallContainer>
  );
}

export default Index;

const Overlayer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 9;
  cursor: ${({ active }) => (active ? "normal" : "pointer")};
`;

const CrystallBallContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  box-sizing: border-box;
  margin: auto;
`;

const CrystalBall = styled.img`
  width: 400px;
  height: auto;
  z-index: 7;

  @media (max-width: 600px) {
    width: 300px;
  }
`;

const CrystallBallAura = styled.div`
  width: 400px;
  height: auto;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  border-radius: 50%;
  background: ${({ active }) => (active ? "purple" : "white")};
  box-shadow:  ${({ active }) =>
    active ? "0 0 10px 10px purple;" : "0 0 10px 10px white;"}
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: all 0.8s ease, width 1ms;
  z-index: 6;

  ${CrystallBallContainer}:hover & {
    opacity: 1;
  }

  @media (max-width: 600px) {
    width: 300px;
    opacity: 1;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const CrystallBallTexture = styled.div`
  width: 400px;
  height: auto;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  border-radius: 50%;
  opacity: 0.5;
  transition: all 0.8s ease, width 1ms;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(9, 62, 121, 0) 100%
  );
  z-index: 8;
  animation: ${rotate} 6s linear infinite;

  @media (max-width: 600px) {
    width: 300px;
    opacity: 1;
  }
`;

const glow = keyframes` {
    from {
      //text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
      text-shadow: 0px -2px 4px #fff, 0px -2px 10px #FF3, 0px -10px 20px         #F90, 0px -20px 40px #C33;
    }
    to {
      text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
    }
}`;

const CrystalBallText = styled.div`
  font-family: "Mystery Quest", cursive;
  position: absolute;
  z-index: 8;
  color: white;
  font-size: 32px;
  animation: ${glow} 5s linear infinite alternate;
  word-wrap: break-word;
  transition: opacity 0.5s ease;
  align-text: center;

  @media (max-width: 600px) {
    font-size: 24px;
  }
`;

const QuestionText = styled(CrystalBallText)`
  opacity: ${({ active }) => (active ? 0 : 1)};
`;

const SuggestionText = styled(CrystalBallText)`
  opacity: ${({ active }) => (active ? 1 : 0)};
`;
