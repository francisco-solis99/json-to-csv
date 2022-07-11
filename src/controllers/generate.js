import Generate from '../views/generate/generate.html?raw';
import '../views/generate/generate.css';


export default () => {
  const divWrapper = document.createElement('div');
  divWrapper.innerHTML = Generate;

  // logic of this view
  const generator = new Generator(divWrapper);
  generator.init();
  return divWrapper;
};

function Generator(htmlContent) {
  this.htmlContent = htmlContent;
  this.btnConverter = htmlContent.querySelector('.generate__button');
  [this.jsonTextArea, this.csvTextArea] = htmlContent.querySelectorAll('.generate__textarea');
}

Generator.prototype = {
  constructor: Generator,

  init(){
    // listener to generate the translation
    this.btnConverter.addEventListener('click', this.convertJsonToCsv.bind(this));
    // listener to copy the result into the clipboard
    this.csvTextArea.addEventListener('click', this.copyIntoClipboard.bind(this));
  },

  convertJsonToCsv(){
    const jsonText = this.jsonTextArea.value;
    // convert string into Json
    const json = JSON.parse(jsonText);
    const jsonList = json.length ? json : [json];
    const [properties, items] = this.generateLists(jsonList);

    this.csvTextArea.textContent = properties.join(',') + '\r\n';
    this.csvTextArea.textContent += items.join('\r\n');

  },

  generateLists(jsonList){
    const properties = [];
    const items = [];

    jsonList.forEach(json => {
      this.fillLists(json, properties, items);
    });
    const itemsNormalized = items.map(item =>{
      const lengthDifference = properties.length - item.length;
      if(!lengthDifference) return item;
      const arr = Array(lengthDifference).fill('');
      return [item, arr];
    });
    return [properties, itemsNormalized];
  },

  fillLists(obj, listProps, listItems){
    const item = [];
    const fillData = ([key, value]) => {
      if(typeof value === 'object'){
        return Object.entries(value).forEach(fillData);
      }
      item.push(value);
      if(!listProps.includes(key)) listProps.push(key);
      return;

    };
    Object.entries(obj).forEach(fillData);
    listItems.push(item);
  },

  copyIntoClipboard(){
    const textToCopy = this.csvTextArea.textContent;
    if(!textToCopy) return;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        // librarie to say alerts or say errors
        alert('Your Csv information has been copied 🙂');
      })
      .catch((err) => console.log(err));
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
