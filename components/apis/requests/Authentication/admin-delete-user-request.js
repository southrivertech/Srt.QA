/**
* @description
* The deleteUserRequest command is used to delete a user
*
* @parameters
* @param {required} UserName
* @param {required} Password
*
* @example
* cy.deleteUserRequest({
*   username: 'usernameValue',
*   password: 'passwordValue',
* })
*/

Cypress.Commands.add('deleteUserRequest', (token) => {
  Cypress.log({
    name: 'deleteUserRequest'
  })
  const createUserDetails = {
    UserName: `qa-auto user ${Cypress.dayjs().format('ssmmhhMMYY')}`,
    Password: 'testing123'
  }
  const value = true
  cy.api({
    method: 'DELETE',
    url: `${Cypress.env('apiBaseUrl')}/api/Servers/qa acceptance server do not delete/AuthConnectors/native/Users/${createUserDetails.UserName}?byUserName=${value}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(($response) => {
    expect($response.status).to.eq(200)
    return $response.body
  })
})
