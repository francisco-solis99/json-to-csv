import Generate from '../views/generate/generate.html?raw';
import '../views/generate/generate.css';

export default () => {
  const divWrapper = document.createElement('div');
  divWrapper.innerHTML = Generate;

  // logic of this view


  return divWrapper;
};
