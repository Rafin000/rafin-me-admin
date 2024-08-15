import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import Layout from './components/Layout';

import Home from './pages/Home';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/blog" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;