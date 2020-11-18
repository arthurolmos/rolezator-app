import React from "react";
import SideMenu from "./SideMenu";
import styled, { keyframes } from "styled-components";
import data from "../data";

function Main() {
  const [active, setActive] = React.useState(false);
  const [question, setQuestion] = React.useState("O qUe Vou faZeR HoJE??");
  const [suggestion, setSuggestion] = React.useState({});

  const [latitude, setLatitude] = React.useState("");
  const [longitude, setLongitude] = React.useState("");

  function getRandomSuggestion() {
    const index = Math.floor(Math.random() * data.length);

    setSuggestion(data[index]);
  }

  React.useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } else {
      console.log("Not Available");
    }
  });

  function handleQuestion(value) {
    setQuestion(value);
  }

  return (
    <Container>
      <ContainerTexture />
      <SideMenu handleQuestion={handleQuestion} />
      <CrystallBallContainer>
        <Overlayer
          active={active}
          onClick={() => {
            if (!active) {
              getRandomSuggestion();
              setActive(true);
            }
          }}
        />
        <CrystallBallAura active={active} />
        <CrystalBall src="img/crystal-ball-crop.png" alt="crystal-ball" />
        <CrystallBallTexture />
        <QuestionText active={active}>{question}</QuestionText>
        <SuggestionText active={active}>{suggestion.option}</SuggestionText>
      </CrystallBallContainer>

      <TextContainer>
        <Text active={active}>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${suggestion.url}`}
            target="_blank"
          >
            Descubra {suggestion.plural} próxim{suggestion.pronoum}s da sua
            área!
          </a>
        </Text>
        <Text onClick={() => setActive(false)} active={active}>
          TeNTar noVamENte?
        </Text>
      </TextContainer>
    </Container>
  );
}

export default Main;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: black;
  box-sizing: border-box;
  background-image: url("/img/universe-darker.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  overflow: hidden;
`;

const slide = keyframes`
  0% { width: 0 }
  50% { width: 100%; }
  100% { width: 0; }
`;

const ContainerTexture = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  opacity: 0.5;

  width: 200px;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(9, 62, 121, 0) 100%
  );
  z-index: 8;
  animation: ${slide} 10s linear infinite;

  @media (max-width: 600px) {
    width: 300px;
    opacity: 1;
  }

  z-index: 1;
`;

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

const TextContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  margin-bottom: 30px;
  z-index: 4;
`;

const Text = styled.div`
  font-family: "Mystery Quest", cursive;
  color: white;
  margin: 20px;
  cursor: pointer;
  transition: text-shadow 0.5s ease;
  text-shadow: 0px -2px 4px #fff, 0px -2px 10px #ff3, 0px -10px 20px #f90,
    0px -20px 40px #c33;
  font-size: 28px;
  visibility: ${({ active }) => (active ? "visible" : "hidden")};
  opacity: ${({ active }) => (active ? 1 : 0)};

  &:hover {
    text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6,
      0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
  }

  & a {
    text-decoration: none;
    color: white;
  }

  @media (max-width: 600px) {
    font-size: 20px;
  }
`;
