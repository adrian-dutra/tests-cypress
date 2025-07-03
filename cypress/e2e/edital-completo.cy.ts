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

  it("C2 - Cria um edital completo com todos os campos exigidos conforme a Atividade 2", () => {
    cy.editalcompleto();
  });

  it("C24 - Verifica se as Rubricas estão presentes no edital completo", () => {
    cy.editalcompleto_rubricas();
  });

  it("C29 - Verificar se os indicadores se as bolsas foram adicionadas", () => {
    cy.editalcompletoIndicadoresAdicionados();
  });
});
