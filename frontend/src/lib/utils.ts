import axios from 'axios'

export const server = axios.create({
  // .. congigure axios baseURL
  baseURL: 'http://dozer-be.68.183.85.136.nip.io/',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const dozerRest = axios.create({
  baseURL: 'http://dozer.68.183.85.136.nip.io',
  headers: {
    'Content-Type': 'application/json'
  }
 
})

export const randomIntFromInterval = function(min, max) { 
  return Math.floor(Math.random() * (max - min + 1) + min)
}



