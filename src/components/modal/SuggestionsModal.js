import React from "react";
import DefaultModal from "./ModalLayout";
import SuggestionItem from "../listItems/SuggestionItem";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";
import { FaPlus } from "react-icons/fa";

export default function BlacklistModal({ open, closeModal }) {
  const { suggestions, addSuggestion } = React.useContext(AuthContext);

  const [suggestion, setSuggestion] = React.useState("");

  return (
    <DefaultModal open={open} closeModal={closeModal} title="Sugestões">
      <Description>"Lugares que preciso ir!"</Description>
      <InputContainer>
        <InputStyled
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
        />
        <ButtonContainer onClick={() => addSuggestion({ option: suggestion })}>
          <FaPlusStyled /> Adicionar
        </ButtonContainer>
      </InputContainer>
      <ContentContainer>
        {suggestions.map((item, index) => {
          return <SuggestionItem item={item} key={index} />;
        })}
      </ContentContainer>
    </DefaultModal>
  );
}

const Description = styled.div`
  display: flex;
  padding: 5px;
`;

const ContentContainer = styled.div`
  display: block;
  margin: 25px 5px;
  height: 250px;
  overflow-y: auto;
  box-sizing: border-box;
`;

const InputContainer = styled.div`
  box-sizing: border-box;
  padding: 15px 0;
  display block;
  //justify-content: center;
  align-items: center;
`;

const InputStyled = styled.input`
  width: 100%;
  height: 30px;

  &:focus {
    decoration: none;
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  display flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
  margin-top: 25px;


  &:hover { 
    opacity: .8;
  }
`;

const FaPlusStyled = styled(FaPlus)`
  margin-right: 15px;
`;
