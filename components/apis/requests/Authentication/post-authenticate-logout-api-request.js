/**
* @description
* The postAddProductsApiRequest command is used to add product to an invoice
*
* @parameters
* @param {required} location
* @param {required} invoiceID
*
* @example
* cy.postAddProductsApiRequest({
*   location: locations.stripePayments,
*   invoiceID: $body.id
* })
*/

Cypress.Commands.add('postAddProductsApiRequest', (opts) => {
    Cypress.log({
      name: 'postAddProductsApiRequest'
    })
  
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiBaseUrl')}/invoices/${opts.invoiceID}/products`,
      headers: {
        'X-Atelier35-Api-Key': Cypress.env('apiKey'),
        'X-Atelier35-Account-Id': opts.location.accountId,
        'X-Atelier35-User-Id': opts.location.userId
      },
      body: {
        measure: '1',
        additionalMeasure: '0',
        productId: opts.location.productId,
        status: 'active',
        billingMethod: 'one-time'
      }
    }).then(($response) => {
      console.log('response of postAddProductsApiRequest', $response)
      expect($response.status).to.eq(201)
      expect($response.body.data[0].attributes.itemObject.id).to.equal(opts.location.productId)
      return $response.body
    })
  })
  