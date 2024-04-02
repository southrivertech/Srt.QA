/**
* @description
* The updateGroupInfoApiRequest command is used to get list of existing groups thorough API
*
* @parameters
* @param {required} bearerToken
*
* @example
* cy.updateGroupInfoApiRequest({
*   bearerToken: 'bearerTokenValue',
*   GroupName: 'GroupNameValue',
* })
*/

Cypress.Commands.add('updateGroupInfoApiRequest', (groupDetails, serverDetails) => {
  Cypress.log({
    name: 'updateGroupInfoApiRequest'
  })

  cy.api({
    method: 'PATCH',
    url: `${Cypress.env('apiBaseUrl')}/api/servers/${serverDetails.serverName}/AuthConnectors/native/Groups/${groupDetails.groupName}?byGroupName=true`,
    headers: {
      Authorization: `Bearer ${groupDetails.bearerToken}`
    },
    body: {
      GroupGUID: groupDetails.GroupGUID,
      AuthGUID: groupDetails.AuthGUID,
      GroupName: groupDetails.updatedGroupName,
      GeneralParams: {
        GroupDesc: '',
        GroupHomeDirEnabled: 0,
        GroupHomeDir: ''
      },
      MemberUsers: {}
    }
  }).then(($response) => {
    console.log('response of updateGroupInfoApiRequest', $response)
    expect($response.status).to.eq(200)
    return $response.body
  })
})
