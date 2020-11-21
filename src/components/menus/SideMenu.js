import React from "react";
import UserMenu from "./UserMenu";
import { AuthContext } from "../../contexts/AuthContext";
import styled, { keyframes } from "styled-components";

export default function SideMenu({ handleQuestion }) {
  const { user, signIn } = React.useContext(AuthContext);

  const [open, setOpen] = React.useState(false);
  const toggleOpen = () => setOpen(!open);

  function handleOption(value) {
    handleQuestion(value);
    setOpen(false);
  }

  return (
    <>
      <Container open={open}>
        <ContentContainer>
          <TitleContainer>
            <Title>RoleZatOr</Title>
            <Description>Desenvolvido por Arthur Wosniaki</Description>
          </TitleContainer>

          <MenuContainer>
            <MenuOptions>
              <Option onClick={() => handleOption("O que vou comer hoje?")}>
                O que vou comer hoje?
              </Option>
              <Option onClick={() => handleOption("Para onde vou sair hoje?")}>
                Para onde vou sair hoje?
              </Option>
              <Option
                onClick={() => handleOption("Qualquer coisa, tanto faz...")}
              >
                Qualquer coisa, tanto faz...
              </Option>
            </MenuOptions>
          </MenuContainer>

          {user ? <UserMenu /> : <GoogleButton onClick={() => signIn()} />}
        </ContentContainer>
        <OpenBar onClick={toggleOpen}>MENU</OpenBar>
      </Container>
    </>
  );
}

const GoogleButton = styled.div`
  width: 200px;
  height: 40px;
  background: url("/assets/btn_google_signin_dark_normal_web@2x.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  cursor: pointer;

  &:hover {
    background: url("/assets/btn_google_signin_dark_focus_web@2x.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  &:active {
    background: url("/assets/btn_google_signin_dark_pressed_web@2x.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
`;

const Container = styled.div`
  width: ${({ open }) => (open ? "350px" : "0")};
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  transition: width 0.3s linear;
  z-index: 999;
  display: flex;
  box-sizing: border-box;
  @media (max-width: 600px) {
    width: ${({ open }) => (open ? "250px" : "0")};
  }
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  min-width: 0;
  flex-direction: column;
  box-sizing: border-box;
  overflow-x: hidden;
  background: rgba(0, 0, 0, 0.8);
  align-items: center;
  // justify-content: center;

  position: relative;
`;

const OpenBar = styled.div`
  min-width: 50px;
  cursor: pointer;
  opacity: 0.8;

  background: red;
  transition: all 0.2s ease;

  position: absolute;
  top: 10px;
  right: -50px;

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

  @media (max-width: 600px) {
    font-size: 30px;
  }
`;

const Description = styled.div`
  display: flex;
  color: white;
  font-size: 16px;
  white-space: nowrap;

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const MenuOptions = styled.div`
  color: white;
  font-size: 20px;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const Option = styled.div`
  white-space: nowrap;
  transition: transform 0.5s ease;
  margin-bottom: 20px;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

const MenuContainer = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;
