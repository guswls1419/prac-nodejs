import React from 'react';
import Ellipse from '../icons/Ellipse';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const AddButton = () => {
  const navigate = useNavigate();

  return (
    <StyledButton
      onClick={() => {
        navigate('/todo/form', { state: { type: 'add' } });
      }}
    >
      <IconBox>
        <Plus>+</Plus>
        <Ellipse />
      </IconBox>
      <Text>Add New Task</Text>
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 13px;
  padding-bottom: 17px;
  background: none;
  border: none;
  cursor: pointer;
`;

const Text = styled.div`
  font-family: Inter;
  font-size: 24px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  color: #b47aea;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Plus = styled.div`
  color: white;
  font-size: 26px;
  z-index: 1;
  top: 0px;
  position: absolute;
`;

export default AddButton;
