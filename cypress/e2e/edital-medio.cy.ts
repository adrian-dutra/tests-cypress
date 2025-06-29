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
});