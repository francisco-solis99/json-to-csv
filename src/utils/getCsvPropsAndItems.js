/**
 * UtilToCsv
 * @module utilJsonToCsv
 */

/**
 * Get the list of properties and the list of the items in the JSON file passed as a parameter
 * @param {Array<JSON>} jsonList
 * @returns {Array<Array>} the properties and the items of the Json file in a single array
 */
export default function getCsvLists(jsonList){
    const properties = [];
    const items = [];

    jsonList.forEach(json => {
      fillCsvLists(json, properties, items);
    });
    // normalized the items (make some empty string for the properties that item does not have)
    const itemsNormalized = items.map(item =>{
      const lengthDifference = properties.length - item.length;
      if(!lengthDifference) return item;
      const arr = Array(lengthDifference).fill('');
      return [...item, ...arr];
    });
    return [properties, itemsNormalized];
}

/**
 * Fill the properties and items lists using recursivity
 * @param {Object} obj The first object
 * @param {Array} listProps
 * @param {Array} listItems
 * @returns {void}
 */
function fillCsvLists(obj, listProps, listItems){
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
}
