import 'cypress-mochawesome-reporter/register'
import 'cypress-real-events'
import '/cypress/actions/searchWithoutResultsActions'
import '/cypress/actions/searchWithResultsActions'

Cypress.on('uncaught:exception', () => false)