import Navbar from './navbar';
import Header from './header';
import Footer from './footer';

export default function Layout({ children }) {
  return (
    <>
      <header>
        <Navbar/>
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}