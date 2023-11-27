import axios from 'axios'
const baseURL = 'http://dozer-be.68.183.85.136.nip.io/'
const server = axios.create({
  // .. congigure axios baseURL
  baseURL: `${baseURL}`
});

export {
  server
}