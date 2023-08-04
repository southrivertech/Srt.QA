// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

/** SUPPORT COMMANDS */
// Import commands.js using ES2015 syntax:
import 'cypress-network-idle'
import 'cypress-file-upload'

// Alternatively you can use CommonJS syntax:
// require('./commands')

/** API INTERCEPT COMMANDS */
import '../../components/apis/login/login-api-post'
import '../../../ui/components/apis/wait-api-response-status-code'

/** UI COMPONENT COMMANDS */
import './commands'
