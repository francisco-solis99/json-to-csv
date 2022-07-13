

export default function getCsvLists(jsonList){
    const properties = [];
    const items = [];

    jsonList.forEach(json => {
      fillCsvLists(json, properties, items);
    });
    const itemsNormalized = items.map(item =>{
      const lengthDifference = properties.length - item.length;
      if(!lengthDifference) return item;
      const arr = Array(lengthDifference).fill('');
      return [...item, ...arr];
    });
    return [properties, itemsNormalized];
}

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
