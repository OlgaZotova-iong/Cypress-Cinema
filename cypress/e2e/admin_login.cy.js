describe('Авторизация в админ-панели', () => {
  let selectors;
  let data;

  beforeEach(() => {
    cy.intercept('POST', '**/auth.php').as('loginRequest');
    cy.fixture('selectors').then((s) => { selectors = s; });
    cy.fixture('adminData').then((d) => { data = d; });
    cy.visit('/admin');
  });

  it('Успешная авторизация (happy path)', () => {
    cy.get(selectors.admin.email).type(data.happyPath.email);
    cy.get(selectors.admin.password).type(data.happyPath.password);
    cy.get(selectors.admin.loginButton).click();
    cy.url().should('include', '/admin/index.php');
    cy.contains('Управление залами').should('be.visible');
  });

  it('Неуспешная авторизация (sad path)', () => {
    cy.get(selectors.admin.email).type(data.sadPath.email);
    cy.get(selectors.admin.password).type(data.sadPath.password);
    cy.get(selectors.admin.loginButton).click();
    cy.contains('Ошибка авторизации!').should('be.visible'); // В приложении обычно есть алерт или текст
  });
});


