import Home from '../views/home/home.html?raw';
import '../views/home/home.css';

export default () => {
  const divWrapper = document.createElement('div');
  divWrapper.innerHTML = Home;

  // logic of this view


  return divWrapper;
};
