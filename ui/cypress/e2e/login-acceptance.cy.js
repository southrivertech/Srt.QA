import loginSelectors from '../../selectors/login-selectors.json'

describe('Login Functionality Test', () => {
  const adminData = Cypress.env('admin')
  // These should come from secrets, I need admin permissions for that
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }
  const loginText = 'Login'
  const homeUrlText = '/Console'

  beforeEach(() => {
    cy.intercept('GET', '**WebApi/Login**').as('getApiLogin')
    cy.visit(adminData.adminBaseUrl)
  })

  it('verify that admin user can login successfully with correct credentials', () => {
    cy.get(loginSelectors.inputUsername).type(userInfo.username)
    cy.get(loginSelectors.inputPassword).type(userInfo.password)
    cy.get(loginSelectors.loginButton).contains(loginText).click()
    cy.wait('@getApiLogin', 200)
    cy.url().should('include', homeUrlText)
  })
})
