import { searchData } from "../data/searchData";
import { serachElements } from "../elements/searchElements";

Cypress.Commands.add('searchWithoutResults', () => {

  cy.visit('/')
  cy.get(serachElements.servicesPageButton, { timeout: 10000 }).should('be.visible').click();
  cy.get(serachElements.searchButton, { timeout: 10000 }).should('be.visible').click();
  cy.get(serachElements.searchInput, { timeout: 10000 }).should('be.visible').type(`${searchData.wrongSearchTerm}{enter}`);
  cy.get(serachElements.wrongResultTitle).should('be.visible').and('contain', searchData.noResultsMessage);
});
