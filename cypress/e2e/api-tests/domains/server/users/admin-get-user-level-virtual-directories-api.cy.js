import label from '../../../../../fixtures/label.json'

/**
 * @description
 * This spec file contains test to ensure admin can get list of servers through API
 *
 * @assertions
 * To verify that admin can get the list of servers through API
 *
 *  @prerequisites
 * valid user credentials
 * - user should have valid credentials
 */

describe('GET /api/Servers', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }
  const userDetails = {
    username: 'test123'
  }
  const serverDetails = {
    serverName: label.autoServerName
  }

  beforeEach('login through api', () => {
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
      // initializing bearer token
      serverDetails.bearerToken = $response.Response.SessionInfo.BearerToken
    })
  })

  it('verify that admin can get the list of servers through API', () => {
    cy.getUsersVirtualDirectoriesApiRequest(serverDetails, userDetails).then(($response) => {
      // Check if response type is api virtual directory folder response
      expect($response.ResponseType).to.equal('ApiVirtualFolderResponse')
      // check if ErrorStr is Success
      expect($response.Result.ErrorStr).to.equal('Success')
      // Check if virtual folder id  exist in virtual directory list or not
      const VirtualFolders = $response.Response.VirtualFolderList.map(VirtualFolders => label.Id in VirtualFolders)
      expect(VirtualFolders).to.include(true)
    })
  })

  afterEach('logout through API', () => {
    // calling logout function
    cy.postLogoutAuthenticateApiRequest(serverDetails.bearerToken).then(($response) => {
      // check if request is successful or not
      expect($response.Result.ErrorStr).to.equal('Success')
    })
  })
})
