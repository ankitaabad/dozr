# Trade Go (by Twin Titans)
`Imp : There are still some things that needs to be done, it is just an early submissoin for review. `

- Go To [Trade go](http://dozer-fe.68.183.85.136.nip.io/) to try the app.

- We have created a realtime analytics app.

- for eg When you sell a share, it adds an entry in recent transactions, updates balance, reduces your share holding, also reduces your investment value and  may also change the top investors in manager tab.

- Updates go to database through Golang server and the data chanages are conveyed to dozer where it incrementally computes analytics. 

- All reads in the app are performed from dozer and not through database directly. ( can be checked though network tab)

- We have made significant changes in the schema. [check here](db-schema.png)

- [for more info read ppt](growth-genie.pdf)


## Code 
- [FrontEnd](frontend)
- [Backend](backend)
- [Data Generation](csv) : data was scraped using webscrapper io and then some scripts were used to generate data.
- [Dozer](dozer)
- [cron](node-cron)
