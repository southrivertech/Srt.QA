import loginSelectors from '../../selectors/login-selectors.json'
import dashboardSelectors from '../../selectors/dashboard-selectors.json'

describe('Login Functionality Test', () => {
  const adminData = Cypress.env('admin')
  // These should come from secrets, I need admin permissions for that
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }

  beforeEach(() => {
    cy.postApiLogin()
    cy.waitForNetworkIdlePrepare({
      method: 'POST',
      pattern: '**WebApi/Login**',
      alias: 'postApiLogin',
      log: false
    })
  })

  it('verify that admin user can login successfully with correct credentials', () => {
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
  })

  it('Click on the add new button', () => {
    cy.get('.Muifab-lable div').contains('Add New').click()
  })

})