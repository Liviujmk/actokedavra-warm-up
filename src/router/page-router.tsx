import { Route, Routes, Navigate } from 'react-router-dom';
import { ActorPage } from '../pages/actor.page';

export const PageRouter = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/actors" />} />
    <Route path="actors" element={<ActorPage />} />
    <Route path="*" element={<h1>404 Page Not Found</h1>} />
  </Routes>
);
