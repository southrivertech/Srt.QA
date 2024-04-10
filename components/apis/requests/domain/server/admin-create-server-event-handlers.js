/**
* @description
* The postCreateServerEventsApiRequest command is used to create a server level event
*
* @parameters
* @param {required} bearerToken
*
* @example
* cy.postCreateServerEventsApiRequest(serverDetails, Eventname)
*/

Cypress.Commands.add('postCreateServerEventsApiRequest', (serverDetails, Eventname) => {
  Cypress.log({
    name: 'postCreateServerEventsApiRequest'
  })

  cy.api({
    method: 'POST',
    url: `${Cypress.env('apiBaseUrl')}/api/Servers/${serverDetails.serverName}/Events`,
    headers: {
      Authorization: `Bearer ${serverDetails.bearerToken}`
    },
    body: {
      ECAData: {
        Name: Eventname
      }
    }
  }).then(($response) => {
    console.log('response of postCreateServerEventsApiRequest', $response)
    expect($response.status).to.eq(200)
    return $response.body
  })
})
