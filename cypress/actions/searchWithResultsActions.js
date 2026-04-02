import { searchData } from "../data/searchData";
import { serachElements } from "../elements/searchElements";

Cypress.Commands.add('searchWithResults', () => {

  cy.visit('/')
  cy.get(serachElements.servicesPageButton, { timeout: 10000 }).scrollIntoView().should('be.visible').click();
  cy.get(serachElements.searchButton, { timeout: 10000 }).should('be.visible').click();
  cy.get(serachElements.searchInput, { timeout: 10000 }).should('be.visible').type(`${searchData.searchTerm}{enter}`);
  cy.get(serachElements.resultTitle, { timeout: 10000 }).should('be.visible').and('contain', searchData.searchResultTitle);
});