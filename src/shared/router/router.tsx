import { createBrowserRouter } from 'react-router-dom';

import AppContainer from '../../AppContainer';
import { MainMenuPage } from '../../pages/MainMenuPage/MainMenuPage';
import { DepPage } from '../../pages/DepPage/DepPage';
import { SlotsPage } from '../../pages/SlotsPage/SlotsPage';
import { RoulettePage } from '../../pages/RoulettePage/RoulettePage';
import { PlinkoPage } from '../../pages/PlinkoPage/PlinkoPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <AppContainer />,
    children: [
      {
        index: true,
        element: <MainMenuPage />,
      },
      {
        path: '/dodep',
        element: <DepPage />,
      },
      {
        path: '/slots',
        element: <SlotsPage />,
      },
      {
        path: '/roulette',
        element: <RoulettePage />,
      },
      {
        path: '/plinko',
        element: <PlinkoPage />,
      },
    ],
  },
], {
  basename: '/ludka'
});

export default router;
