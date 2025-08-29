import { createBrowserRouter, RouterProvider } from "react-router";
import BibPage from "./page/BibPage";
import BibPage2 from "./page/BibPage2";
import IndexPage from "./IndexPage";
import PageInput from "./page/PageInput";
import PageInput2 from "./page/PageInput2";
import TabelPelari from "./page/TabelPelari";
import TabelPelari2 from "./page/TabelPelari2";
//import BibChecker from './page/BibChecker';
import SpinWheelPage from "./page/SpinWheelPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <IndexPage />,
    },
    {
      path: "/bib",
      element: <BibPage />,
    },
    {
      path: "/bib2",
      element: <BibPage2 />,
    },
    {
      path: "/input-pelari",
      element: <PageInput />,
    },
    {
      path: "/input-pelari2",
      element: <PageInput2 />,
    },
    {
      path: "/tabel-pelari",
      element: <TabelPelari />,
    },
    {
      path: "/tabel-pelari-2",
      element: <TabelPelari2 />,
    },
    {
      path: "/spinwheel",
      element: <SpinWheelPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
