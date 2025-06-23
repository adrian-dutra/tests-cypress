import { getCurrentDateTime } from "../helpers/date.helper";

describe("Cadastro de Edital Completo - SIGFAP", () => {
  beforeEach(() => {
    cy.typelogin(
      "https://novo-sig.ledes.net/",
      "grupo14_gestor@sig.com",
      "Grupo14@sig"
    );
  });

  it("Cria um edital completo com todos os campos exigidos conforme a Atividade 2", () => {
    cy.get('[data-cy="nav-group-edital"]').click();
    cy.get('[data-cy="nav-item-publicar-edital"]').click();
    cy.get('[data-cy="add-publicar-edital"]').click();

    // Identificação do Edital
    cy.get('[data-cy="nome"]').type("Grupo-14 E.C. 007/2025 eduardo-nunes", {
      delay: 0,
    });

    // Restrições
    cy.get('[data-cy="restricoes"]').click();
    cy.get('[data-cy="definirDuracaoProjetoEmMeses"]').check();
    cy.get('[data-cy="duracaoProjetoEmMeses"]').type("12");
    cy.get('[data-cy="pesquisadorSubmeterVariasPropostas"]').check();

    // Termo de Aceite
    // Termo de Aceite
    cy.get('[data-cy="termoDeAceite-tab"]').click();
    cy.get('[data-cy="termoDeAceite"]').type(
      "Declaro estar de acordo com todas as condições do Edital Completo Grupo 14."
    );

    // Texto do Edital
    cy.get('[data-cy="textoEdital"]').type(
      "Este edital tem por objetivo fomentar atividades de pesquisa científica e tecnológica."
    );

    // Abrangência
    cy.get('[data-cy="abrangencias"]').click();
    cy.get('[data-cy-index="abrangencias-item-0"]').click();
    cy.get('[data-cy-index="abrangencias-item-1"]').click();
    cy.get('[data-cy-index="abrangencias-item-2"]').click();

    // Informações Complementares
    cy.get('[data-cy="info-complementares"]').click();
    for (let i = 1; i <= 5; i++) {
      cy.get('[data-cy="add-info-complementar"]').click();
      cy.get(`[data-cy="info-complementar-${i}"]`).type(
        `Informação complementar ${i}`
      );
    }

    // Cronograma > Período de Submissão
    cy.get('[data-cy="cronograma"]').click();
    cy.get('[data-cy="periodo-de-submissao"]').click();
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="chamadaUnsaved.inicio"]').type(getCurrentDateTime());
    cy.get('[data-cy="chamadaUnsaved.termino"]').type(
      getCurrentDateTime({ addMonths: 12 })
    );
    cy.get('[data-cy="chamada-confirmar"]').click();

    // Orçamento > Programa
    cy.get('[data-cy="orcamento"]').click();
    cy.get('[data-cy="programa"]').click();
    cy.get('[data-cy="programaId"]').click();
    cy.get('[data-cy-index="programaId-item-0"]').click();

    // Rubricas
    cy.get('[data-cy="rubricas"]').click();
    for (let i = 0; i < 5; i++) {
      cy.get('[data-cy="add-rubrica"]').click();
      cy.get(`[data-cy="rubrica-${i}"]`).type(`Rubrica ${i + 1}`);
    }

    // Faixas de Financiamento
    cy.get('[data-cy="faixas"]').click();
    for (let i = 0; i < 5; i++) {
      cy.get('[data-cy="add-faixa"]').click();
      cy.get(`[data-cy="faixa-${i}-min"]`).type(`${1000 * (i + 1)}`);
      cy.get(`[data-cy="faixa-${i}-max"]`).type(`${2000 * (i + 1)}`);
    }

    // Documentos
    cy.get('[data-cy="documentos"]').click();
    for (let i = 0; i < 2; i++) {
      cy.get('[data-cy="add-doc-proposta"]').click();
      cy.get(`[data-cy="doc-proposta-${i}"]`).type(
        `Documento Proposta ${i + 1}`
      );
    }
    for (let i = 0; i < 5; i++) {
      cy.get('[data-cy="add-doc-pessoal"]').click();
      cy.get(`[data-cy="doc-pessoal-${i}"]`).type(`Documento Pessoal ${i + 1}`);
    }

    // Perguntas e Indicadores
    cy.get('[data-cy="perguntas"]').click();
    for (let i = 1; i <= 5; i++) {
      cy.get('[data-cy="add-pergunta-projeto"]').click();
      cy.get(`[data-cy="pergunta-projeto-${i}"]`).type(
        `Descreva o objetivo ${i}`
      );
    }
    cy.get('[data-cy="indicador-producao"]').type("Publicação{enter}");
    cy.get('[data-cy="indicador-producao"]').type("Eventos{enter}");
    cy.get('[data-cy="indicador-producao"]').type("Patentes{enter}");

    // Bolsas
    cy.get('[data-cy="bolsas"]').click();
    for (let i = 0; i < 5; i++) {
      cy.get('[data-cy="add-bolsa"]').click();
      cy.get(`[data-cy="modalidade-${i}"]`).type(`Modalidade ${i + 1}`);
      cy.get(`[data-cy="nivel-${i}"]`).type(`Nível ${i + 1}`);
    }

    // Finalizar
    cy.get('[data-cy="menu-salvar"]').click();
    cy.get('[data-cy="menu-finalizar"]').click();
  });
});
