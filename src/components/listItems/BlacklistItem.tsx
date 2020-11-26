import React from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext";
import IBlacklist from "../../interfaces/IBlacklist";

export default function BlacklistItem({ item }: { item: IBlacklist }) {
  const { removeFromBlacklist } = React.useContext(AuthContext);

  return (
    <Container>
      <Title>{item.description}</Title>
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
`;

const Title = styled.div`
  display: flex;
  flex: 2;
  box-sizing: border-box;
  text-transform: uppercase;
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
