/**
* @description
* The getGroupsInfoApiRequest command is used to get information about users in a Group thorough API
*
* @parameters
* @param {required} bearerToken
* @param {required} GroupsName
*
* @example
* cy.getGroupsInfoApiRequest({
*   bearerToken: 'bearerTokenValue',
*   GroupName: 'GroupNameValue',
* })
*/

Cypress.Commands.add('getGroupsInfoApiRequest', (userDetails, groupDetails) => {
  Cypress.log({
    name: 'getGroupsInfoApiRequest'
  })

  cy.api({
    method: 'GET',
    url: `${Cypress.env('apiBaseUrl')}/api/servers/${userDetails.serverName}/AuthConnectors/native/Groups/${groupDetails.groupName}?byGroupName=true`,
    headers: {
      Authorization: `Bearer ${userDetails.bearerToken}`
    }
  }).then(($response) => {
    console.log('response of getGroupsInfoApiRequest', $response)
    expect($response.status).to.eq(200)
    return $response.body
  })
})