import { Outlet } from 'react-router-dom';
import './reset.css'

function AppContainer() {
  return <div className="app_container">
    <Outlet />
  </div>
}

export default AppContainer;
