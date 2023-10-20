import navigationSelectors from '../../../../../selectors/navigation/left-navigation-selectors.json'
import label from '../../../../fixtures/label.json'
import iconSelectors from '../../../../../selectors/icon-selectors.json'
import modalSelectors from '../../../../../selectors/modal-selectors.json'
import { slowCypressDown } from 'cypress-slow-down'
/**
 * @description
 * This spec file contains test to verify that admin can trigger SE-10117 system event to configure backup
 *
 * @bugID - NX-i1151
 *
 * @breadcrumb
 * Login > {existing server} > events > show system events > SE-10117 (config backup)
 *
 * @assertions
 * To verify that admin can trigger SE-10117 system event to configure backup
 *
 *  @prerequisites
 * Pre-Requisite data:
 * - user should have valid credentials
 */

// slowCypressDown(200)

describe('Login > {existing server} > events > show system events > SE-10117 (config backup)', () => {
  const adminData = Cypress.env('admin')
  const userInfo = {
    username: adminData.adminUsername,
    password: adminData.adminPassword
  }

  beforeEach('login', () => {
    cy.login(adminData.adminBaseUrl, userInfo.username, userInfo.password)
    // navigate to service event
    cy.get(navigationSelectors.textLabelSelector).contains(label.autoDomainName).click()
    cy.get(navigationSelectors.textLabelSelector).contains(label.autoServerName).should('be.visible').click()
    cy.get(navigationSelectors.textLabelSelector).contains(label.events).should('be.visible').click()
    // show system events
    cy.get(iconSelectors.filterIcon).should('be.visible').click()
    cy.get(modalSelectors.modalHeader).should('be.visible')
    cy.get(modalSelectors.modalContainer).should('be.visible').within(() => {
      cy.get('input').click()
    })
    cy.get(modalSelectors.modalFooter).should('be.visible').within(() => {
      cy.get('[type="button"]').get('span').contains('Add').click()
    })
    // click on edit icon for event SE-10117
    // cy.on('window:before:load', (win) => {
    //   if (win.jQuery === undefined && (win.$ === undefined)) {
    //     Object.defineProperty(win, '$', {
    //       configurable: false,
    //       get: () => Cypress.cy.$$,
    //       set: () => {}
    //     })
    //   }
    // })
    // cy.get('[d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"]').eq(6).click()
    
    // cy.origin('https://beta.southrivertech.com:41443', () => {
    //     cy.on('uncaught:exception', (e) => {
    //       if (e.message.includes('Things went bad')) {
    //         // we expected this error, so let's ignore it
    //         // and let the test continue
    //         cy.get('[d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"]').eq(6).click()
    //         // return false
    //       }
    //     })
    //     cy.get('[d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"]').eq(6).click()
    //   })
    cy.contains('span', 'SE-10117').parents('[role="cell"]')
      .next('[role="cell"]')
      .next('[role="cell"]')
      .next('[role="cell"]')
      .within(() => {
        cy.get('[d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"]').click()
      })
    cy.wait(5000)
    // cy.get('[role="cell"]').get('span').first().contains('SE-10117').parents()
  })

  it('admin can trigger SE-10117 system event to configure backup', () => {
    cy.log('hi')
  })
})
