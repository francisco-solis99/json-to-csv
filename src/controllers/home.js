
import Home from '../views/home/home.html?raw';
import '../views/home/home.css';
import jsonImg from '../assets/images/json.svg';
import csvImg from '../assets/images/csv.svg'; // data:image/png;base64,...
import keyboardImg from '../assets/images/keyboard.svg';
import dropImg from '../assets/images/keyboard.svg';


/**
 * @function utilHome
 * @description Annonymous function to controll and make the logic for the Home view
 * @returns {HTMLElement} - HTML template of Home view
 */

export default () => {
  const divWrapper = document.createElement('div');
  divWrapper.innerHTML = Home;

  // use the images, IDK why vite doesnt support inline assets? that why I do this
  divWrapper.querySelector('.hero__img').src =  jsonImg;
  divWrapper.querySelector('.csv__img').src =  csvImg;
  divWrapper.querySelector('.keyboard__img').src =  keyboardImg;
  divWrapper.querySelector('.download__img').src =  dropImg;


  // logic of this view


  return divWrapper;
};
