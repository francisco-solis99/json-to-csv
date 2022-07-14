
import Generate from '../views/generate/generate.html?raw';
import '../views/generate/generate.css';
import getCsvLists from '../utils/getCsvPropsAndItems.js';

/**
 * @function utilGenerate
 * @description Annonymous function to controll and make the logic for the Generate view
 * @returns {HTMLElement} - HTML template of Generate view
 */
export default () => {
  const divWrapper = document.createElement('div');
  divWrapper.innerHTML = Generate;

  // logic of this view
  /**
  *
  * @type {Generator}
  */
  const generator = new Generator(divWrapper);
  generator.init();
  return divWrapper;
};

/**
 * Represents the logic of the genarate controller view
 * @class
 * @constructor
 * @param {HTMLElement} htmlContent - The HTML template of the generator view
 * @example
 * const generator = new Generator(htmlTemplate);
 */
function Generator(htmlContent) {
  /** @this Generator */

  /** @member {HTMLElement} */
  this.htmlContent = htmlContent;
  /** @member {HTMLElement} */
  this.btnConverter = htmlContent.querySelector('.generate__button');
  /** @member {HTMLElement} */
  this.outputOption = htmlContent.querySelector('.generate__options-input');
  /** @member {HTMLElement} */
  this.outputPlace = htmlContent.querySelector('.output');
  /** @member {Array<HTMLElement>} */
  [this.jsonTextArea, this.csvTextArea] = htmlContent.querySelectorAll('.generate__textarea');
}

Generator.prototype = /** @lends Generator.prototype */ {
  constructor: Generator,


  /**
   * Init the Generator and add some lsiteners
   * @return {void}
   */
  init(){
    /**
    * Event to generate the translation of the JSON file into CSV file
    * @event convertBtn-click
    */
    this.btnConverter.addEventListener('click', this.convertJsonToCsv.bind(this));
    /**
    * Event to copy the result of the csv file into the clipboard
    * @event resultArea-click
    */
    this.csvTextArea.addEventListener('click', this.copyIntoClipboard.bind(this));
  },


  /**
   * Convert the JSON text into an array of properties and items
   * @method
   * @fires convertBtn-click
   * @return {void}
   */
  convertJsonToCsv(){
    const jsonText = this.jsonTextArea.value;
    // convert string into Json
    const json = JSON.parse(jsonText);
    const jsonList = json.length ? json : [json];
    const [properties, items] = getCsvLists(jsonList);

    this.renderOutput(properties, items);
    this.outputOption.addEventListener('click', this.renderOutput.bind(this,properties, items));
  },


  /**
   * Render the information input in the arrays into a csv format, it coould be in a table way or  just the csv text format
   * @param {Array<String>} properties List of properties of the json file
   * @param {Array<String[]>} items  List of the values of each item according to the properties list
   * @returns {void}
   */
  renderOutput(properties, items){
    this.outputPlace.innerHTML = '';
    if(this.outputOption.checked) {
      const table = this.renderTable(properties, items);
      this.outputPlace.appendChild(table);
      return;
    }

    this.csvTextArea.textContent = properties.join(',') + '\r\n';
    this.csvTextArea.textContent += items.join('\r\n');
    this.outputPlace.appendChild(this.csvTextArea);
  },

  /**
  * Copy into the clipboard the csv text result
  *
  * @method
  * @fires resultArea-click
  * @return {void}
  */
  copyIntoClipboard(){
    const textToCopy = this.csvTextArea.textContent;
    if(!textToCopy) return;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        // librarie to say alerts or say errors
        alert('Your Csv information has been copied 🙂');
      })
      .catch((err) => console.log(err));
  },

  /**
   * Render the rows of the table of the csv information
   * @param {Array<String[]>} data The data of each row
   * @returns {String} Each row in a HTML div but all in one and single string
  */
  renderRows(data){
    const rows = [];
    for(let j = 0; j < data.length; j +=1){
      rows.push(`
        <div class="table__row">
          ${this.renderCells(data[j])}
        </div>
      `);
    }
    return rows.join('');
  },

  /**
   * Render the cells of the table of the csv information
   * @param {Array<String>} data The data of each cell
   * @returns {String} Each cell in a HTML div but all in one and single string
  */
  renderCells(data) {
    const cells = [];
    for(let i = 0; i < data.length; i+=1){
      cells.push(`
        <span class="table__cell">
          ${data[i]}
        </span>
      `);
    }
    return cells.join('');
  },

  /**
   * Render the table of the csv information
   * @param {Array<String>} headerData The array of teh properties
   * @param {Array<String[]>} contentData The array of array of the items
   * @returns {HTMLElement} The table representation of the csv data
  */
  renderTable(headerData, contentData){
    const table = document.createElement('div');
    table.classList.add('generator__table');
    table.innerHTML = `
      <div class="table__header">
        ${this.renderCells(headerData)}
      </div>

      <div class="table__content">
        ${this.renderRows(contentData)}
      </div>
    `;
    return table;
  }
};


// prubes


/*
  => level 1
 [
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz"
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv"
  }
]

   =>level2
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    }
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv",
    "address": {
      "street": "Victor Plains",
      "suite": "Suite 879",
      "city": "Wisokyburgh",
      "zipcode": "90566-7771",
      "geo": {
        "lat": "-43.9509",
        "lng": "-34.4618"
      }
    }
  }
]

*/
