import './index.css';
import Navbar from '../Navbar'; 

// eslint-disable-next-line react/prop-types
function Layout({ children }) {
  return (
    <div className="layout">
      <header className="layout-header">
        <Navbar />  
      </header>
      <main className="layout-main">{children}</main>
    </div>
  );
}

export default Layout;

