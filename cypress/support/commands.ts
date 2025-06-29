// cypress/support/commands.ts

import { getCurrentDateTime } from "../helpers/date.helper";

Cypress.Commands.add('typelogin', (url, username, password) => {
  cy.visit(url);
  cy.get('#login').type(username);
  cy.get('#senha').type(password);
  cy.get('.css-1wz47u4 > .MuiButton-root').click(); //Botão Acessar da página principal
});
Cypress.Commands.add('editalsimples', () => {
    cy.get('[data-cy="nav-group-edital"]').click(); //Clica na aba Editais
    cy.get('[data-cy="nav-item-publicar-edital"]').click(); //Clica na opção Editais para acessar da página de Editais
    cy.get('[data-cy="add-publicar-edital"]').click(); //Clica no botão "Adicionar" para criação de um novo Edital
    cy.get('[data-cy="nome"]').type(
      'Grupo-01 E.S. 005/2025 joão-neves', //Edite essa linha para preencher o nome do Edital
      { delay: 0 },
    ); //Preenche o campo "Nome" do Edital
    cy.get('[data-cy="restricoes"]').click(); //Clica na aba Restrições para seguir para a página de Restrições
    cy.get('[data-cy="definirDuracaoProjetoEmMeses"]').check(); //Marca a opção "Definir Duração do Projeto em Meses"
    cy.get('[data-cy="duracaoProjetoEmMeses"]').type('6'); //Preenche o campo "Duração do Projeto em Meses com o valor 6"
    cy.get('[data-cy="pesquisadorSubmeterVariasPropostas"]').check(); //Marca a opção "Pesquisador pode submeter várias propostas"
    cy.get('[data-cy="cronograma"]').click(); //Clica na aba Cronograma para seguir para a página de Cronograma
    cy.get('[data-cy="periodo-de-submissao"]').click(); //Clica na aba Período de Submissão para seguir para a página de Período de Submissão
    cy.get('[data-cy="add-button"]').click(); //Clica no botão "Adicionar" para criar um novo Período de Submissão
    cy.get('[data-cy="chamadaUnsaved.inicio"]').type(getCurrentDateTime()); //Preenche o campo "Início" do Período de Submissão com a data do dia de hoje
    cy.get('[data-cy="chamadaUnsaved.termino"]').type(
      getCurrentDateTime({ addYears: 1 }),
    ); //Preenche o campo "Término" do Período de Submissão com a data do dia de hoje + 1 ano
    cy.get('[data-cy="chamada-confirmar"]').click(); //Clica no botão "Salvar" para salvar as informações do Período de Submissão
    cy.get('[data-cy="orcamento"]').click(); //Clica na aba Orçamento para exibir as opções de Orçamento
    cy.get('[data-cy="programa"]').click(); //Clica em Programa para seguir para a página de Programa
    cy.get('[data-cy="programaId"]').click(); //Clica no campo de seleção de Programa
    cy.get('[data-cy-index="programaId-item-0"]').click(); //Seleciona o primeiro Programa da lista de Programas
    cy.get('[data-cy="menu-salvar"]').click(); //Clica no botão "Salvar" para salvar as informações do Edital
    cy.get('[data-cy="menu-finalizar"]').click(); //Clica no botão "Finalizar" para salvar e sair da área de adição do Edital

    //Resultado esperado: O Edital deve ser salvo com sucesso e o usuário deve ser redirecionado para a página de Editais.
});
Cypress.Commands.add('editalmedio', () => {
  const tituloEditalMedio = 'grupo-14 E.M 002/2025 adriano-dutra';
  const textoTermoDeAceite = 'Estou de acordo com os termos'
  const textoEdital = 'Loren'

    // ---- 1. Navegação Inicial ----
    cy.get('[data-cy="nav-group-edital"]').click();
    cy.get('[data-cy="nav-item-publicar-edital"]').click();
    cy.get('[data-cy="add-publicar-edital"]').click();

    // ---- 2. Preenchimento do Step "Informações do Edital" ----

    // 2.1 Identificação do Edital (Requisito US-09)
    cy.get('[data-cy="nome"]').type(tituloEditalMedio, { delay: 0 });

    // 2.2 Restrições (Requisito US-10)
    cy.get('[data-cy="restricoes"]').click();
    cy.get('[data-cy="definirDuracaoProjetoEmMeses"]', { timeout: 10000 }).check();
    cy.get('[data-cy="duracaoProjetoEmMeses"]').type('12');
    cy.get('[data-cy="pesquisadorSubmeterVariasPropostas"]').check();

    // 2.3 Termo de Aceite (Requisito US-11)
    cy.get('[data-cy="termo-de-aceite"] > .MuiListItemText-root > .MuiTypography-root').click(); 
    cy.get('[data-cy="termoDeAceite"]').then(el => {
            // @ts-ignore
            const editor = el[0].ckeditorInstance; // Obtém a instância do editor CKEditor
            editor.setData(textoTermoDeAceite); // Define o conteúdo do Termo de Aceite com o texto máximo permitido
        })
    // 2.4 Texto do Edital (Requisito US-12)
    cy.get('[data-cy="texto-do-edital"] > .MuiListItemText-root > .MuiTypography-root').click();
    cy.get('.ck-editor__main > .ck').then(el => {
            // @ts-ignore
            const editor = el[0].ckeditorInstance; // Obtém a instância do editor CKEditor
            editor.setData(textoEdital); // Define o conteúdo do Termo de Aceite com o texto máximo permitido
        })
    
    // 2.5 Abrangência (Requisito US-13)
    cy.get('[data-cy="abrangencia"] > .MuiListItemText-root > .MuiTypography-root').click();
    cy.get('[data-cy="estado-mato-grosso-do-s"]').click();
    cy.get('[data-cy="estado-rio-grande-do-su"]').click();

    // ---- 3. Preenchimento do Step "Cronograma" ----
    cy.get('[data-cy="cronograma"]').click();

    // 3.1 Período de Submissão (Requisito US-17)
    cy.get('[data-cy="periodo-de-submissao"]').click();
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="chamadaUnsaved.inicio"]').type(getCurrentDateTime());
    cy.get('[data-cy="chamadaUnsaved.termino"]').type(getCurrentDateTime({ addMonths: 6 }));
    cy.get('[data-cy="chamada-confirmar"]').click();

    // ---- 4. Preenchimento do Step "Orçamento" ----
    cy.get('[data-cy="orcamento"]').click();

    // 4.1 Programa (Requisito US-20)
    cy.get('[data-cy="programa"]').click();
    cy.get('[data-cy="programaId"]').click();
    cy.get('[data-cy-index="programaId-item-0"]').click();

    // ---- 5. Preenchimento do Step "Perguntas" ----
    cy.get('[data-cy="perguntas"] > .MuiListItemText-root > .MuiTypography-root').click();

    // 5.1 Indicadores de Produção (Requisito US-28)
    cy.get('[data-cy="indicadores-de-producao"] > .MuiListItemText-root > .MuiTypography-root').click();
    // Adiciona os 3 indicadores, encontrando os seletores corretos para cada um.
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="indicadorProducaoUnsaved.id"]').click();
    cy.get('#mui-63-option-2').click();
    cy.get('[data-cy="indicadorProducao-confirmar"]').click();

    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="indicadorProducaoUnsaved.id"]').click();
    cy.get('#mui-70-option-2').click();
    cy.get('[data-cy="indicadorProducao-confirmar"]').click();
    
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="indicadorProducaoUnsaved.id"]').click();
    cy.get('#mui-79-option-1').click();
    cy.get('[data-cy="indicadorProducao-confirmar"]').click();

    // ---- 6. Finalização ----
    cy.get('[data-cy="menu-salvar"]').click();
    cy.get('[data-cy="menu-finalizar"]').click();

    // ---- 7. Verificação do Resultado Esperado ----
    // Após finalizar, o sistema deve redirecionar para a tela de gerenciamento.
    // O teste verifica se o título do edital recém-criado está visível na página.
    // Esta é a asserção final, que garante que o teste foi um sucesso.
    cy.contains(tituloEditalMedio).should('be.visible');
});

Cypress.Commands.add('editalmedioTermoEspecial', () => {
  const tituloEdital = 'grupo-14 E.M TC010 termo-especial';
  const textoEspecial = `!@#$%¨&*()_+=§¬¢£³²¹~^\\\`´{}[]<>"'/|¿¡ªº`;
  const textoEdital = 'Texto do edital';

  // Navegação inicial
  cy.get('[data-cy="nav-group-edital"]').click();
  cy.get('[data-cy="nav-item-publicar-edital"]').click();
  cy.get('[data-cy="add-publicar-edital"]').click();

  // Campo obrigatório + termo de aceite
  cy.get('[data-cy="nome"]').type(tituloEdital);
  cy.get('[data-cy="restricoes"]').click();
  cy.get('[data-cy="definirDuracaoProjetoEmMeses"]',  { timeout: 10000 }).check();
  cy.get('[data-cy="duracaoProjetoEmMeses"]').type('6');
  cy.get('[data-cy="pesquisadorSubmeterVariasPropostas"]').check();

  cy.get('[data-cy="termo-de-aceite"] > .MuiListItemText-root > .MuiTypography-root').click();
  cy.get('[data-cy="termoDeAceite"]').then($el => {
    // @ts-ignore
    const editor = $el[0].ckeditorInstance;
    editor.setData(textoEspecial);
  });

  cy.get('[data-cy="texto-do-edital"] > .MuiListItemText-root > .MuiTypography-root').click();
  cy.get('.ck-editor__main > .ck').then($el => {
    // @ts-ignore
    const editor = $el[0].ckeditorInstance;
    editor.setData(textoEdital);
  });

  cy.get('[data-cy="abrangencia"] > .MuiListItemText-root > .MuiTypography-root').click();
  cy.get('[data-cy="estado-mato-grosso-do-s"]').click();
  cy.get('[data-cy="estado-rio-grande-do-su"]').click();

  // ---- 3. Preenchimento do Step "Cronograma" ----
  cy.get('[data-cy="cronograma"]').click();

  // 3.1 Período de Submissão (Requisito US-17)
  cy.get('[data-cy="periodo-de-submissao"]').click();
  cy.get('[data-cy="add-button"]').click();
  cy.get('[data-cy="chamadaUnsaved.inicio"]').type(getCurrentDateTime());
  cy.get('[data-cy="chamadaUnsaved.termino"]').type(getCurrentDateTime({ addMonths: 6 }));
  cy.get('[data-cy="chamada-confirmar"]').click();

  // ---- 4. Preenchimento do Step "Orçamento" ----
  cy.get('[data-cy="orcamento"]').click();

  // 4.1 Programa (Requisito US-20)
  cy.get('[data-cy="programa"]').click();
  cy.get('[data-cy="programaId"]').click();
  cy.get('[data-cy-index="programaId-item-0"]').click();

  // ---- 5. Preenchimento do Step "Perguntas" ----
  cy.get('[data-cy="perguntas"] > .MuiListItemText-root > .MuiTypography-root').click();

  // 5.1 Indicadores de Produção (Requisito US-28)
  cy.get('[data-cy="indicadores-de-producao"] > .MuiListItemText-root > .MuiTypography-root').click();
  // Adiciona os 3 indicadores, encontrando os seletores corretos para cada um.
  cy.get('[data-cy="add-button"]').click();
  cy.get('[data-cy="indicadorProducaoUnsaved.id"]').click();
  cy.get('#mui-63-option-2').click();
  cy.get('[data-cy="indicadorProducao-confirmar"]').click();

  cy.get('[data-cy="add-button"]').click();
  cy.get('[data-cy="indicadorProducaoUnsaved.id"]').click();
  cy.get('#mui-70-option-2').click();
  cy.get('[data-cy="indicadorProducao-confirmar"]').click();
  
  cy.get('[data-cy="add-button"]').click();
  cy.get('[data-cy="indicadorProducaoUnsaved.id"]').click();
  cy.get('#mui-79-option-1').click();
  cy.get('[data-cy="indicadorProducao-confirmar"]').click();

  cy.get('[data-cy="menu-salvar"]').click();
  cy.get('[data-cy="menu-finalizar"]').click();
  cy.contains(tituloEdital).should('be.visible');
});