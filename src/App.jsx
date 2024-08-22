import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import Layout from './components/Layout';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Links from './pages/Links';
import Timeline from './pages/Timeline';
import Blog from './pages/Blog';
import EditBlogCard from './pages/Blog/BlogCard/EditBlogCard';
import Skills from './pages/Skills';
import Testimonials from './pages/Testimonials';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/blog" element={<Home />} />
          <Route path="/links" element={<Links/>} />
          <Route path="/skills" element={<Skills/>} />
          <Route path="/testimonials" element={<Testimonials/>} />
          <Route path="/timeline" element={<Timeline/>} />
          <Route path="/all-blogs" element={<Blog/>} />
          <Route path="/edit-blog/:postId" element={<EditBlogCard/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;