import React from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

function ModalLayout({ open, closeModal, title, children }) {
  return (
    <>
      <Container open={open}>
        <Header>
          <Title>{title}</Title>
          <CloseButton>
            <FaTimesStyled onClick={() => closeModal()} />
          </CloseButton>
        </Header>

        <Content>{children}</Content>
      </Container>
      <Backdrop open={open} />
    </>
  );
}

export default ModalLayout;

const Container = styled.div`
  display: ${({ open }) => (open ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 400px;
  height: 600px;
  margin: auto;
  z-index: 999;
  flex-direction: column;
  border-radius: 25px;
  background: purple;
  color: white;
  overflow: hidden;

  @media (max-width: 600px) {
    width: 300px;
  }
`;

const Backdrop = styled.div`
  display: ${({ open }) => (open ? "flex" : "none")};

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background: black;
  opacity: 0.5;
`;

const Header = styled.div`
  display: flex;
  height: auto;
  padding: 25px 25px 0;
`;

const Title = styled.h2`
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

const Content = styled.div`
  padding: 25px;
`;
