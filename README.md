## Crawler, Node API and Angular
The project is created using MEAN stack
### Directory structure:
- /api: Expressjs API
- /spider: Nodejs script to crawl the webpage
- /front-end-app: Single page app using Angular
### Crawl web page
Crawl the web page and store to MongoDB clients collection.
- ```grunt spider``` or ```npm run spider```
### Setup the API server
- npm install
- npm start
### API end points
URL | Method | Description | body
--- | --- | --- | ---
/clients | GET | List all clients
/clients/:id | GET | List client by ID
/clients | POST | Add new client | {"name":"name","email":"mymail@gmail.com","phone":"+91 9856321458","company":"Company","zip":"789654"}
/clients/:id | PUT | Edit the client | {"name":"name","email":"mymail@gmail.com","phone":"+91 9856321458","company":"Company","zip":"789654"}
/clients/:id | DELETE | Delete the client record from DB
/clients?q=name | GET | Sarch term in DB
### Setup Frontend application
- cd front-end-app
- npm install
- npm start
