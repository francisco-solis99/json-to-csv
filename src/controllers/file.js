import byFile from '../views/file/file.html?raw';
import '../views/file/file.css';
import getCsvLists from '../utils/getCsvPropsAndItems.js';


export default () => {
  const divWrapper = document.createElement('div');
  divWrapper.innerHTML = byFile;

  const conversor = new Conversor(divWrapper);
  conversor.init();
  // logic of this view
  return divWrapper;
};

function Conversor(htmlContent){
  this.htmlContent = htmlContent;
  this.dropArea = htmlContent.querySelector('.full-choose__file');
  this.inputFile = htmlContent.querySelector('.input__file');
  this.files = null;
}

Conversor.prototype = {
  constructor: Conversor,

  init(){
    this.inputFile.addEventListener('change', (e) => this.handleFiles.call(this, e));
    this.dropArea.addEventListener('dragenter', this.handleEnter.bind(this));
    this.dropArea.addEventListener('drop', (e) => this.handleDrop.call(this, e));
    this.dropArea.addEventListener('dragover', (e) => this.handleDragOver.call(this, e));
    this.dropArea.addEventListener('dragleave', (e) => this.handleLeave.call(this, e));
    this.dropArea.addEventListener('dragexit', (e) => this.handleLeave.call(this, e));
    this.dropArea.addEventListener('dragend', (e) => this.handleLeave.call(this, e));
  },

  handleFiles(e) {
    console.log('Hanlde the file');
    // get the file
    this.files = e.target.files;
    this.processFile(this.files[0]);
  },

  handleEnter(){
    this.dropArea.classList.add('active');
    this.dropArea.textContent = 'Drop to upload the JSON file';
  },

  handleDrop(e){
    e.preventDefault();
    this.dropArea.classList.remove('active');

    // get the file
    this.files = e.dataTransfer.files;
    this.processFile(this.files[0]);
  },

  handleDragOver(e){
    e.preventDefault();
  },

  handleLeave(e){
    e.preventDefault();
    this.dropArea.classList.remove('active');
  },

  processFile(file){
    const docType = file.type;
    const btnFile = this.htmlContent.querySelector('.btn__choose');
    const titleFile = file.name.split('.')[0];

    if(docType === 'application/json'){
      const fileReader = new FileReader();
      // shooting the event load of he fileReader
      fileReader.readAsText(file);

      // load event
      fileReader.addEventListener('load', (e) => {
        const textResult = e.target.result;
        const json = JSON.parse(textResult);
        const jsonList = json.length ? json : [json];
        const [properties, items] = getCsvLists(jsonList);

        const csvText = `${properties.join(',')}\r\n${items.join('\r\n')}`;
        this.buildCsvFile(csvText, titleFile);
      });

      // progress event
      fileReader.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const intervalId = setInterval(() => {
            const progress = (e.loaded / e.total) * 100;
            btnFile.style.setProperty('--widthAfter', `${progress}%`);
            if(progress === 100) {
              clearInterval(intervalId);
              btnFile.classList.add('file__loaded');
              this.dropArea.style.display = 'none';
              btnFile.setAttribute('for', '');
              btnFile.innerHTML = 'Click to convert another file';
              btnFile.addEventListener('click', () => window.location.reload());
            }
          }, 0);
        }
      });
      return;
    }
    alert('Invalid doctype...');
  },

  // build the csv file for it's downloaded
  buildCsvFile(text, title){
    const blob = new Blob([text], { type: 'text/csv' });

    const url = window.URL.createObjectURL(blob);
    const aTag = document.createElement('a');
    aTag.setAttribute('href', url);
    aTag.setAttribute('download', `${title}.csv`);

    aTag.click();
  },

};
