import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import Layout from './components/Layout';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Links from './pages/Links';
import Timeline from './pages/Timeline';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/blog" element={<Home />} />
          <Route path="/links" element={<Links/>} />
          <Route path="/timeline" element={<Timeline/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;