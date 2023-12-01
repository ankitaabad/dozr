import axios from 'axios'

const server = axios.create({
  // .. congigure axios baseURL
  baseURL: 'http://dozer-be.68.183.85.136.nip.io/',
  headers: {
    'Content-Type': 'application/json'
  }
});

const dozerRest = axios.create({
  baseURL: 'http://dozer.68.183.85.136.nip.io',
  headers: {
    'Content-Type': 'application/json'
  }
 
})





export {
  server,
  dozerRest
}