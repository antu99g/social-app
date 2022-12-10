export * from './constants';

export const setItemInLocalStorage = (key, value) => {
   if(!key || !value){
      return console.error('Can not store in local storage');
   }

   let valueToStore = typeof(value) !== "string" ? JSON.stringify(value) : value;

   localStorage.setItem(key, valueToStore);
}


export const getItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error('Can not get the value from local storage');
  }

  return localStorage.getItem(key);
};


export const removeItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error('Can not get the value from local storage');
  }

  localStorage.removeItem(key);
};



export const getFormBody = (params) => {
   let formBody = [];

   for(let property in params){
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(params[property]);

      formBody.push(encodedKey + '=' + encodedValue);
   }

   return formBody.join('&');
}