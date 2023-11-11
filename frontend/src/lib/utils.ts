import axios from 'axios'
const baseURL = 'http://0.0.0.0:2345'
const server = axios.create({
  // .. congigure axios baseURL
  baseURL: `${baseURL}`
});

export {
  server
}