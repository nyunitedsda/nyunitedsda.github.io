import { type RouteObject } from 'react-router';
import Home from '../pages/Home/Home';
import AboutUs from '../pages/AboutUs/AboutUs';
import LiveBroadcast from '../pages/LiveBroadcast/LiveBroadcast';

const routes: RouteObject[] = [
{
    element: <Home />,
    index: true,
    path: '/',
  },
  {
    element: <LiveBroadcast />,
    index: true,
    path: '/live-broadcast',
  },
  {
    element: <AboutUs />,
    index: true,
    path: '/about-me',
  },

]

export default routes