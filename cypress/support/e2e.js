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
import 'cypress-wait-until'

// Alternatively you can use CommonJS syntax:
// require('./commands')

/** API INTERCEPT COMMANDS */
import '../../components/apis/login/login-api-post'
import '../../components/apis/wait-api-response-status-code'

/** UI COMPONENT COMMANDS */
import '../../components/ui/login/login-command'
import '../../components/ui/users/create-user-command'
import '../../components/ui/users/edit-user-command'
import '../../components/ui/Groups/create-group-command'
import '../../components/ui/utils-Commands/utils-Commands'
import '../../components/ui/server/create-server-command'
import '../../components/ui/server/delete-server-command'
import './commands'

/* Importing the cypress-iframe plugin. */
import 'cypress-iframe'

/* Importing the cypress-real-events. */
import 'cypress-real-events'

const dayjs = require('dayjs')

Cypress.dayjs = dayjs
