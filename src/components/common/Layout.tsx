import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <header>
        <HeaderBox>Todo</HeaderBox>
      </header>
      <div>{children}</div>
      <footer>
        <FooterBox>Footer</FooterBox>
      </footer>
    </div>
  );
};

const HeaderBox = styled.div`
  width: 100%;
  padding: 12px 16px;
  background: #5e5e5e;
  color: #edd9ff;
  text-align: start;
  font-family: Inter;
  font-size: 32px;
  font-weight: 700;
  position: relative;
  top: 0;
`;

const FooterBox = styled.div`
  width: 100%;
  height: 120px;
  padding: 12px 16px;
  background: #5e5e5e;
  color: #edd9ff;
  text-align: start;
  font-family: Inter;
  font-size: 32px;
  font-weight: 700;
  position: fixed;
  bottom: 0;
`;

export default Layout;
