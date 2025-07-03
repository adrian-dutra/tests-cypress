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
      'grupo-14 E.S 002/2025 adriano-dutra', //Edite essa linha para preencher o nome do Edital
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
Cypress.Commands.add('editalsimples_sqlInjection', () => {
  cy.get('[data-cy="nav-group-edital"]').click();
  cy.get('[data-cy="nav-item-publicar-edital"]').click();
  cy.get('[data-cy="add-publicar-edital"]').click();
  
  cy.get('[data-cy="nome"]').type(
    "grupo-14'); DROP TABLE editais; --",
    { delay: 0 },
  );

  cy.get('[data-cy="restricoes"]').click();
  cy.get('[data-cy="definirDuracaoProjetoEmMeses"]').check();
  cy.get('[data-cy="duracaoProjetoEmMeses"]').type('6');
  cy.get('[data-cy="pesquisadorSubmeterVariasPropostas"]').check();
  cy.get('[data-cy="cronograma"]').click();
  cy.get('[data-cy="periodo-de-submissao"]').click();
  cy.get('[data-cy="add-button"]').click();
  cy.get('[data-cy="chamadaUnsaved.inicio"]').type(getCurrentDateTime());
  cy.get('[data-cy="chamadaUnsaved.termino"]').type(
    getCurrentDateTime({ addYears: 1 }),
  );
  cy.get('[data-cy="chamada-confirmar"]').click();
  cy.get('[data-cy="orcamento"]').click();
  cy.get('[data-cy="programa"]').click();
  cy.get('[data-cy="programaId"]').click();
  cy.get('[data-cy-index="programaId-item-0"]').click();
  cy.get('[data-cy="menu-salvar"]').click();
  cy.get('[data-cy="menu-finalizar"]').click();
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
Cypress.Commands.add('editalMedioDuracaoDeProjetosNegativo', () => {
  const tituloEditalMedio = 'grupo-14 E.M 002/2025 angelo-mazarin';
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
    cy.get('[data-cy="duracaoProjetoEmMeses"]').type('-12');
    cy.get('[data-cy="duracaoProjetoEmMeses"]').should('not.have.value', '-12');
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
Cypress.Commands.add('editalMedioDuracaoDeProjetosVazio', () => {
  const tituloEditalMedio = 'grupo-14 E.M 002/2025 angelo-mazarin';
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
Cypress.Commands.add('editalMedioTituloMuitoTexto', () => {
  const tituloEditalMedio = 'Edital nº 004/2025 – Processo Seletivo Simplificado para a Contratação Temporária de Profissionais de Nível Superior e Médio para Atuação em Projetos Institucionais de Apoio ao Desenvolvimento Tecnológico, Científico e Inovador em Regiões de Alta Vulnerabilidade Social no Âmbito do Programa Nacional de Fomento à Pesquisa Aplicada e Extensão Universitária Vinculado ao Ministério da Ciência, Tecnologia e Inovações';
  const textoTermoDeAceite = 'Estou de acordo com os termos'
  const textoEdital = 'Loren'

    // ---- 1. Navegação Inicial ----
    cy.get('[data-cy="nav-group-edital"]').click();
    cy.get('[data-cy="nav-item-publicar-edital"]').click();
    cy.get('[data-cy="add-publicar-edital"]').click();

    // ---- 2. Preenchimento do Step "Informações do Edital" ----

    // 2.1 Identificação do Edital (Requisito US-09)
    cy.get('[data-cy="nome"]').type(tituloEditalMedio, { delay: 0 });
    cy.get('[data-cy="nome"]').contains(tituloEditalMedio)
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

Cypress.Commands.add('editalcompleto', () => {
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
    cy.get('[data-cy="data-de-realizac"]').should("be.visible").click();
    cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').click();
    cy.get('[data-cy="informacaoComplementarPergunta--remover"]').click();

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

    cy.get('[data-cy="perguntaInfoId"]').click();
    cy.get('[data-cy="data-de-realizac"]').should("be.visible").click();
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
    cy.get(
      '[data-cy="orcamento"] > .MuiListItemText-root > .MuiTypography-root'
    ).click();
    cy.get(
      '[data-cy="programa"] > .MuiListItemText-root > .MuiTypography-root',
      { timeout: 3000 }
    ).click(); // Isso clica na subaba "Programa"
    cy.get('[data-cy="add-natureza-da-despesa"]').click();
    cy.get('[data-cy="programaId"]', { timeout: 7000 })
      .should("be.visible")
      .click();
    cy.get('[data-cy-index="programaId-item-0"]').click();
    cy.get('[data-cy="naturezaDespesaEditalUnsaved.naturezaDespesaId"]').click();
    cy.get('[data-cy="custeio"]').click();
    cy.get('[data-cy="naturezaDespesaEditalUnsaved.valor"]').type(`${100}`)
    cy.get('[data-cy="naturezaDespesaEdital-confirmar"]').click();

    // Rubricas
    cy.get(
      '[data-cy="rubricas"] > .MuiListItemText-root > .MuiTypography-root'
    ).click();

    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="editalRubricaUnsaved.tipoEditalRubrica"]').click();
    cy.get('[data-cy="hospedagem-e-ali"]').click();
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
    cy.get('[data-cy="servicos-de-terc"]').click();
    cy.get('[data-cy="editalRubricaUnsaved.naturezaDespesaId"]').click();
    cy.get('[data-cy="auxilio-a-pesqui"]').click();
    cy.get('[data-cy="editalRubrica-confirmar"]').click();
    //=============================================
    //=============================================
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="editalRubricaUnsaved.tipoEditalRubrica"]').click();
    cy.get('[data-cy="material-de-cons"]').click();
    cy.get('[data-cy="editalRubricaUnsaved.naturezaDespesaId"]').click();
    cy.get('[data-cy="auxilio-a-pesqui"]').click();
    cy.get('[data-cy="editalRubrica-confirmar"]').click();
    //=============================================
    //=============================================
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="editalRubricaUnsaved.tipoEditalRubrica"]').click();
    cy.get('[data-cy="material-permane"]').click();
    cy.get('[data-cy="editalRubricaUnsaved.naturezaDespesaId"]').click();
    cy.get('[data-cy="auxilio-a-pesqui"]').click();
    cy.get('[data-cy="editalRubrica-confirmar"]').click();
    //=============================================
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="editalRubricaUnsaved.tipoEditalRubrica"]').click();
    cy.get('[data-cy="passagens"]').click();
    cy.get('[data-cy="editalRubricaUnsaved.naturezaDespesaId"]').click();
    cy.get('[data-cy="auxilio-a-pesqui"]').click();
    cy.get('[data-cy="editalRubrica-confirmar"]').click();
    //=============================================
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="editalRubricaUnsaved.tipoEditalRubrica"]').click();
    cy.get('[data-cy="pessoal"]').click();
    cy.get('[data-cy="editalRubricaUnsaved.naturezaDespesaId"]').click();
    cy.get('[data-cy="auxilio-a-pesqui"]').click();
    cy.get('[data-cy="editalRubrica-confirmar"]').click();
    //=============================================

    // // Faixas de Financiamento
    // cy.contains("Faixas de Financiamento").click();

    // for (let i = 0; i < 5; i++) {
    //   cy.get('[data-cy="add-button"]').should("be.visible").click();

    //   // Nome da faixa (usa o seletor baseado no índice se disponível, senão usa o seletor genérico)
    //   cy.get('[data-cy="faixaFinanciamentoUnsaved.nome"]')
    //     .should("be.visible")
    //     .click()
    //     .type(`{selectall}{backspace}FAIXA TESTE ${i + 1}`);

    //   // Valores numéricos
    //   cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMinimo"]')
    //     .clear()
    //     .type(`${1000 * (i + 1)}`);
    //   cy.get('[data-cy="faixaFinanciamentoUnsaved.valorMaximo"]')
    //     .clear()
    //     .type(`${2000 * (i + 1)}`);

    //   // Observação genérica
    //   cy.get('[data-cy="faixaFinanciamentoUnsaved.observacao"]')
    //     .clear()
    //     .type(`Obs ${i + 1}`);

    //   // Confirma a faixa
    //   cy.get('[data-cy="faixaFinanciamento-confirmar"]')
    //     .should("be.visible")
    //     .click();
    // }

    // Documentos
    cy.get('[data-cy="documentos"]').click();
    cy.get('[data-cy="documentos-da-proposta"]').click();
    cy.get('[data-cy="documentoPropostaEdital-adicionar"]').click();

    cy.get(".MuiAccordionSummary-root").click();
    cy.get('[data-cy="documentoPropostaEdital.0.nome"]')
      .should("be.visible")
      .click()
      .type(`{selectall}{backspace}DOC 1`);
    cy.get('[data-cy="documentoPropostaEdital.0.descricao"]')
      .clear()
      .type(`Desc`);
    cy.get('[data-cy="documentoPropostaEdital.0.formatoArquivo"]').click();
    cy.get('[data-cy="pdf"]').click();
      
    cy.get('[data-cy="documentoPropostaEdital.0.tamanhoArquivo"]')
      .clear()
      .type(`${10}`);
    cy.get(
      '[data-cy="documentoPropostaEdital.0.arquivoSubmissaoObrigatoria"]'
    ).click();
    cy.get(
      '[data-cy="documentoPropostaEdital.0.permiteSubmeterMultiplosArquivos"]'
    ).click();
    cy.get('[data-cy="documentoPropostaEdital-adicionar"]').click();
    //=========================================================

    cy.get(
      '[data-cy="documentoPropostaEdital--expandable-item"] > .MuiAccordionSummary-root'
    ).click();
    cy.get('[data-cy="documentoPropostaEdital.1.nome"]')
      .should("be.visible")
      .click()
      .type(`{selectall}{backspace}DOC 2`);
    cy.get('[data-cy="documentoPropostaEdital.1.descricao"]')
      .clear()
      .type(`Desc`);
    cy.get('[data-cy="documentoPropostaEdital.1.formatoArquivo"]').click();
    cy.get('[data-cy="pdf"]').click();
    cy.get('[data-cy="documentoPropostaEdital.1.tamanhoArquivo"]')
      .clear()
      .type(`${10}`);
    cy.get(
      '[data-cy="documentoPropostaEdital.1.arquivoSubmissaoObrigatoria"]'
    ).click();
    cy.get(
      '[data-cy="documentoPropostaEdital.1.permiteSubmeterMultiplosArquivos"]'
    ).click();

    // DOC pessoal
    cy.get('[data-cy="documentos-pessoais"]').click();

    // Documento 1 - CPF
    cy.get('[data-cy="documentoPessoalEdital-adicionar"]').click();
    cy.get('[data-cy="documentoPessoalEdital.0.documentoPessoalId"]').click();
    cy.get('[role="option"]').contains("CPF").click();
    cy.get('[data-cy="documentoPessoalEdital.0.obrigatorio"]').click();
    cy.get('[data-cy="documentoPessoalEdital-adicionar"]').click();

    // Documento 2 - RG
    cy.get('[data-cy="documentoPessoalEdital.1.documentoPessoalId"]').click();
    cy.get('[role="option"]').contains("RG").click();
    cy.get('[data-cy="documentoPessoalEdital.1.obrigatorio"]').click();
    cy.get('[data-cy="documentoPessoalEdital-adicionar"]').click();

    // Documento 3 - Comprovante de Residência
    cy.get('[data-cy="documentoPessoalEdital.2.documentoPessoalId"]').click();
    cy.get('[role="option"]').contains("Comprovante de Residência").click();
    cy.get('[data-cy="documentoPessoalEdital.2.obrigatorio"]').click();
    cy.get('[data-cy="documentoPessoalEdital-adicionar"]').click();

    // Documento 4 - Título de eleitor
    cy.get('[data-cy="documentoPessoalEdital.3.documentoPessoalId"]').click();
    cy.get('[role="option"]').contains("Título de eleitor").click();
    cy.get('[data-cy="documentoPessoalEdital.3.obrigatorio"]').click();
    cy.get('[data-cy="documentoPessoalEdital-adicionar"]').click();

    // Documento 5 - Passaporte
    cy.get('[data-cy="documentoPessoalEdital.4.documentoPessoalId"]').click();
    cy.get('[role="option"]').contains("Passaporte").click();
    cy.get('[data-cy="documentoPessoalEdital.4.obrigatorio"]').click();

    cy.contains("Próximo").click();

    // Indicadores de Produção
    cy.get('[data-cy="perguntas"]').click();
    cy.get('[data-cy="indicadores-de-producao"]').click();
    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="indicadorProducaoUnsaved.id"]').click();
    cy.get('[data-cy="producao-cultura"]').click();
    cy.get('[data-cy="indicadorProducao-confirmar"]').click();

    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="indicadorProducaoUnsaved.id"]').click();
    cy.get('[data-cy="producao-bibliog"]').click();
    cy.get('[data-cy="indicadorProducao-confirmar"]').click();

    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="indicadorProducaoUnsaved.id"]').click();
    cy.get('[data-cy="indicador-de-pro"]').click();
    cy.get('[data-cy="indicadorProducao-confirmar"]').click();

    // Bolsas
    cy.get('[data-cy="bolsas-do-edital"]').click();
    cy.get('[data-cy="bolsas"]').click();

    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="bolsaEditalUnsaved.modalidadeBolsaId"]').click();
    cy.get('[data-cy="exp"]').click();
    cy.get('[data-cy="bolsaEditalUnsaved.nivelBolsaId"]').click();
    cy.get('[data-cy="a-r-5-200-00"]').click();
    cy.get('[data-cy="bolsaEdital-confirmar"]').click();

    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="bolsaEditalUnsaved.modalidadeBolsaId"]').click();
    cy.get('[data-cy="at"]').click();
    cy.get('[data-cy="bolsaEditalUnsaved.nivelBolsaId"]').click();
    cy.get('[data-cy="nm-r-560-00"]').click();
    cy.get('[data-cy="bolsaEdital-confirmar"]').click();

    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="bolsaEditalUnsaved.modalidadeBolsaId"]').click();
    cy.get('[data-cy="dct"]').click();
    cy.get('[data-cy="bolsaEditalUnsaved.nivelBolsaId"]').click();
    cy.get('[data-cy="i-0-h-r-4-484-00"]').click();
    cy.get('[data-cy="bolsaEdital-confirmar"]').click();

    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="bolsaEditalUnsaved.modalidadeBolsaId"]').click();
    cy.get('[data-cy="set"]').click();
    cy.get('[data-cy="bolsaEditalUnsaved.nivelBolsaId"]').click();
    cy.get('[data-cy="a-0-h-1-180-00"]').click();
    cy.get('[data-cy="bolsaEdital-confirmar"]').click();

    cy.get('[data-cy="add-button"]').click();
    cy.get('[data-cy="bolsaEditalUnsaved.modalidadeBolsaId"]').click();
    cy.get('[data-cy="dti-cn-pq"]').click();
    cy.get('[data-cy="bolsaEditalUnsaved.nivelBolsaId"]').click();
    cy.get('[data-cy="b-0-h-r-670-00"]').click();
    cy.get('[data-cy="bolsaEdital-confirmar"]').click();

    //Finalizar
    cy.get('[data-cy="menu-salvar"]').click();
    cy.get('[data-cy="menu-finalizar"]').click();
});

Cypress.Commands.add('editalcompletoIndicadoresAdicionados', () => {
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
  cy.get('[data-cy="data-de-realizac"]').should("be.visible").click();
  cy.get('[data-cy="informacaoComplementarPergunta-adicionar"]').click();
  cy.get('[data-cy="informacaoComplementarPergunta--remover"]').click();

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

  cy.get('[data-cy="perguntaInfoId"]').click();
  cy.get('[data-cy="data-de-realizac"]').should("be.visible").click();
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
  cy.get(
    '[data-cy="orcamento"] > .MuiListItemText-root > .MuiTypography-root'
  ).click();
  cy.get(
    '[data-cy="programa"] > .MuiListItemText-root > .MuiTypography-root',
    { timeout: 3000 }
  ).click(); // Isso clica na subaba "Programa"
  cy.get('[data-cy="add-natureza-da-despesa"]').click();
  cy.get('[data-cy="programaId"]', { timeout: 7000 })
    .should("be.visible")
    .click();
  cy.get('[data-cy-index="programaId-item-0"]').click();
  cy.get('[data-cy="naturezaDespesaEditalUnsaved.naturezaDespesaId"]').click();
  cy.get('[data-cy="custeio"]').click();
  cy.get('[data-cy="naturezaDespesaEditalUnsaved.valor"]').type(`${100}`)
  cy.get('[data-cy="naturezaDespesaEdital-confirmar"]').click();

  // Rubricas
  cy.get(
    '[data-cy="rubricas"] > .MuiListItemText-root > .MuiTypography-root'
  ).click();

  cy.get('[data-cy="add-button"]').click();
  cy.get('[data-cy="editalRubricaUnsaved.tipoEditalRubrica"]').click();
  cy.get('[data-cy="hospedagem-e-ali"]').click();
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
  cy.get('[data-cy="servicos-de-terc"]').click();
  cy.get('[data-cy="editalRubricaUnsaved.naturezaDespesaId"]').click();
  cy.get('[data-cy="auxilio-a-pesqui"]').click();
  cy.get('[data-cy="editalRubrica-confirmar"]').click();
  //=============================================
  //=============================================
  cy.get('[data-cy="add-button"]').click();
  cy.get('[data-cy="editalRubricaUnsaved.tipoEditalRubrica"]').click();
  cy.get('[data-cy="material-de-cons"]').click();
  cy.get('[data-cy="editalRubricaUnsaved.naturezaDespesaId"]').click();
  cy.get('[data-cy="auxilio-a-pesqui"]').click();
  cy.get('[data-cy="editalRubrica-confirmar"]').click();
  //=============================================
  //=============================================
  cy.get('[data-cy="add-button"]').click();
  cy.get('[data-cy="editalRubricaUnsaved.tipoEditalRubrica"]').click();
  cy.get('[data-cy="material-permane"]').click();
  cy.get('[data-cy="editalRubricaUnsaved.naturezaDespesaId"]').click();
  cy.get('[data-cy="auxilio-a-pesqui"]').click();
  cy.get('[data-cy="editalRubrica-confirmar"]').click();
  //=============================================
  cy.get('[data-cy="add-button"]').click();
  cy.get('[data-cy="editalRubricaUnsaved.tipoEditalRubrica"]').click();
  cy.get('[data-cy="passagens"]').click();
  cy.get('[data-cy="editalRubricaUnsaved.naturezaDespesaId"]').click();
  cy.get('[data-cy="auxilio-a-pesqui"]').click();
  cy.get('[data-cy="editalRubrica-confirmar"]').click();
  //=============================================
  cy.get('[data-cy="add-button"]').click();
  cy.get('[data-cy="editalRubricaUnsaved.tipoEditalRubrica"]').click();
  cy.get('[data-cy="pessoal"]').click();
  cy.get('[data-cy="editalRubricaUnsaved.naturezaDespesaId"]').click();
  cy.get('[data-cy="auxilio-a-pesqui"]').click();
  cy.get('[data-cy="editalRubrica-confirmar"]').click();
  //=============================================

  // Documentos
  cy.get('[data-cy="documentos"]').click();
  cy.get('[data-cy="documentos-da-proposta"]').click();
  cy.get('[data-cy="documentoPropostaEdital-adicionar"]').click();

  cy.get(".MuiAccordionSummary-root").click();
  cy.get('[data-cy="documentoPropostaEdital.0.nome"]')
    .should("be.visible")
    .click()
    .type(`{selectall}{backspace}DOC 1`);
  cy.get('[data-cy="documentoPropostaEdital.0.descricao"]')
    .clear()
    .type(`Desc`);
  cy.get('[data-cy="documentoPropostaEdital.0.formatoArquivo"]').click();
  cy.get('[data-cy="pdf"]').click();
    
  cy.get('[data-cy="documentoPropostaEdital.0.tamanhoArquivo"]')
    .clear()
    .type(`${10}`);
  cy.get(
    '[data-cy="documentoPropostaEdital.0.arquivoSubmissaoObrigatoria"]'
  ).click();
  cy.get(
    '[data-cy="documentoPropostaEdital.0.permiteSubmeterMultiplosArquivos"]'
  ).click();
  cy.get('[data-cy="documentoPropostaEdital-adicionar"]').click();
  //=========================================================

  cy.get(
    '[data-cy="documentoPropostaEdital--expandable-item"] > .MuiAccordionSummary-root'
  ).click();
  cy.get('[data-cy="documentoPropostaEdital.1.nome"]')
    .should("be.visible")
    .click()
    .type(`{selectall}{backspace}DOC 2`);
  cy.get('[data-cy="documentoPropostaEdital.1.descricao"]')
    .clear()
    .type(`Desc`);
  cy.get('[data-cy="documentoPropostaEdital.1.formatoArquivo"]').click();
  cy.get('[data-cy="pdf"]').click();
  cy.get('[data-cy="documentoPropostaEdital.1.tamanhoArquivo"]')
    .clear()
    .type(`${10}`);
  cy.get(
    '[data-cy="documentoPropostaEdital.1.arquivoSubmissaoObrigatoria"]'
  ).click();
  cy.get(
    '[data-cy="documentoPropostaEdital.1.permiteSubmeterMultiplosArquivos"]'
  ).click();

  // DOC pessoal
  cy.get('[data-cy="documentos-pessoais"]').click();

  // Documento 1 - CPF
  cy.get('[data-cy="documentoPessoalEdital-adicionar"]').click();
  cy.get('[data-cy="documentoPessoalEdital.0.documentoPessoalId"]').click();
  cy.get('[role="option"]').contains("CPF").click();
  cy.get('[data-cy="documentoPessoalEdital.0.obrigatorio"]').click();
  cy.get('[data-cy="documentoPessoalEdital-adicionar"]').click();

  // Documento 2 - RG
  cy.get('[data-cy="documentoPessoalEdital.1.documentoPessoalId"]').click();
  cy.get('[role="option"]').contains("RG").click();
  cy.get('[data-cy="documentoPessoalEdital.1.obrigatorio"]').click();
  cy.get('[data-cy="documentoPessoalEdital-adicionar"]').click();

  // Documento 3 - Comprovante de Residência
  cy.get('[data-cy="documentoPessoalEdital.2.documentoPessoalId"]').click();
  cy.get('[role="option"]').contains("Comprovante de Residência").click();
  cy.get('[data-cy="documentoPessoalEdital.2.obrigatorio"]').click();
  cy.get('[data-cy="documentoPessoalEdital-adicionar"]').click();

  // Documento 4 - Título de eleitor
  cy.get('[data-cy="documentoPessoalEdital.3.documentoPessoalId"]').click();
  cy.get('[role="option"]').contains("Título de eleitor").click();
  cy.get('[data-cy="documentoPessoalEdital.3.obrigatorio"]').click();
  cy.get('[data-cy="documentoPessoalEdital-adicionar"]').click();

  // Documento 5 - Passaporte
  cy.get('[data-cy="documentoPessoalEdital.4.documentoPessoalId"]').click();
  cy.get('[role="option"]').contains("Passaporte").click();
  cy.get('[data-cy="documentoPessoalEdital.4.obrigatorio"]').click();

  cy.contains("Próximo").click();

  // Indicadores de Produção
  cy.get('[data-cy="perguntas"]').click();
  cy.get('[data-cy="indicadores-de-producao"]').click();

  // Adiciona 3 indicadores
  cy.get('[data-cy="add-button"]').click();
  cy.get('[data-cy="indicadorProducaoUnsaved.id"]').click();
  cy.get('[data-cy="producao-cultura"]').click();
  cy.get('[data-cy="indicadorProducao-confirmar"]').click();

  cy.get('[data-cy="add-button"]').click();
  cy.get('[data-cy="indicadorProducaoUnsaved.id"]').click();
  cy.get('[data-cy="producao-bibliog"]').click();
  cy.get('[data-cy="indicadorProducao-confirmar"]').click();

  cy.get('[data-cy="add-button"]').click();
  cy.get('[data-cy="indicadorProducaoUnsaved.id"]').click();
  cy.get('[data-cy="indicador-de-pro"]').click();
  cy.get('[data-cy="indicadorProducao-confirmar"]').click();

  // Verifica se os 3 indicadores foram adicionados
  cy.get('[data-cy="indicadorProducao-list"] .MuiAccordionSummary-root')
    .should('have.length.at.least', 3);

  // Bolsas
  cy.get('[data-cy="bolsas-do-edital"]').click();
  cy.get('[data-cy="bolsas"]').click();

  // Adiciona 5 bolsas
  cy.get('[data-cy="add-button"]').click();
  cy.get('[data-cy="bolsaEditalUnsaved.modalidadeBolsaId"]').click();
  cy.get('[data-cy="exp"]').click();
  cy.get('[data-cy="bolsaEditalUnsaved.nivelBolsaId"]').click();
  cy.get('[data-cy="a-r-5-200-00"]').click();
  cy.get('[data-cy="bolsaEdital-confirmar"]').click();

  cy.get('[data-cy="add-button"]').click();
  cy.get('[data-cy="bolsaEditalUnsaved.modalidadeBolsaId"]').click();
  cy.get('[data-cy="at"]').click();
  cy.get('[data-cy="bolsaEditalUnsaved.nivelBolsaId"]').click();
  cy.get('[data-cy="nm-r-560-00"]').click();
  cy.get('[data-cy="bolsaEdital-confirmar"]').click();

  cy.get('[data-cy="add-button"]').click();
  cy.get('[data-cy="bolsaEditalUnsaved.modalidadeBolsaId"]').click();
  cy.get('[data-cy="dct"]').click();
  cy.get('[data-cy="bolsaEditalUnsaved.nivelBolsaId"]').click();
  cy.get('[data-cy="i-0-h-r-4-484-00"]').click();
  cy.get('[data-cy="bolsaEdital-confirmar"]').click();

  cy.get('[data-cy="add-button"]').click();
  cy.get('[data-cy="bolsaEditalUnsaved.modalidadeBolsaId"]').click();
  cy.get('[data-cy="set"]').click();
  cy.get('[data-cy="bolsaEditalUnsaved.nivelBolsaId"]').click();
  cy.get('[data-cy="a-0-h-1-180-00"]').click();
  cy.get('[data-cy="bolsaEdital-confirmar"]').click();

  cy.get('[data-cy="add-button"]').click();
  cy.get('[data-cy="bolsaEditalUnsaved.modalidadeBolsaId"]').click();
  cy.get('[data-cy="dti-cn-pq"]').click();
  cy.get('[data-cy="bolsaEditalUnsaved.nivelBolsaId"]').click();
  cy.get('[data-cy="b-0-h-r-670-00"]').click();
  cy.get('[data-cy="bolsaEdital-confirmar"]').click();

  // Verifica se as 5 bolsas foram adicionadas
  cy.get('[data-cy="bolsaEdital-list"] .MuiAccordionSummary-root')
    .should('have.length.at.least', 5);

  //Finalizar
  cy.get('[data-cy="menu-salvar"]').click();
  cy.get('[data-cy="menu-finalizar"]').click();
});
