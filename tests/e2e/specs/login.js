// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  beforeEach(function() {
    // 对 $btn.text() 取个别名叫 'text'
  });
  it('user', () => {
    cy.visit('/login');
    cy.get('#submit').click();
    cy.wait(1000);
    cy.get('#userName').type('admin');
    cy.get('#submit').click();
    cy.wait(1000);
    cy.get('#userName').clear();
    cy.get('#passWord').type('2222');
    cy.get('#submit').click();
    cy.wait(1000);
    cy.get('#userName').type('admin');
    cy.get('#submit').click();
  });

  after(() => {
    cy.get('[data-cy=btnOut]').click();
  });
});
