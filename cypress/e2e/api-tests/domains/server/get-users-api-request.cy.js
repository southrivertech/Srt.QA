/**
 *@description
* this spec file contains tests to get list of users
*
*@requirements
*user should login with valid credentials
*
*@example
*cy.GetUsersApiRequest(bearertoken)
*/

describe('get user request', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }
  // eslint-disable-next-line no-unused-vars
  let bearerToken = null
  beforeEach('verify that admin is able to login through API', () => {
    cy.postLoginAuthenticateApiRequest(userInfo).then(($response) => {
      // Check if response type is api auth response
      expect($response.ResponseType).to.equal('ApiAuthResponse')
      // Check if ErrorStr is success
      expect($response.Result.ErrorStr).to.equal('Success')
      // Check if IsAdmin is true
      expect($response.Response.AuthInfo.IsAdmin).to.equal(true)
      // Check if BearerToken exists in SessionInfo
      expect($response.Response.SessionInfo.BearerToken).to.exist
      // Check if BearerToken is not empty
      expect($response.Response.SessionInfo.BearerToken).to.not.be.empty

      bearerToken = $response.Response.SessionInfo.BearerToken
    })
  })
  it('get user  api request', () => {
    cy.GetUsersApiRequest(bearerToken).then(($response) => {
      console.log($response)
      // check if Responsetype is ApiServerListResponse
      expect($response.ResponseType).to.equal('ApiServerListResponse')
      // check if ErrorStr is equal to Success
      expect($response.body.Response.Result.ErrorStr).to.eq('Success')
      // chek if response status is 200
      expect($response.status).to.eq(200)
    })
  })
})
