/**
* @description
* The getServerSessionsApiRequest command is used to get the Sessions info of servers through Api
*
* @parameters
* @param {required} bearerToken
*
* @example
* cy.getServerSessionsApiRequest(ServerDetails)
*/

Cypress.Commands.add('getServerSessionsApiRequest', (serverDetails) => {
  Cypress.log({
    name: 'getServerSessionsApiRequest'
  })

  cy.api({
    method: 'GET',
    url: `${Cypress.env('apiBaseUrl')}/api/Sessions/${serverDetails.serverName}`,
    headers: {
      Authorization: `Bearer ${serverDetails.bearerToken}`
    }
  }).then(($response) => {
    console.log('response of getServerSessionsApiRequest', $response)
    expect($response.status).to.eq(200)
    return $response.body
  })
})
