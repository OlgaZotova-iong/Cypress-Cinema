describe('Бронирование билетов на основе данных из админки', () => {
  let selectors;
  let data;

  beforeEach(() => {
    cy.fixture('selectors').then((s) => { selectors = s; });
    cy.fixture('adminData').then((d) => { data = d; });
  });

  it('Бронирование в зале, полученном из админки', () => {
    cy.visit('/admin');
    cy.get(selectors.admin.email).type(data.happyPath.email);
    cy.get(selectors.admin.password).type(data.happyPath.password);
    cy.get(selectors.admin.loginButton).click();

    cy.url().should('include', '/admin/index.php');

    cy.get(selectors.admin.hallItems).first().should('be.visible').then(($li) => {
      const hallName = $li.clone().children().remove().end().text().trim();
      cy.log('Ищем сеансы для зала: ' + hallName);

      cy.visit('/');
      cy.get(selectors.mainPage.navDays).first().click(); 

      cy.contains(selectors.mainPage.seanceHall, hallName)
        .closest('.movie-seances__hall')
        .find(selectors.mainPage.seanceTime)
        .first()
        .click();

      cy.get(selectors.booking.chairStandart)
        .not(selectors.booking.chairTaken)
        .first()
        .click();

      cy.get(selectors.booking.acceptButton).click();

      cy.get(selectors.booking.acceptButton).click();

      cy.get(selectors.booking.qrCode).should('be.visible');
    });
  });
});





