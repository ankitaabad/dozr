import axios from 'axios'
import { DateTime } from 'luxon';

export const server = axios.create({
  // .. congigure axios baseURL
  baseURL: 'http://dozer-be.68.183.85.136.nip.io/',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const dozerRest = axios.create({
  baseURL: 'http://dozer.68.183.85.136.nip.io',
  // baseURL: 'http://0.0.0.0:8080',
  headers: {
    'Content-Type': 'application/json'
  }
 
})


export const randomIntFromInterval = function(min, max) { 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const payableLoans = (loans) => {
  const today = DateTime.now()
  return loans.filter(	(l)=>	today.toSQLDate() <=
  DateTime.fromSQL(l.disbursement_date).plus({ years: l.loan_term }).toSQLDate())
}



