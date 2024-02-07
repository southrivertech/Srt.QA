/**
 * @description
 * This spec file contains test to verify that admin can logout through API
 *
 * @assertions
 * To verify that admin can logout through API
 *
 *  @prerequisites
 * valid user credentials
 * - user should have valid credentials
 */

describe('admin logout functionality', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }

  it('verify that admin is able to logout through API', () => {
    cy.postLoginAuthenticateApiRequest(userInfo).then(($response) => {
      // Check if BearerToken exists in SessionInfo
      expect($response.Response.SessionInfo.BearerToken).to.exist
      // Check if BearerToken is not empty
      expect($response.Response.SessionInfo.BearerToken).to.not.be.empty
      // initializing bearer Token
      userInfo.bearerToken = $response.Response.SessionInfo.BearerToken
      // calling logout function
      cy.postLogoutAuthenticateApiRequest(userInfo).then(($response) => {
        // check if request is successful or not bearer Token
        expect($response.Result.ErrorStr).to.equal('Success')
      })
    })
  })
})
