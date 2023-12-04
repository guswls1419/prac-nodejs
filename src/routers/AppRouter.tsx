import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import Detail from '../pages/Detail';
import DataForm from '../pages/DataForm';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/todo/:id" element={<Detail />} />
        <Route path="/todo/form" element={<DataForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
