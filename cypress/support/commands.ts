// cypress/support/commands.ts

Cypress.Commands.add("typelogin", (url, username, password) => {
  cy.visit(url);
  cy.get("#login").type(username);
  cy.get("#senha").type(password);
  cy.get(".css-1wz47u4 > .MuiButton-root").click(); //Botão Acessar da página principal
});
