import React from "react";
import SideMenu from "./menus/SideMenu";
import CrystalBall from "./crystalball";
import styled, { keyframes } from "styled-components";
import data from "../data";
import { AuthContext } from "../contexts/AuthContext";

export default function Main() {
  const { user, blacklist, addToBlacklist } = React.useContext(AuthContext);

  const [active, setActive] = React.useState(false);
  const [question, setQuestion] = React.useState("O qUe Vou faZeR HoJE??");
  const [suggestion, setSuggestion] = React.useState({});

  const [latitude, setLatitude] = React.useState("");
  const [longitude, setLongitude] = React.useState("");

  function getRandomSuggestion() {
    const index = Math.floor(Math.random() * data.length);

    setSuggestion(data[index]);
    setActive(true);
  }

  function handleQuestion(value) {
    setQuestion(value);
    setActive(false);
  }

  async function handleAddToBlacklist() {
    await addToBlacklist(suggestion);

    setActive(false);
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

  return (
    <Container>
      <ContainerTexture />
      <SideMenu handleQuestion={handleQuestion} />

      <CrystalBall
        active={active}
        action={getRandomSuggestion}
        suggestion={suggestion}
        question={question}
      />

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
        {user && (
          <Text onClick={() => handleAddToBlacklist()} active={active}>
            JaMais! AdicIoNar a BlacKLisT!
          </Text>
        )}
      </TextContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: black;
  box-sizing: border-box;
  background-image: url("/img/universe-darker-3.jpg");
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
  opacity: 0.8;

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
    opacity: 0.8;
  }

  z-index: 1;
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
