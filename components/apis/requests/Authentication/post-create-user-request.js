/**
* @description
* The postCreateUserRequest command is used to create a new user
*
* @parameters
* @param {required} username
* @param {required} password
*
* @example
* cy.postLogoutAuthenticateApiRequest({
*   username: 'usernameValue',
*   password: 'passwordValue',
* })
*/

Cypress.Commands.add('postCreateUserRequest', (opts, token) => {
  Cypress.log({
    name: 'postCreateUserRequest'
  })

  cy.api({
    method: 'POST',
    url: `${Cypress.env('apiBaseUrl')}/api/Servers/qa acceptance server do not delete/AuthConnectors/native/Users`,
    body: {
      UserName: opts.username,
      PassWord: opts.password
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(($response) => {
    console.log('response of postCreateUserRequest', $response)
    expect($response.status).to.eq(200)
    return $response.body
  })
})
