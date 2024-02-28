/**
* @description
* The postCreateServerApiRequest command is used to create a server
*
* @parameters
* @param {required} bearerToken
*
* @example
* cy.postCreateServerApiRequest(bearerToken)
*/

Cypress.Commands.add('postCreateServerApiRequest', (serverDetails) => {
  Cypress.log({
    name: 'postCreateServerApiRequest'
  })

  cy.api({
    method: 'POST',
    url: `${Cypress.env('apiBaseUrl')}/api/Servers/Create`,
    headers: {
      Authorization: `Bearer ${serverDetails.bearerToken}`
    },
    body: {
      serverName: serverDetails.serverName
    }
  }).then(($response) => {
    console.log('response of postCreateServerApiRequest', $response)
    expect($response.status).to.eq(200)
    return $response.body
  })
})
