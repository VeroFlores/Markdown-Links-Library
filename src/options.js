const axios = require('axios');
const {
  getLinksInFiles,
} = require('./util');

// const note = 'C:/Users/PC USER/Desktop/LABORATORIA/MD-LINKS/LIM013-fe-md-links/prueba';
// const prueba = axios.get('https://nodejs.org')
//   .then((response) => {
//     const obj = {
//       status: response.status,
//       text: response.statusText,
//     };
//     return obj;
//   });
// prueba.then((res) => {
//   console.log(res);
// });
// console.log(prueba);
const linkValidate = (url, arrObj) => new Promise((resolve) => axios(url)
  .then((response) => resolve({
    ...arrObj,
    status: response.status,
    statusText: response.statusText,
  }))
  .catch(() => resolve({ ...arrObj, status: 404, statusText: 'FAIL' })));

const checkLinks = (newPath) => {
  const arrValidateLinks = [];
  const arrLink = getLinksInFiles(newPath);
  arrLink.forEach((el) => {
    arrValidateLinks.push(linkValidate(el.href, el));
  });
  return Promise.all(arrValidateLinks);
};
// var obj = {first_name: "Jhon Doe"}
// var ruta="first_name"
// nombre = obj[ruta]
// console.log(nombre);
// const statsLinks = (arrPromises) => new Promise((resolve, reject) => {
//   arrPromises.then((result) => {
//     const links = [];
//     result.map((obj) => links.push(obj.href));
//     const total = links.length;
//     const unique = [...new Set(links)].length;
//     const broken = result.filter((obj) => obj.statusText === 'FAIL').length;
//     resolve(`✔ Total : ${total}\n✔ Unique : ${unique}\n✔ Broken : ${broken}`);
//   });
// });
// statsLinks(checkLinks(note)).then((result) => {
//   console.log(result);
// });
const statsLinks = (arr) => {
  const links = [];
  arr.map((arrObj) => links.push(arrObj.href));
  const total = links.length;
  const unique = [...new Set(links)].length;
  return `✔ Total : ${total}\n✔ Unique : ${unique}`;
};
const statsValidate = (arr) => {
  const broken = arr.filter((obj) => obj.statusText === 'FAIL').length;
  return `✔ Broken : ${broken}`;
};
module.exports = {
  checkLinks,
  statsLinks,
  statsValidate,
};
