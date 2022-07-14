
import Home from '../views/home/home.html?raw';
import '../views/home/home.css';

/**
 * @function utilHome
 * @description Annonymous function to controll and make the logic for the Home view
 * @returns {HTMLElement} - HTML template of Home view
 */

export default () => {
  const divWrapper = document.createElement('div');
  divWrapper.innerHTML = Home;

  // logic of this view


  return divWrapper;
};
