import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { privateRoutes } from './routes';
import PrivateLayout from './layout/PrivateLayout';
import PublicLayout from './layout/PublicLayout';

import Authmiddleware from './routes/authMiddleware';

import 'primeicons/primeicons.css';
import 'font-awesome/css/font-awesome.min.css';
import 'primeflex/primeflex.css';
import './assets/scss/themes/main/green/theme.scss';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <PublicLayout>
                    <Page />
                  </PublicLayout>
                }
              />
            );
          })}
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Authmiddleware>
                    <PrivateLayout>
                      <Page />
                    </PrivateLayout>
                  </Authmiddleware>
                }
              />
            );
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
