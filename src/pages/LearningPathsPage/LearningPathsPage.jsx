import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  border: 2px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s;
  
  &:focus {
    border-color: blue;
  }
`;

const TargetElement = styled.div`
  background-color: white;
  color: black;
  padding: 10px;
  margin: 10px;
  border: 2px solid #ccc;
  border-radius: 4px;
  transition: background-color 0.2s, color 0.2s;
`;

const LearningPathsPage = () => {
  return (
    <Wrapper>
      <Input placeholder="Focus me" />
      <TargetElement>Change me on focus</TargetElement>
    </Wrapper>
  );
};

export default LearningPathsPage;