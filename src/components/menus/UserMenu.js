import React from "react";
import BlacklistModal from "../modal/BlacklistModal";
import SuggestionsModal from "../modal/SuggestionsModal";
import { AuthContext } from "../../contexts/AuthContext";
import styled from "styled-components";

export default function UserMenu() {
  const { user, signOut } = React.useContext(AuthContext);

  const [openBlacklistModal, setOpenBlacklistModal] = React.useState(false);
  const [openSuggestionsModal, setOpenSuggestionsModal] = React.useState(false);

  const toggleOpenBlacklistModal = () =>
    setOpenBlacklistModal(!openBlacklistModal);
  const toggleOpenSuggestionsModal = () =>
    setOpenSuggestionsModal(!openSuggestionsModal);

  const closeBlacklistModal = () => setOpenBlacklistModal(false);
  const closeSuggestionsModal = () => setOpenSuggestionsModal(false);

  return (
    <MenuContainer>
      <Username>Olá {user.displayName}!</Username>
      <MenuOptions>
        <Option onClick={toggleOpenSuggestionsModal}>Minhas sugestões</Option>
        <Option onClick={toggleOpenBlacklistModal}>Minha blacklist</Option>
        <button onClick={() => signOut()}>Sair</button>
      </MenuOptions>

      <SuggestionsModal
        open={openSuggestionsModal}
        closeModal={closeSuggestionsModal}
      />
      <BlacklistModal
        open={openBlacklistModal}
        closeModal={closeBlacklistModal}
      />
    </MenuContainer>
  );
}

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
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
`;

const Username = styled.h3`
  color: white;
  white-space: nowrap;
`;
