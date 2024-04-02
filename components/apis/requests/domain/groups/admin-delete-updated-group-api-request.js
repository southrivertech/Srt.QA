/**
* @description
* The deleteUpdatedGroupApiRequest command is used to delete an updated Group through API
*
* @parameters
* @param {required} bearerToken
* @param {required} groupName
*
* @example
* cy.deleteUpdatedGroupApiRequest({
*   bearerToken: 'bearerTokenValue',
*   GroupName: 'groupNameValue',
* })
*/

Cypress.Commands.add('deleteUpdatedGroupApiRequest', (groupDetails, serverDetails) => {
  Cypress.log({
    name: 'deleteUpdatedGroupApiRequest'
  })

  cy.api({
    method: 'DELETE',
    url: `${Cypress.env('apiBaseUrl')}/api/servers/${serverDetails.serverName}/AuthConnectors/native/Groups/${groupDetails.updatedGroupName}`,
    body: {
      groupName: groupDetails.groupName
    },
    headers: {
      Authorization: `Bearer ${groupDetails.bearerToken}`
    }
  }).then(($response) => {
    console.log('response of deleteUpdatedGroupApiRequest', $response)
    expect($response.status).to.eq(200)
    return $response.body
  })
})
