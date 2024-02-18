/**
* @description
* The getDomainInfoApiRequest command is used to get the domain settings
*
* @parameters
* @param {required} bearerToken
*
* @example
* cy.getDomainInfoApiRequest(bearerToken)
*/

Cypress.Commands.add('getDomainInfoApiRequest', (token) => {
  Cypress.log({
    name: 'getDomainInfoApiRequest'
  })

  cy.api({
    method: 'GET',
    url: `${Cypress.env('apiBaseUrl')}/api/Domain/ed2ecaec-33a3-4ea3-b0e5-a70453775b9b/info`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(($response) => {
    console.log('response of getDomainInfoApiRequest', $response)
    expect($response.status).to.eq(200)
    return $response.body
  })
})
