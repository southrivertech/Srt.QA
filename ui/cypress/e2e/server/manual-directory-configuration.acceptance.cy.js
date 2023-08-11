/**
 * @description
 * This spec file contains tests to ensure that user must provide the Manual directory configuration values before moving to the next page
 *
 * @file
 * ui/cypress/e2e/server/manual-directory-configuration.acceptance.cy.js
 *
 * @breadcrumb
 * - Login to the application
 * - Press the add-new button
 * - Select server and click next
 * - Select database
 * - Enter server information, select manually configure directory locations
 * - Remove all paths form the tabs
 * - Click next
 *
 * @assertions
 * - To verify that admin user cannot navigate to next without manually configuring the directory
 *
 * @prerequisites
 * Pre-Requisite data:
 * - user should have valid credentials
 */

describe('Manual directory Configuration Test', () => {
    const adminData = Cypress.env('admin')
    const userInfo = {
      username: adminData.adminUsername,
      password: adminData.adminPassword
    }
    const homeUrlText = '/Console'
  
  beforeEach(() => {
      cy.postApiLogin()
      cy.waitForNetworkIdlePrepare({
      method: 'POST',
      pattern: '**WebApi/Login**',
      alias: 'postApiLogin',
      log: false
      })
  })
  
  it('Verify that the user cannot navigate to the next page, until he/she configures directories manually', () => {
      
    //? Login as an admin with valid credentials
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
    cy.waitForNetworkIdle('@postApiLogin', 500).its('callCount').should('equal', 1)
    cy.url().should('include', homeUrlText)
    cy.waitApiResponseStatusCode('@postApiLogin', 200)

    //? Press the add new button
    cy.get('.MuiFab-label div').contains('Add New').click()

    //? Click next twice
    cy.get('.MuiButton-label').contains('Next').click()
    cy.get('.MuiButton-label').contains('Next').click()

    //? Enter Server Information
    cy.get('.MuiInputLabel-formControl').contains('Server Name').parent('div').within(() => {
    cy.get('input').type('server19')
    })

    //? Click on the Manually Configure Directory Locations checkbox
    cy.get('input[type=checkbox]').eq(1).click()

    //? Click next
    cy.get('.MuiButton-label').contains('Next').click()

    //? Clear all the texts inside the input areas
    cy.get('.MuiGrid-grid-xs-10').each(($outerContainer) => {
    cy.wrap($outerContainer).within(() => {
        // Navigate through the nested containers
        cy.get('.MuiTextField-root').within(() => {
        cy.get('.MuiInputBase-formControl').within(() => {
            // Clear the text from the input element within the innermost container
            cy.get('.MuiInputBase-input').clear();
        })
        })
    })
    })

    //? Click next  Manual Directory Configuration
    cy.get('.MuiButton-label').contains('Next').click()

    //? Check if the form contains page 4 or not
    cy.get('.MuiGrid-grid-xs-10')
    .find('.MuiInputBase-formControl')
    .get('.MuiInputBase-input').should('exist')
      
  })
  
})
  