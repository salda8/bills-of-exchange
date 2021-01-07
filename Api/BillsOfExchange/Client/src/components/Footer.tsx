import React from 'react';
import styled from 'styled-components';

const BrandContent = styled.div`
  text-align: center;
  word-spacing: 0.05rem;
`;

const StyledFooter = styled.footer`
  color: #fff;
  width: 100%;
  margin: auto;
  display: block;
  font-size: 1.15rem;
  padding: 3rem 1.5rem;
  background-color: #33363b;

  @media only screen and (max-width: 769px) {
    font-size: 1rem;
  }
`;

const Footer: React.FC = () => (
  <StyledFooter>
    <BrandContent>Bills Of Exchange</BrandContent>
  </StyledFooter>
);

export default Footer;