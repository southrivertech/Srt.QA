/**
* @description
* The getDomainSettingsApiRequest command is used to get the domain settings
*
* @parameters
* @param {required} bearerToken
*
* @example
* cy.getDomainSettingsApiRequest(bearerToken)
*/

Cypress.Commands.add('getDomainSettingsApiRequest', (token) => {
  Cypress.log({
    name: 'getDomainSettingsApiRequest'
  })

  cy.api({
    method: 'GET',
    url: `${Cypress.env('apiBaseUrl')}/api/Domain/ed2ecaec-33a3-4ea3-b0e5-a70453775b9b`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(($response) => {
    console.log('response of getDomainSettingsApiRequest', $response)
    expect($response.status).to.eq(200)
    return $response.body
  })
})
