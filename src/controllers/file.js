import byFile from '../views/file/file.html?raw';
import '../views/file/file.css';



export default () => {
  const divWrapper = document.createElement('div');
  divWrapper.innerHTML = byFile;

  // logic of this view
  return divWrapper;
};
