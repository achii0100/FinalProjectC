describe('User Authentication', () => {
  let user
  before(() => {
    cy.fixture('loginData').then((info) => {
      const random = Date.now();
      user = {
        email: info.logEmail + random + '@gmail.com',
        pass: info.logPass
      }
    })
  })
  it('Register User with valid Data', () => {
    cy.fixture('userData').then((dat) => {
      // 1.Visit Site-'https://testzootopia.loremipsum.ge/ka'
      cy.visit('https://testzootopia.loremipsum.ge/ka')
      // 2.Click 'შესვლა'
      cy.contains('შესვლა').click({ force: true })
      // 3.Click 'გაიარეთ რეგისტრაცია'
      cy.contains('გაიარეთ რეგისტრაცია').click()
      // 4.Verify 'რეგისტრაცია' is visible
      cy.contains("რეგისტრაცია").should("be.visible")
      // 6.Enter Valid 'ელ.ფოსტა'
      cy.get('[name="reg_email"]').type(user.email)
      // 9.Enter Valid 'პაროლი'
      cy.get('[name="reg_password"]').type(user.pass)
      // 5.Enter valid 'სახელი გვარი'
      // 7.Enter Valid 'პირადი ნომერი'
      // 8.Enter Valid 'ტელ'
      // 10.Enter Valid 'პაროლის გამეორება'
      cy.regDet(dat)
      // 11.Click 'ვეთანხმები წესებსა და პირობებს'
      cy.get('#etx').check({ force: true })
      // 12.Click 'რეგისტრაცია'
      cy.get('button[type="submit"].regsub').click()
      // 13.Verify 'Sorry, the page you are looking for could not be found.' is visible.
      cy.contains("Sorry, the page you are looking for could not be found.").should("be.visible")
      // 14.Click 'GO HOME'
      cy.contains('button', 'Go Home').click()
      // 15.Verify 'პროფილი' is visible.
      cy.contains("პროფილი").first().should("be.visible")
    })
  })
  it('Log In with valid Data', () => {
    // 1.Visit Site-'https://testzootopia.loremipsum.ge/ka'
    cy.visit('https://testzootopia.loremipsum.ge/ka')
    // 2.Click 'შესვლა'
    cy.contains('შესვლა').click({ force: true })
    // 3.Verify 'ავტორიზაცია' is visible
   cy.contains('button', 'ავტორიზაცია').should('be.visible')
    // 4.Enter Valid 'ელ.ფოსტა'
    cy.get('[name="login_email"]').type(user.email)
    // 5.Enter Valid 'პაროლი'
    cy.get('[name="login_password"]').type(user.pass)
    // 6.Click 'ავტორიზაცია'
    cy.contains('button', 'ავტორიზაცია').click()
    // 15.Verify 'პროფილი' is visible.
    cy.contains("პროფილი").first().should("be.visible")
  })
})

describe('Incorrect Login', () => {
  it('Log In with Unregistered User', () => {
    cy.fixture('incorData').then((inc) => {
      // 1.Visit Site-'https://testzootopia.loremipsum.ge/ka'
      cy.visit('https://testzootopia.loremipsum.ge/ka')
      // 2.Click 'შესვლა'
      cy.contains('შესვლა').click({ force: true })
      // 3.Verify 'ავტორიზაცია' is visible
      cy.contains('button', 'ავტორიზაცია').should('be.visible')
      // 4.Enter Invalid email in 'ელ.ფოსტა'
      // 5.Enter Invalid password in 'პაროლი'
      cy.incLog(inc)
      // 6.Click 'ავტორიზაცია'
      cy.contains('button', 'ავტორიზაცია').click()
      // 7.Hover over warning icon
      cy.get('.alert img').first().trigger('mouseover')
      // 8.Verify 'არასწორი ელ.ფოსტა ან პაროლი' message is displayed
      cy.get('.alert-text').first().should('exist').and('contain', 'არასწორი ელ.ფოსტა ან პაროლი')
    })
  })
})

describe('Basket', () => {
  it('Add product in Basket without Registration', () => {
    // 1.Visit Site-'https://testzootopia.loremipsum.ge/ka'
    cy.visit('https://testzootopia.loremipsum.ge/ka')
    // 2.Find '100% ხარისხიანი პროდუქტი თქვენი კატებისათვის' on the Home Page
    cy.contains('100% ხარისხიანი პროდუქტი თქვენი კატებისათვის').should('be.visible')
    // 3.Click 'პროდუქციის ნახვა'
    cy.contains('h2', '100% ხარისხიანი პროდუქტი თქვენი კატებისათვის')
      .parent()
      .find('a.seepro')
      .click()
    // 4.Verify 'კატები' is visible
    cy.contains('კატები').should('be.visible')
    // 5.Click Basket icon on any product
    cy.get('[data-id="72"]').click()
    // 6.Click 'კალათა'
    cy.get('a[href*="/cart"]').first().click({ force: true })
    // 7.Verify that selected product is visible 
    cy.contains('Bosch My Friend Cat 10 kg').should('be.visible')
  })
  it('Payment from Basket without registration', () => {
    // 1.Visit Site-'https://testzootopia.loremipsum.ge/ka'
    cy.visit('https://testzootopia.loremipsum.ge/ka')
    // 2.Find '100% ხარისხიანი პროდუქტი თქვენი კატებისათვის' on the Home Page
    cy.contains('100% ხარისხიანი პროდუქტი თქვენი კატებისათვის').should('be.visible')
    // 3.Click 'პროდუქციის ნახვა'
    cy.contains('h2', '100% ხარისხიანი პროდუქტი თქვენი კატებისათვის')
      .parent()
      .find('a.seepro')
      .click()
    // 4.Verify 'კატები' is visible
    cy.contains('კატები').should('be.visible')
    // 5.Click Basket icon on any product
    cy.get('[data-id="72"]').click()
    // 6.Click 'კალათა'
    cy.get('a[href*="/cart"]').first().click({ force: true })
    // 7.Find 'გადახდა' on the Basket Page
    cy.contains('button','გადახდა').should('be.visible')
    // 8.Click 'გადახდა'
      cy.contains('button','გადახდა').click()
    // 9. Verify that login popup is displayed
    cy.contains('button', 'ავტორიზაცია').should('be.visible')
  })
})