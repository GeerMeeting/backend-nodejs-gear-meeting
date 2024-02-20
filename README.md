# Backend Node.js Gear Meeting

### Endpoints

## Endpoints

The API exposes the following *endpoints* from the *BASE_URL*:*PORT* `http://localhost:8080`
BASE_URL and PORT could be used by .env

*PUBLIC ROUTE*

`/login`
  * `POST /logins - createLogin`

*PRIVATE ROUTES*

`/cars`
  * `GET /cars - listAllCars`
  * `GET /cars/:carId - findCarById`
  * `POST /cars - createCar`
  * `PUT /cars/:carId - updateCarById`
  * `DELETE /cars/:carId - deleteCarById`

`/drivers`
  * `GET /drivers - listAllDrivers`
  * `GET /drivers/:driverId - findDriverById`
  * `POST /drivers - createDriver`
  * `PUT /drivers/:driverId - updateDriverById`
  * `DELETE /drivers/:driverId - deleteDriverById`

`/logins`
  * `GET /logins - listLogins`
  * `GET /logins/:loginId - findLoginById`
  * `POST /logins - createLogin`
  * `PUT /logins/:loginId - updateLoginById`
  * `DELETE /logins/:loginId - deleteLoginById`

`/tickets`
  * `GET /tickets - listTickets`
  * `GET /tickets/:ticketId - findTicketById`
  * `POST /tickets - createTicket`
  * `PUT /tickets/:ticketId - updateTicketById`
  * `DELETE /tickets/:ticketId - deleteTicketById`

`/products`
  * `GET /products - listProducts`
  * `GET /products/:productId - findProductById`
  * `POST /products - createProduct`
  * `PUT /products/:productId - updateProductById`
  * `DELETE /products/:productId - deleteProductById`

`/stores`
  * `GET /stores - listStores`
  * `GET /stores/:storeId - findStoreById`
  * `POST /stores - createStore`
  * `PUT /stores/:storeId - updateStoreById`
  * `DELETE /stores/:storeId - deleteStoreById`