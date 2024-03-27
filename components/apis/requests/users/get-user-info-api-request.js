/**
* @description
* The getUserInfoApiRequest command is used to get information about users in a Group thorough API
*
* @parameters
* @param {required} bearerToken
* @param {required} UserName
*
* @example
* cy.getUserInfoApiRequest({
*   bearerToken: 'bearerTokenValue',
*  UserName: 'UserNameValue',
* })
*/

Cypress.Commands.add('getUserInfoApiRequest', (userDetails) => {
  Cypress.log({
    name: 'getUserInfoApiRequest'
  })

  cy.api({
    method: 'GET',
    url: `${Cypress.env('apiBaseUrl')}/api/Servers/${userDetails.serverName}/AuthConnectors/native/Users/${userDetails.username}?byUserName=true`,
    headers: {
      Authorization: `Bearer ${userDetails.bearerToken}`
    }
  }).then(($response) => {
    console.log('response of getUserInfoApiRequest', $response)
    expect($response.status).to.eq(200)
    return $response.body
  })
})
