import { Footer } from './components/footer/footer.js';
import { Header } from './components/header/header.js';
import { AppRouter } from './components/routes/app.routes.js';
import { RoutesOptions } from './types/routes.js';

function App() {
  const RoutesOptions: RoutesOptions[] = [
    { path: '/', label: 'Home' },
    { path: '/aboutus', label: 'AboutUs' },
    { path: '/register', label: 'Register' },
    { path: '/login', label: 'Login' },
    { path: '/addWolf', label: 'RegisterWolf' },
    { path: '/profile', label: 'Profile' },
    { path: '/update', label: 'Update' },
    { path: '/suscribe', label: 'Contact' },
    { path: '/*', label: 'ErrorPage' },
  ];
  return (
    <>
      <Header></Header>
      <AppRouter options={RoutesOptions}></AppRouter>
      <Footer></Footer>
    </>
  );
}

export default App;
