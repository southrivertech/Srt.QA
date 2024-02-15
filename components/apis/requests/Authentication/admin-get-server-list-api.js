/**
 *@description
* this file contains to get list of users
*
*@prerequisites
*user should login with valid credentials
*
*@requirements
* bearertoken
*
*@example
*cy.GetUsersApiRequest(AuthToken)
*/

Cypress.Commands.add('GetUsersApiRequest', function (bearerToken) {
  Cypress.log({
    name: 'GetUsersApiRequest'
  })

  cy.api({
    method: 'GET',
    url: `${Cypress.env('apiBaseUrl')}/api/server`,
    headers: {
      Authoriazation: `Bearer ${bearerToken}`
    }

  }).then(($response) => {
    expect($response.status).to.eq(200)
    return $response.body
  })
})
