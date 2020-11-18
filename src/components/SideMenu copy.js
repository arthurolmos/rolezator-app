import React from "react";
import styled, { keyframes } from "styled-components";

function SideMenu() {
  const [open, setOpen] = React.useState(false);

  return (
    <Container>
      <ContentContainer>
        <TitleContainer>
          <Title>RoleZatOr</Title>
          <Description>Desenvolvido por Arthur Wosniaki</Description>
        </TitleContainer>

        <MenuContainer>
          <MenuOptions>
            <Option>O que vou comer hoje?</Option>
            <Option>Para onde vou sair hoje?</Option>
            <Option>Qualquer coisa, tanto faz...</Option>
          </MenuOptions>
        </MenuContainer>
      </ContentContainer>
      <OpenBar onClick={() => setOpen(!open)}>MENU</OpenBar>
    </Container>
  );
}

export default SideMenu;

const Container = styled.div`
  width: ${({ open }) => (open ? "350px" : "50px")};
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;

  transition: width 0.3s linear;
  z-index: 99;
  overflow-x: hidden;

  display: flex;
  box-sizing: border-box;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 5;
  min-width: 0;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.8);
`;

const OpenBar = styled.div`
  min-width: 50px;
  cursor: pointer;
  opacity: 0.8;

  position: absolute;
  top: 10;
  right: 0;

  background: red;
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

const TitleContainer = styled.div`
  margin: 60px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background: black;
`;

const glow = keyframes` {
    from {
      text-shadow: 0px -2px 4px #fff, 0px -2px 10px #FF3, 0px -10px 20px         #F90, 0px -20px 40px #C33;
    }
    to {
      text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
    }
}`;

const Title = styled.div`
  font-family: "Mystery Quest", cursive;
  animation: ${glow} 5s linear infinite alternate;
  color: white;
  font-size: 36px;
`;

const Description = styled.div`
  display: flex;
  color: white;
  font-size: 16px;
  white-space: nowrap;
`;

const MenuOptions = styled.ul`
  list-style: none;
  color: white;
`;

const Option = styled.li`
  white-space: nowrap;
`;

const MenuContainer = styled.div`
  margin: 10px;
  overflow: hidden;
`;
