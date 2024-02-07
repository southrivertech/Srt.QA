/**
* @description
* The postLogoutAuthenticateApiRequest command is used to logout through API
*
* @parameters
* @param {required} username
* @param {required} password
* @param {required} bearerToken
*
* @example
* cy.postLogoutAuthenticateApiRequest({
*   username: 'usernameValue',
*   password: 'passwordValue',
*   bearerToken: 'tokenValue'
* })
*/

Cypress.Commands.add('postLogoutAuthenticateApiRequest', (opts) => {
  Cypress.log({
    name: 'postLogoutAuthenticateApiRequest'
  })

  cy.api({
    method: 'POST',
    url: `${Cypress.env('apiBaseUrl')}/api/Authenticate/Logout?bearerToken=${opts.bearerToken}`
  }).then(($response) => {
    console.log('response of postLogoutAuthenticateApiRequest', $response)
    expect($response.status).to.eq(200)
    // expect($response.body.Response.AuthInfo.IsAdmin).to.equal(true)
    return $response.body
  })
})
