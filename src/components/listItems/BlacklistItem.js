import React from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext";

export default function BlacklistItem({ item }) {
  const { removeFromBlacklist } = React.useContext(AuthContext);

  return (
    <Container>
      <Title>{item.option}</Title>
      <CloseButton>
        <FaTimesStyled onClick={() => removeFromBlacklist(item.id)} />
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
  text-transform: uppercase;
`;

const CloseButton = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const FaTimesStyled = styled(FaTimes)`
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
