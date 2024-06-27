/**
* @description
* The updateCloudFolderSettingsApiRequest command is used to get the list of Cloud Folders at server level through Api
*
* @parameters
* @param {required} bearerToken
* @param {required} serverName
*
* @example
* cy.updateCloudFolderSettingsApiRequest(serverDetails)
*/

Cypress.Commands.add('updateCloudFolderSettingsApiRequest', (serverDetails, CloudFolder) => {
  Cypress.log({
    name: 'updateCloudFolderSettingsApiRequest'
  })

  cy.api({
    method: 'PATCH',
    url: `${Cypress.env('apiBaseUrl')}/api/Servers/${serverDetails.serverName}/CloudFolders`,
    headers: {
      Authorization: `Bearer ${serverDetails.bearerToken}`
    },
    body: {
      CloudFolderList: [
        {
          CloudGUID: CloudFolder.cloudGUID,
          CloudName: CloudFolder.cloudName
        }
      ]
    }

  }).then(($response) => {
    console.log('response of updateCloudFolderSettingsApiRequest', $response)
    expect($response.status).to.eq(200)
    return $response.body
  })
})
