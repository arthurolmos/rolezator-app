import React from "react";
import DefaultModal from "./ModalLayout";
import BlacklistItem from "../listItems/BlacklistItem";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";

export default function BlacklistModal({ open, closeModal }) {
  const { blacklist } = React.useContext(AuthContext);

  return (
    <DefaultModal open={open} closeModal={closeModal} title="Blacklist">
      <Description>"Lugares que não vou nem a pau!"</Description>
      <ContentContainer>
        {blacklist.map((item, index) => {
          return <BlacklistItem item={item} key={index} />;
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
