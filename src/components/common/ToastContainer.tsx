// ToastContainer.tsx
import React, { useEffect } from 'react';
import useToast from '../../hooks/store/useToast';
import styled from 'styled-components';

const ToastContainer: React.FC = () => {
  const { toasts, hideToast } = useToast();
  console.log(toasts);
  useEffect(() => {
    const autoHideTimeouts: NodeJS.Timeout[] = [];

    toasts.forEach((toast) => {
      const timeoutId = setTimeout(() => {
        hideToast(toast.id);
      }, 1000);

      autoHideTimeouts.push(timeoutId);
    });

    return () => {
      autoHideTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, [toasts, hideToast]);

  return (
    <Container>
      {toasts.map((toast) => (
        <ToastBox key={toast.id}>{toast.message}</ToastBox>
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  z-index: 9999;
  transform: translate(-50%, -90%);
  min-width: 250px;
  width: auto;
`;

const ToastBox = styled.div`
  margin: 10px;
  padding: 16px;
  background: #333;
  opacity: 92%;
  color: #fff;
  border-radius: 5px;
`;

export default ToastContainer;
