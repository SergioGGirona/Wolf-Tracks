import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RoutesOptions } from '../../types/routes';

const HomePage = lazy(() => import('../../pages/home.page/home.page'));
const AboutUsPage = lazy(
  () => import('../../pages/about.us.page/about.us.page')
);
const Register = lazy(() => import('../register/register'));
const Login = lazy(() => import('../login/login'));

const RegisterWolf = lazy(() => import('../register.wolf/register.wolf'));

const Profile = lazy(() => import('../profile/profile'));
const Update = lazy(() => import('../update.form/update.form'));

const ErrorPage = lazy(() => import('../error.page/error.page'));

type Props = {
  options: RoutesOptions[];
};

export function AppRouter({ options }: Props) {
  const paths = options.map((item) => item.path);

  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path={paths[1]} element={<AboutUsPage></AboutUsPage>}></Route>
        <Route path={paths[2]} element={<Register></Register>}></Route>
        <Route path={paths[3]} element={<Login></Login>}></Route>
        <Route path={paths[4]} element={<RegisterWolf></RegisterWolf>}></Route>
        <Route path={paths[5]} element={<Profile></Profile>}></Route>
        <Route path="/update/:id" element={<Update></Update>}></Route>
        <Route path={paths[7]} element={<ErrorPage></ErrorPage>}></Route>
      </Routes>
    </Suspense>
  );
}
