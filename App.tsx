
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';
import { Settings } from './pages/admin/Settings';
import { Portfolio } from './pages/admin/Portfolio';
import { Testimonials } from './pages/admin/Testimonials';
import { BeforeAfter } from './pages/admin/BeforeAfter';
import { FAQ } from './pages/admin/FAQ';
import { AuthGuard } from './components/admin/AuthGuard';
import { ADMIN_URL_PATH } from './constants';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Admin Routes */}
        <Route path={`/${ADMIN_URL_PATH}/login`} element={<Login />} />

        <Route element={<AuthGuard />}>
          <Route path={`/${ADMIN_URL_PATH}`} element={<Navigate to={`/${ADMIN_URL_PATH}/dashboard`} replace />} />
          <Route path={`/${ADMIN_URL_PATH}/dashboard`} element={<Dashboard />} />
          <Route path={`/${ADMIN_URL_PATH}/settings`} element={<Settings />} />
          <Route path={`/${ADMIN_URL_PATH}/portfolio`} element={<Portfolio />} />
          <Route path={`/${ADMIN_URL_PATH}/testimonials`} element={<Testimonials />} />
          <Route path={`/${ADMIN_URL_PATH}/visual-proof`} element={<BeforeAfter />} />
          <Route path={`/${ADMIN_URL_PATH}/faq`} element={<FAQ />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
