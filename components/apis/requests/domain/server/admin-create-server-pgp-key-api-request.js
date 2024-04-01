/**
* @description
* The postCreateServerPGPKey command is used to create a new PGP key through API
*
* @parameters
* @param {required} bearerToken
* @param {required} KeyType
* @param {required} keyName
* @param {required} KeyAlg
* @param {required} KeyLen
*
* @example
* cy.postCreateServerPGPKey({
*   bearerToken: 'bearerTokenValue',
*   KeyType: KeyTypeValue,
*   Name: keyNameValue,
*   KeyAlg: KeyAlgValue,
*   KeyLen: KeyLenValue
* })
*/

Cypress.Commands.add('postCreateServerPGPKey', (opts, serverDetails, keyLen) => {
  Cypress.log({
    name: 'postCreateServerPGPKey'
  })

  cy.api({
    method: 'POST',
    url: `${Cypress.env('apiBaseUrl')}/api/servers/${serverDetails.serverName}/PgpKeys`,
    body: {
      Document: {
        KeyType: opts.KeyType,
        Name: opts.keyName,
        KeyAlg: opts.KeyAlg,
        KeyLen: keyLen
      }
    },
    headers: {
      Authorization: `Bearer ${serverDetails.bearerToken}`
    }
  }).then(($response) => {
    console.log('response of postCreateServerPGPKey', $response)
    expect($response.status).to.eq(200)
    return $response.body
  })
})
