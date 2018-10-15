import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';

import faker from 'faker';
import gon from 'gon';
import cookies from 'js-cookie';
import app from './App';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
if (!cookies.get('userName')) {
  cookies.set('userName', faker.name.findName());
}
const userName = cookies.get('userName');

app(gon, userName);
