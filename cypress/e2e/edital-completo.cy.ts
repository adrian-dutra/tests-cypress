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
    cy.get('[data-cy="nav-group-edital"]').click();
    cy.get('[data-cy="nav-item-publicar-edital"]').click();
    cy.get('[data-cy="add-publicar-edital"]').click();

    // Identificação do Edital
    cy.get('[data-cy="nome"]').type("Grupo-14 E.C. 007/2025 eduardo-nunes", {
      delay: 0,
    });

    // Restrições
    cy.contains("Restrições").click();
    cy.get('[data-cy="definirDuracaoProjetoEmMeses"]').check();
    cy.get('[data-cy="duracaoProjetoEmMeses"]').type("12");
    cy.get('[data-cy="pesquisadorSubmeterVariasPropostas"]').check();

    // Termo de Aceite
    cy.contains("Termo de Aceite").click();
    const textoTermoDeAceite =
      "Declaro estar de acordo com todas as condições do Edital Completo - Grupo 14.";
    cy.get('[data-cy="termoDeAceite"]').then((el) => {
      // @ts-ignore
      const editor = el[0].ckeditorInstance;
      editor.setData(textoTermoDeAceite);
    });

    // Texto do Edital
    cy.contains("Texto do Edital").click();
    const textoEdital =
      "Este edital tem por objetivo fomentar atividades de pesquisa científica e tecnológica - Grupo 14.";
    cy.get(".ck-editor__main > .ck").then((el) => {
      // @ts-ignore
      const editor = el[0].ckeditorInstance;
      editor.setData(textoEdital);
    });

    // Abrangência
    cy.get(
      '[data-cy="abrangencia"] > .MuiListItemText-root > .MuiTypography-root'
    ).click();
    cy.get('[data-cy="estado-todos"]').should("be.visible").click();

    // Informações Complementares
    cy.contains("Informações Complementares").click();

    // Primeira
    cy.get('[data-cy="perguntaInfoId"]').click();
    cy.get('[data-cy="areas-tematicas"]').should("be.visible").click();
    cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').click();

    // Segunda
    cy.get('[data-cy="perguntaInfoId"]').click();
    cy.get('[data-cy="objetivos-de-des"]').should("be.visible").click();
    cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').click();

    // Terceira
    cy.get('[data-cy="perguntaInfoId"]').click();
    cy.get('[data-cy="porte-da-empresa"]').should("be.visible").click();
    cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').click();

    // Quarta
    cy.get('[data-cy="perguntaInfoId"]').click();
    cy.get('[data-cy="ocupacao-da-equi"]').should("be.visible").click();
    cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').click();

    // Quinta (com segurança extra para clique)
    cy.get('[data-cy="perguntaInfoId"]').click();
    cy.get('[data-cy="data-de-realizac"]')
      .should("be.visible")
      .should("contain", "Data de realização do evento")
      .then(($el) => {
        cy.wrap($el).click();
      });
    cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').click();

    // Cronograma > Período de Submissão
    cy.contains("Cronograma").click();
    cy.get('[data-cy="periodo-de-submissao"]').click();
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="chamadaUnsaved.inicio"]').type(getCurrentDateTime());
    cy.get('[data-cy="chamadaUnsaved.termino"]').type(
      getCurrentDateTime({ addMonths: 12 })
    );
    cy.get('[data-cy="chamada-confirmar"]').click();

    // Orçamento > Programa
    cy.get('[data-cy="orcamento"] > .MuiListItemText-root > .MuiTypography-root').click();
    cy.get('[data-cy="programa"] > .MuiListItemText-root > .MuiTypography-root', { timeout: 3000 }).click(); // Isso clica na subaba "Programa"
    cy.get('[data-cy="add-natureza-da-despesa"]').click();
    cy.get('[data-cy="programaId"]', { timeout: 7000 })
      .should("be.visible")
      .click();
    cy.get('[data-cy-index="programaId-item-0"]').click();
    cy.get('[data-cy="naturezaDespesaEdital-confirmar"]').click();

    // Rubricas
    cy.get('[data-cy="rubricas"] > .MuiListItemText-root > .MuiTypography-root').click();

    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="editalRubricaUnsaved.tipoEditalRubrica"]').click();
    cy.get('[data-cy="hospedagem-e-ali"]').click()
    cy.get('[data-cy="editalRubricaUnsaved.naturezaDespesaId"]').click();
    cy.get('[data-cy="custeio"]').click();
    cy.get('[data-cy="editalRubrica-confirmar"]').click();
    //=============================================
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="editalRubricaUnsaved.tipoEditalRubrica"]').click();
    cy.get('[data-cy="diarias"]').click();
    cy.get('[data-cy="editalRubricaUnsaved.naturezaDespesaId"]').click();
    cy.get('[data-cy="capital"]').click();
    cy.get('[data-cy="editalRubrica-confirmar"]').click();
    //=============================================
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="editalRubricaUnsaved.tipoEditalRubrica"]').click();
    cy.get('[data-cy="servicos-de-terc"]').click()
    cy.get('[data-cy="editalRubricaUnsaved.naturezaDespesaId"]').click();
    cy.get('[data-cy="auxilio-a-pesqui"]').click();
    cy.get('[data-cy="editalRubrica-confirmar"]').click();
    //=============================================
    //=============================================
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="editalRubricaUnsaved.tipoEditalRubrica"]').click();
    cy.get('[data-cy="material-de-cons"]').click()
    cy.get('[data-cy="editalRubricaUnsaved.naturezaDespesaId"]').click();
    cy.get('[data-cy="auxilio-a-pesqui"]').click();
    cy.get('[data-cy="editalRubrica-confirmar"]').click();
    //=============================================
    //=============================================
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="editalRubricaUnsaved.tipoEditalRubrica"]').click();
    cy.get('[data-cy="material-permane"]').click()
    cy.get('[data-cy="editalRubricaUnsaved.naturezaDespesaId"]').click();
    cy.get('[data-cy="auxilio-a-pesqui"]').click();
    cy.get('[data-cy="editalRubrica-confirmar"]').click();
    //=============================================
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="editalRubricaUnsaved.tipoEditalRubrica"]').click();
    cy.get('[data-cy="passagens"]').click()
    cy.get('[data-cy="editalRubricaUnsaved.naturezaDespesaId"]').click();
    cy.get('[data-cy="auxilio-a-pesqui"]').click();
    cy.get('[data-cy="editalRubrica-confirmar"]').click();
    //=============================================
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="editalRubricaUnsaved.tipoEditalRubrica"]').click();
    cy.get('[data-cy="pessoal"]').click()
    cy.get('[data-cy="editalRubricaUnsaved.naturezaDespesaId"]').click();
    cy.get('[data-cy="auxilio-a-pesqui"]').click();
    cy.get('[data-cy="editalRubrica-confirmar"]').click();
    //=============================================




    // Faixas de Financiamento
    cy.contains("Faixas de Financiamento").click();

    for (let i = 0; i < 5; i++) {
      cy.get('[data-cy="add-button"]').should('be.visible').click()

      // Nome da faixa (usa o seletor baseado no índice se disponível, senão usa o seletor genérico)
      cy.get('[data-cy="faixaFinanciamentoUnsaved.nome"]')
        .should('be.visible')
        .click()
        .type(`{selectall}{backspace}FAIXA TESTE ${i + 1}`);

      // Valores numéricos
      cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMinimo"]')
        .clear()
        .type(`${1000 * (i + 1)}`);
      cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMaximo"]')
        .clear()
        .type(`${2000 * (i + 1)}`);

      // Observação genérica
      cy.get('[data-cy="faixaFinanciamentoUnsaved.observacao"]')
        .clear()
        .type(`Obs ${i + 1}`);

      // Confirma a faixa
      cy.get('[data-cy="faixaFinanciamento-confirmar"]')
        .should('be.visible')
        .click();
    }

    // Documentos
    cy.get('[data-cy="documentos"]').click();
    cy.get('[data-cy="documentos-da-proposta"]').click();
    cy.get('[data-cy="documentoPropostaEdital-adicionar"]').click();

    cy.get('.MuiAccordionSummary-root').click();
    cy.get('[data-cy="documentoPropostaEdital.0.nome"]').should('be.visible').click().type(`{selectall}{backspace}DOC 1`);
    cy.get('[data-cy="documentoPropostaEdital.0.descricao"]').clear().type(`Desc`);
    cy.get('[data-cy="documentoPropostaEdital.0.formatoArquivo"]').click().type('PDF').wait(500).type('{enter}').blur();
    cy.get('[data-cy="documentoPropostaEdital.0.tamanhoArquivo"]').clear().type(`${10}`);
    cy.get('[data-cy="documentoPropostaEdital.0.arquivoSubmissaoObrigatoria"]').click();
    cy.get('[data-cy="documentoPropostaEdital.0.permiteSubmeterMultiplosArquivos"]').click();
    cy.get('[data-cy="documentoPropostaEdital-adicionar"]').click();
//=========================================================

    cy.get('[data-cy="documentoPropostaEdital--expandable-item"] > .MuiAccordionSummary-root').click();
    cy.get('[data-cy="documentoPropostaEdital.1.nome"]').should('be.visible').click().type(`{selectall}{backspace}DOC 2`);
    cy.get('[data-cy="documentoPropostaEdital.1.descricao"]').clear().type(`Desc`);
    cy.get('[data-cy="documentoPropostaEdital.1.formatoArquivo"]').click().type('PDF').wait(500).type('{enter}').blur();
    cy.get('[data-cy="documentoPropostaEdital.1.tamanhoArquivo"]').clear().type(`${10}`);
    cy.get('[data-cy="documentoPropostaEdital.1.arquivoSubmissaoObrigatoria"]').click();
    cy.get('[data-cy="documentoPropostaEdital.1.permiteSubmeterMultiplosArquivos"]').click();
    cy.get('[data-cy="documentoPropostaEdital-adicionar"]').click();


    //DOC pessoal
    //NÃO FINALIZADO
    cy.get('[data-cy="documentos-pessoais"]').click();
    cy.get('[data-cy="documentoPessoalEdital-adicionar"]').click();
    cy.get('[data-cy="documentoPessoalEdital.0.documentoPessoalId"]').click();
    cy.get('#mui-459-option-1').click();
    cy.get('[data-cy="documentoPessoalEdital.0.obrigatorio"]').click();
    cy.get('[data-cy="documentoPessoalEdital-adicionar"]').click();

    // Perguntas e Indicadores
    cy.contains("Perguntas").click();
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
    cy.contains("Bolsas do Edital").click();
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
