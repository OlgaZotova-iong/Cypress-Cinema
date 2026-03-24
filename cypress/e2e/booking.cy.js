describe('Бронирование билетов на основе данных из админки', () => {
  let selectors;
  let data;

  beforeEach(() => {
    cy.fixture('selectors').then((s) => { selectors = s; });
    cy.fixture('adminData').then((d) => { data = d; });
  });

  it('Бронирование в зале, полученном из админки', () => {
    // 1. Авторизация в админке
    cy.visit('/admin');
    cy.get(selectors.admin.email).type(data.happyPath.email);
    cy.get(selectors.admin.password).type(data.happyPath.password);
    cy.get(selectors.admin.loginButton).click();

    cy.url().should('include', '/admin/index.php');

    // 2. Получаем название зала
    cy.get(selectors.admin.hallItems).first().should('be.visible').then(($li) => {
      const hallName = $li.clone().children().remove().end().text().trim();
      cy.log('Ищем сеансы для зала: ' + hallName);

      // 3. Переход на главную
      cy.visit('/');
      cy.get(selectors.mainPage.navDays).first().click(); 

      // 4. Поиск сеанса
      cy.contains(selectors.mainPage.seanceHall, hallName)
        .closest('.movie-seances__hall')
        .find(selectors.mainPage.seanceTime)
        .first()
        .click();

      // 5. Выбор места
      cy.get(selectors.booking.chairStandart)
        .not(selectors.booking.chairTaken)
        .first()
        .click();

      // Кнопка "Забронировать" на странице hall.php
      cy.get(selectors.booking.acceptButton).click();

      // Кнопка "Забронировать" на странице payment.php
      cy.get(selectors.booking.acceptButton).click();

      // 6. Проверка QR-кода на странице ticket.php
      cy.get(selectors.booking.qrCode).should('be.visible');
    });
  });
});





