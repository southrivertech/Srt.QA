import htmlTagSelectors from '../../../selectors/htlm-tag-selectors.json'
import generalSelectors from '../../../selectors/general-selectors.json'
import dashboardSelectors from '../../../selectors/dashboard-selectors.json'
import label from '../../../cypress/fixtures/label.json'

/**
 * Server Deletion Command
 *
 * This command is used to create a virtual directory
 *
 * @location
 * Login > {existing server} > users > Edit > Edit user files & Directories
 *
 * @params
 * actual path and virtual folder name
 *
 * @example
 * cy.createVirtualDirectory(virtualDirectoryDetails)
 */

Cypress.Commands.add('createVirtualDirectory', (virtualDirectoryDetails) => {
  cy.log({
    name: 'createVirtualDirectory'
  })
  cy.get(generalSelectors.inputLabel).contains('Actual Path').parent(htmlTagSelectors.div).type(virtualDirectoryDetails.actualPath)
  cy.get(generalSelectors.inputLabel).contains('Virtual Folder Name').parent(htmlTagSelectors.div).type(virtualDirectoryDetails.virtualFolderName)
  // adding virtual directory
  cy.get(dashboardSelectors.dashboardButtonLabel).contains(label.add).click()
})
