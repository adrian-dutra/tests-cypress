import { getCurrentDateTime } from '../helpers/date.helper';

describe('Testes de Criação de Edital - Fluxo Médio', () => {
  // O hook beforeEach executa antes de cada teste ('it')
  // Garantindo que o login seja feito antes de qualquer outra ação.
  beforeEach(() => {
    cy.typelogin(
      'https://novo-sig.ledes.net/', // URL do sistema
      'grupo14_gestor@sig.com',      // E-mail do usuário
      'Grupo14@sig',                 // Senha do usuário
    );
  });

  // Usamos .only para focar a execução apenas neste teste durante o desenvolvimento
  it('Deve criar um Edital do tipo Médio preenchendo todos os campos necessários', () => {
    cy.editalmedio();
  });

  it('TC-EDT-010 - Deve aceitar caracteres especiais no termo de aceite', () => {
    cy.editalmedioTermoEspecial();
  });
  
  it('C6 - Deve criar um edital medio e aceitar um titulo muito grande', () => {
    cy.editalMedioTituloMuitoTexto();
  });

  it('C7 - Deve acusar erro caso caso o edital seja finalizado com definir duração em meses marcado, mas não existir duração em meses', () => {
    cy.editalMedioDuracaoDeProjetosVazio();
  });

  it('C8 - Deve acusar acusar erro quando duração do projeto em meses é negativo', () => {
    cy.editalMedioDuracaoDeProjetosNegativo();
  });


});