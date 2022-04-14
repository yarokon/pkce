import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './componetns/App';
import { GitlabCallback } from './componetns/GitlabCallback';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/callbacks/gitlab-auth" element={<GitlabCallback />} />
    </Routes>
  </BrowserRouter>
);
