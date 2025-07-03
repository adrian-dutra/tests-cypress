import { getCurrentDateTime } from '../helpers/date.helper';

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
  it.only('Realiza login no sistema e cria um edital simples', () => { //Teste edital simples, se houver mais de um teste, o it.only executa apenas esse teste.
    cy.editalsimples(); //Chama o comando editalsimples para realizar o teste de criação de edital simples
  }); //Aguarda 300ms para garantir que a página foi carregada completamente

  it.only('C3 - Realizar teste de sql injection', () => {
    cy.editalsimples_sqlInjection();
  });
});
