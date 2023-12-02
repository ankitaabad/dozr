const { DateTime } = require('luxon');
const loans = [
	{
		loan_id: 'EQXY11420859281243',
		customer_id: 1069,
		loan_type: 'Auto Loan',
		loan_amount: 13033336,
		interest_rate: 10.390000343322754,
		loan_status: 'Rejected',
		EMI: 34980,
		loan_term: 16,
		repayment_schedule: '6th of every Month',
		disbursement_date: '2021-12-29',
		__dozer_record_id: 1565,
		__dozer_record_version: 1
	}
];
let loansToPay= [];
let x = loans.forEach((l) => {
	const today = DateTime.now();
	if (
		today.toSQLDate() <=
		DateTime.fromSQL(l.disbursement_date).plus({ years: l.loan_term }).toSQLDate()
	) {
		loansToPay.push(l);
	} 
	return l.disbursement_date;
});

console.log(loansToPay)
