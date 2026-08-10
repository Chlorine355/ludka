import { createBrowserRouter } from 'react-router-dom';

import AppContainer from '../../AppContainer';
import { MainMenuPage } from '../../pages/MainMenuPage/MainMenuPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <AppContainer />,
    children: [
      {
        index: true,
        element: <MainMenuPage />,
      },
    ],
  },
], {
  basename: '/ludka'
});

export default router;
