import userSelectors from '../../../selectors/user/user-selectors.json'
import htmlTagSelectors from '../../../selectors/htlm-tag-selectors.json'
import dashboardSelectors from '../../../selectors/dashboard-selectors.json'
import label from '../../../cypress/fixtures/label.json'

/**
 * Common Utils Commands
 *
 * This file is used to write common utility commands
 *
 * This command is used to enter text in expected input field
 *
 * This command takes input field name and input field text as parameter
 *
 * @example
 * cy.enterText('User Name', userDetails.userName)
 */

Cypress.Commands.add('enterText', (inputField, inputText) => {
  cy.get(userSelectors.requiredLabel).contains(inputField).parent(htmlTagSelectors.div).within(() => {
    cy.get(htmlTagSelectors.input).type(inputText)
  })
})

/**
 * This command is used to click on expected button
 *
 * This command takes button text as parameter
 *
 * @example
 * cy.clickButton('Next')
 */

Cypress.Commands.add('clickButton', (buttonText) => {
  cy.get(htmlTagSelectors.button).contains(buttonText).realClick()
})

/**
 * This command is used to check for text visibility on expected selector
 *
 * This command takes selector and text as parameters
 *
 * @example
 * cy.checkTextVisibility(selector,'Assign to Groups')
 */

Cypress.Commands.add('checkTextVisibility', (selector, text) => {
  cy.get(selector).contains(text).should('be.visible')
})

/**
* This command is used to delete group or user
*
* This command takes group name or user name to be deleted as parameter
*
* @example
* cy.delete('Group name')
*/

Cypress.Commands.add('delete', (inputName) => {
  cy.get(htmlTagSelectors.tableData).contains(inputName).scrollIntoView().next().next().within(() => {
    cy.get(userSelectors.titleDelete).realClick({ force: true })
  })
  cy.get(dashboardSelectors.dashboardButton).contains(label.confirm).realClick()
})

/**
* This command is used to delete a user
*
* This command takes group name or user name to be deleted as parameter
*
* @example
* cy.delete('Group name')
*/

function clickDelete (inputName) {
  cy.get(htmlTagSelectors.tableData).contains(inputName).scrollIntoView().next().next().next().next().next().within(() => {
    cy.get(userSelectors.titleDelete).realClick()
  })
}

Cypress.Commands.add('deleteUser', (inputName) => {
  cy.get(htmlTagSelectors.tableData).then(($resp) => {
    if ($resp.text().includes(inputName)) {
      clickDelete(inputName)
    } else {
      cy.get(dashboardSelectors.changePage).eq(1).click().then(() => {
        cy.get(htmlTagSelectors.tableData).then(($resp) => {
          if ($resp.text().includes(inputName)) {
            clickDelete(inputName)
          }
        })
      })
    }
  })

  cy.get(dashboardSelectors.dashboardButton).contains(label.confirm).realClick()
})

/**
* This command is used to select language
*
* This command takes language as parameter
*
* @example
* cy.selectLanguage(label.spanishLang)
*/

Cypress.Commands.add('selectLanguage', (language) => {
  cy.get(dashboardSelectors.languageDropdown).contains(language).realClick()
})
