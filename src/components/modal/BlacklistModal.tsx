import React from "react";
import ModalLayout from "./ModalLayout";
import BlacklistItem from "../listItems/BlacklistItem";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";
import IBlacklist from "../../interfaces/IBlacklist";

export default function BlacklistModal({
  open,
  closeModal,
}: {
  open: boolean;
  closeModal: () => void;
}) {
  const { userBlacklist } = React.useContext(AuthContext);

  return (
    <ModalLayout open={open} closeModal={closeModal} title="IBlacklist">
      <>
        <Description>"Lugares que não vou nem a pau!"</Description>
        <ContentContainer>
          {userBlacklist.map((item: IBlacklist, index: number) => {
            return <BlacklistItem item={item} key={index} />;
          })}
        </ContentContainer>
      </>
    </ModalLayout>
  );
}

const Description = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 5px;
`;

const ContentContainer = styled.div`
  display: block;
  margin: 25px 5px;
  height: 250px;

  overflow-y: auto;
  box-sizing: border-box;
`;
