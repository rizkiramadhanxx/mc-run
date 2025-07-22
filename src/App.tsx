import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BibPage from "./page/BibPage";
import IndexPage from './IndexPage';
import PageInput from './page/PageInput';
import TabelPelari from './page/TabelPelari';
import BibChecker from './page/BibChecker';
import SpinWheelPage from './page/SpinWheelPage';

function App () {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <IndexPage />
    },
    {
      path: "/bib",
      element: <BibPage />
    },
    {
      path: "/input-pelari",
      element: <PageInput />
    },
    {
      path: "/tabel-pelari",
      element: <TabelPelari />
    },
    {
      path: "/spinwheel",
      element: <SpinWheelPage />
    }
    // {
    //   path: "/bibchecker",
    //   element: <BibChecker />
    // }
  ]);
  return <RouterProvider router={router} />;
}

export default App