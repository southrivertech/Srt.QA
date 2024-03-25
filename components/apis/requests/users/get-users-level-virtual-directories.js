import label from '../../../../cypress/fixtures/label.json'
/**
* @description
* The getUsersVirtualDirectoriesApiRequest command is used to get the list of banned IPs
*
* @parameters
* @param {required} bearerToken
*
* @example
* cy.getUsersVirtualDirectoriesApiRequest(bearerToken)
*/

Cypress.Commands.add('getUsersVirtualDirectoriesApiRequest', (serverDetails, userDetails) => {
  Cypress.log({
    name: 'getUsersVirtualDirectoriesApiRequest'
  })

  cy.api({
    method: 'GET',
    url: `${Cypress.env('apiBaseUrl')}/api/Servers/${serverDetails.serverName}/AuthConnectors/${label.usersNATIVETab}/Users/${userDetails.username}/VirtualFolders`,
    headers: {
      Authorization: `Bearer ${serverDetails.bearerToken}`
    }
  }).then(($response) => {
    console.log('response of getUsersVirtualDirectoriesApiRequest', $response)
    expect($response.status).to.eq(200)
    return $response.body
  })
})
