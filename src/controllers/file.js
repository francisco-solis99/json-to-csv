import Swal from 'sweetalert2';
import byFile from '../views/file/file.html?raw';
import '../views/file/file.css';
import getCsvLists from '../utils/getCsvPropsAndItems.js';

/**
 * @function utilByFile
 * @description Annonymous function to controll and make the logic for the by file view
 * @returns {HTMLElement} - HTML template of Generate view
 */
export default () => {
  const divWrapper = document.createElement('div');
  divWrapper.innerHTML = byFile;

  const conversor = new Conversor(divWrapper);
  conversor.init();
  // logic of this view
  return divWrapper;
};


/**
 * Represents the logic of the by file controller view
 * @class
 * @constructor
 * @param {HTMLElement} htmlContent - The HTML template of the by file view
 * @example
 * const conversor = new Conversor(htmlTemplate);
 */
function Conversor(htmlContent){
  /** @this Conversor */

  /** @member {HTMLElement} */
  this.htmlContent = htmlContent;
  /** @member {HTMLElement} */
  this.dropArea = htmlContent.querySelector('.full-choose__file');
  /** @member {HTMLElement} */
  this.inputFile = htmlContent.querySelector('.input__file');
  /** @member {null} */
  this.files = null;
}

Conversor.prototype = /** @lends Conversor.prototype */ {
  constructor: Conversor,

   /**
   * Init the Conversor by file and add the needed listeners
   * @return {void}
   */
  init(){
    /**
    * Event to generate the translation of the JSON file into CSV file
    * @event inputFile-change
    */
    this.inputFile.addEventListener('change', (e) => this.handleFiles.call(this, e));
    /**
    * Event to generate the translation of the JSON file into CSV file
    * @event dropArea-dragenter
    */
    this.dropArea.addEventListener('dragenter', this.handleEnter.bind(this));
    /**
    * Event to generate the translation of the JSON file into CSV file
    * @event dropArea-drop
    */
    this.dropArea.addEventListener('drop', (e) => this.handleDrop.call(this, e));
    /**
    * Event to generate the translation of the JSON file into CSV file
    * @event dropArea-dragover
    */
    this.dropArea.addEventListener('dragover', (e) => this.handleDragOver.call(this, e));
    /**
    * Event to generate the translation of the JSON file into CSV file
    * @event dropArea-dragleave
    */
    this.dropArea.addEventListener('dragleave', (e) => this.handleLeave.call(this, e));
    /**
    * Event to generate the translation of the JSON file into CSV file
    * @event dropArea-dragexit
    */
    this.dropArea.addEventListener('dragexit', (e) => this.handleLeave.call(this, e));
    /**
    * Event to generate the translation of the JSON file into CSV file
    * @event dropArea-dragend
    */
    this.dropArea.addEventListener('dragend', (e) => this.handleLeave.call(this, e));
  },


  /**
   * Handle the files upload in the input type file
   * @method
   * @fires inputFile-change
   * @param {Event} e Event
   * @return {void}
   */
  handleFiles(e) {
    console.log('Hanlde the file');
    // get the file
    this.files = e.target.files;
    this.processFile(this.files[0]);
  },

   /**
   * Handle dragenter event in the drop area
   * @method
   * @fires dropArea-dragenter
   * @return {void}
   */
  handleEnter(){
    this.dropArea.classList.add('active');
    this.dropArea.textContent = 'Drop to upload the JSON file';
  },

   /**
   * Handle the drop event in the drop area
   * @method
   * @fires dropArea-drop
   * @param {Event} e Event
   * @return {void}
   */
  handleDrop(e){
    e.preventDefault();
    this.dropArea.classList.remove('active');

    // get the file
    this.files = e.dataTransfer.files;
    this.processFile(this.files[0]);
  },

  /**
   * Handle the dragOver event in the drop area
   * @method
   * @fires dropArea-dragover
   * @param {Event} e Event
   * @return {void}
  */
  handleDragOver(e){
    e.preventDefault();
  },

   /**
   * Handle the dragOver event in the drop area
   * @method
   * @fires dropArea-dragleave
   * @fires dropArea-dragend
   * @fires dropArea-dragexit
   * @param {Event} e Event
   * @return {void}
  */
  handleLeave(e){
    e.preventDefault();
    this.dropArea.classList.remove('active');
  },

  /**
   * Process the json file to convert into a csv text format
   * @param {file} file The json file got it to convert into csv
   * @returns {void}
   */
  processFile(file){
    // get the doctype of the file
    const docType = file.type;
    const btnFile = this.htmlContent.querySelector('.btn__choose');
    // get the extension
    const titleFile = file.name.split('.')[0];

    // valid if the file is a .json file
    if(docType === 'application/json'){
      const fileReader = new FileReader();
      // shooting the event load of he fileReader
      fileReader.readAsText(file);

      // load event
      fileReader.addEventListener('load', (e) => {
        // get the csv text format
        const textResult = e.target.result;
        const json = JSON.parse(textResult);
        const jsonList = json.length ? json : [json];
        const [properties, items] = getCsvLists(jsonList);

        const csvText = `${properties.join(',')}\r\n${items.join('\r\n')}`;
        this.buildCsvFile(csvText, titleFile);
      });

      // progress event
      fileReader.addEventListener('progress', (e) => {
        // Evaluating if the progress of the file is ready and make some DOM movement
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
    // Is not a valid doctype file
    Swal.fire({
      title: 'Error to convert',
      text: 'Verify your doctype file that you try to upload',
      confirmButtonText: 'Ok',
      icon: 'error',
      backdrop: true,
      width: '70%',
      padding: '1rem',
      position: 'center',
      allowOutsideClick: true,
      allowEscapeKey: true,
      confirmButtonAriaLabel: 'Confirmar'

    });
  },

  // build the csv file for it's downloaded
  /**
   * Create the csv file and downloand it
   * @param {String} text The data text in csv format
   * @param {String} title The title of the file uploaded
   * @returns {void}
   */
  buildCsvFile(text, title){
    const blob = new Blob([text], { type: 'text/csv' });

    const url = window.URL.createObjectURL(blob);
    const aTag = document.createElement('a');
    aTag.setAttribute('href', url);
    aTag.setAttribute('download', `${title}.csv`);

    aTag.click();
    Swal.fire({
      title: 'Your Csv file has been downloaded succesfully',
      icon: 'success',
      timer: 3000,
      toast: true,
      position: 'top-right',

      showConfirmButton: false,

    });
  },

};

