import React from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext";
import ISuggestion from "../../interfaces/ISuggestion";

export default function SuggestionItem({ item }: { item: ISuggestion }) {
  const { removeFromUserSuggestions } = React.useContext(AuthContext);

  const openGoogleMapsURL = () => {
    const placeId = item.placeId;
    const lat = item.coordinates && item.coordinates.lat;
    const lng = item.coordinates && item.coordinates.lng;
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${placeId}`;

    const win = window.open(url, "_blank");
    win && win.focus();
  };

  return (
    <Container>
      <Title onClick={openGoogleMapsURL}>{item.description}</Title>
      <CloseButton>
        <FaTimesStyled onClick={() => removeFromUserSuggestions(item.id)} />
      </CloseButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background: transparent;
  color: white;
  margin: 0 20px 10px;
  box-sizing: border-box;
  padding: 5px;

  @media (max-width: 600px) {
    width: 300px;
  }
`;

const Title = styled.div`
  display: flex;
  flex: 2;
  box-sizing: border-box;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const CloseButton = styled.div`
  flex: 1;
  display: flex;
  box-sizing: border-box;
  justify-content: flex-end;
`;

const FaTimesStyled = styled(FaTimes)`
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    opacity: 0.8;
  }
`;
