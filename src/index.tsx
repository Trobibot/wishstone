import ReactDOM                                 from 'react-dom/client';
import { createHashRouter, RouterProvider }  from "react-router-dom";

import GameController from './utils/class/GameController.class';
import PageWrapper from './pages/PageWrapper';
import HomePage from './pages/home/HomePage';
import GamePage from './pages/game/GamePage';

import './app.css'

const router = createHashRouter([
  {
    path: "/",
    element: <PageWrapper Content={ <HomePage /> } />
  },
  {
    path: "/game",
    element: <PageWrapper Content={ <GamePage /> } />,
    loader: () => GameController.getInstance().initGame()
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);