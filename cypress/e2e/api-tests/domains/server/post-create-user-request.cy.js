/**
 * @description
 * This spec file contains test to create a new user and delete a user
 *
 * @assertions
 * To verify that a new can be vcreated and deleted
 *
 *  @prerequisites
 * valid user credentials
 * - user should have valid credentials
 */

describe('create new user', () => {
  const createUserDetails = {
    UserName: `qa-auto user ${Cypress.dayjs().format('ssmmhhMMYY')}`,
    Password: 'testing123'
  }
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }
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

  it('verify that a new user can be created', () => {
    cy.postCreateUserRequest(createUserDetails, bearerToken).then(($response) => {
      // Check if response type is ApiUserParamsPoco
      expect($response.ResponseType).to.equal('ApiUserParamsPoco')
      // Check if ErrorStr is success
      expect($response.Result.ErrorStr).to.equal('Success')
      // Check if ErrorCode is 0
      expect($response.Result.ErrorCode).to.equal(0)
    })
  })
  afterEach('verify that user can be deleted', () => {
    cy.deleteUserRequest(bearerToken).then(($response) => { // check if ErrorCode is 0
      expect($response.Result.ErrorCode).to.eq(0)
      // check if ErrorStr is Success
      expect($response.Result.ErrorStr).to.eq('Success')
    })
  })
})
