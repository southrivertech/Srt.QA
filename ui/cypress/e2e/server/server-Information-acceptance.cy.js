/**
 * @description
 * This spec file contains tests to verify that server information is not removed when user navigates back from services to database
 *
 * @file
 * ui/cypress/e2e/server/server-Information-acceptance.cy.js
 *
 * @breadcrumb
 * - Login to the application
 * - Press the add-new button
 * - Select server and click next
 * - Select database
 * - Enter server information, click next
 * - Click back
 * - Click next
 *
 * @assertions
 * - To verify that server information is not removed when user navigates back from services to database
 *
 * @prerequisites
 * Pre-Requisite data:
 * - user should have valid credentials
 */
describe('Server Information Preservation Test', () => {
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

    it('Verify that server information is not removed when user navigates back from services to database', () => {
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
            cy.get('input').type('server1234')
        })
        cy.get('.MuiInputLabel-formControl').contains('Server Description').parent('div').within(() => {
            cy.get('input').type('server info')
        })

        //? Click next 
        cy.get('.MuiButton-label').contains('Next').click()

        //? Click back twice
        cy.wait(1000)
        cy.get('.MuiButton-label').contains('Back').click()
        cy.wait(1000)
        cy.get('.MuiButton-label').contains('Back').click()

        //? Click next 
        cy.wait(1000)
        cy.get('.MuiButton-label').contains('Next').click()

        //? Check whther the server information is preserved or not
        cy.get('.MuiInputLabel-formControl').contains('Server Name').parent('div').within(() => {
            cy.get('input').should('contain', 'server1234')
        })

    })
})

