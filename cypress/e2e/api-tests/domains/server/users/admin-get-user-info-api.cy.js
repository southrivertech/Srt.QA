import label from '../../../../../fixtures/label.json'
/**
 * @description
 * This spec file contains test to verify if new user exists in Everyone User
 *
 * @assertions
 * To verify that admin can get Everyone  User info through API
 *
 *  @prerequisites
 * valid user credentials
 * - user should have valid credentials
 */

describe('get User information', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }
  const userDetails = {
    username: `qa-auto-user-${Cypress.dayjs().format('ssmmhhMMYY')}`,
    password: 'testing123',
    serverName: label.ApiTestingAutomation
  }
  const groupDetails = {
    groupGUID: 'db2112ad-feed-0004-0000-000000000000'
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
      userDetails.bearerToken = $response.Response.SessionInfo.BearerToken
    })

    // creating a new user
    cy.postCreateUserApiRequest(userDetails).then(($response) => {
    // Check if response type is ApiUserParamsPoco
      expect($response.ResponseType).to.equal('ApiUserParamsPoco')
      // Check if newly created user is present in response
      expect($response.Response.Username).to.equal(userDetails.username)

      userDetails.userGUID = $response.Response.UserGUID
    })
  })

  it('verify that new user exist in Everyone User or not', () => {
    cy.getUserInfoApiRequest(userDetails).then(($response) => {
      // Check if response type is ApiUserParamsPoco
      expect($response.ResponseType).to.equal('ApiUserParamsPoco')
      // Check if new user  exist in Everyone User or not
      expect($response.Result.ErrorStr).to.equal('Success')

      expect($response.Response.Username).to.equal(userDetails.username)
      expect($response.Response.MemberGroups).to.include.keys(groupDetails.groupGUID)
    })
  })

  afterEach('delete User through API', () => {
    // calling delete user function
    cy.deleteUserApiRequest(userDetails.bearerToken, userDetails.serverName, userDetails.username).then(($response) => {
      // check if ErrorStr is Success
      expect($response.Result.ErrorStr).to.eq('Success')
    })
  })
})
