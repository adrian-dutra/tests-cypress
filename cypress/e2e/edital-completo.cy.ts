import { getCurrentDateTime } from "../helpers/date.helper";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Cadastro de Edital Completo - SIGFAP", () => {
  beforeEach(() => {
    cy.typelogin(
      "https://novo-sig.ledes.net/",
      "grupo14_gestor@sig.com",
      "Grupo14@sig"
    );
  });

  it("Cria um edital completo com todos os campos exigidos conforme a Atividade 2", () => {
    cy.editalcompleto();
  });
  it("C29 - Verificar se os indicadores se as bolsas foram  adicionadas", () => {
    cy.editalcompletoIndicadoresAdicionados();
  });
});
