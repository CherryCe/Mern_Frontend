import styled from "styled-components";

export const WrapperLableText = styled.h4`
  color: rgb(56, 56, 61);
  font-size: 14px;
  font-weight: 500;
`;

export const WrapperTextValue = styled.span`
  color: rgb(56, 56, 61);
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  padding: 4px 0;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
  }
`;

export const WrapperContent = styled.div`
  display: flex;
  // align-items: center;
  flex-direction: column;
  gap: 12px;
`;

export const WrapperTextPrice = styled.div`
  padding: 4px;
  color: rgb(56, 56, 61);
  border-radius: 10px;
  backgroundcolor: rgb(238, 238, 238);
  width: fit-cotent;
`;
