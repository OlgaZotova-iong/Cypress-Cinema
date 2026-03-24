describe('Главная страница', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Отображение базовых элементов', () => {
    cy.get('.page-header__title').should('have.text', 'Идёмвкино');
    cy.get('.page-nav__day').should('have.length', 7);
    cy.get('.movie').should('have.length.at.least', 1);
  });
});


