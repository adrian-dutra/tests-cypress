describe('Sistema Integrado de Gestão para Fundações de Amparo a Pesquisas', () => {
  beforeEach(() => {
    // Gancho em nível raíz
    // executa antes de realizar cada teste(it)
    cy.typelogin(
      'https://novo-sig.ledes.net/',// [URL do sistema]
      'grupo14_gestor@sig.com', // [E-mail do usuário]
      'Grupo14@sig', // [Senha do usuário]
    ); //Acessa a página de login usando as credenciais do usuário e senha.
  });
  it('Realiza login no sistema e submete uma proposta', () => {
    cy.get('[data-cy="breadcrumb-home"]').click(); //Clica no botão "Home" para retornar à página anterior
    cy.get('[data-cy="editais-ver-mais"]').click(); //Clica no botão "Ver Mais" para acessar a página de Editais

    cy.get('[data-cy="visualizar-edital-grupo-14-e-m-002"]').click(); //Edite essa linha para selecionar o Edital respectivo

    cy.wait(300); //Aguarda 300ms para garantir que a página foi carregada completamente
    cy.get('[data-cy="criar-proposta"]').click(); //Clica no botão "Criar Proposta" para iniciar o processo de criação de uma nova proposta
    cy.get('[data-cy="tituloDoProjeto"]').type(
        'Submissão de Proposta Cypress', //Preenche o campo "Título do Projeto" com o valor "Submissão de Proposta de Teste"
        { delay: 0 },
    )
    cy.get('[data-cy="termos"]').click();
    cy.get('[data-cy="termo-de-aceite"]').click();
    cy.get('[data-cy="termoDeAceiteAceito"]').click();

    cy.get('[data-cy="menu-salvar"]').click();
  }); 
});