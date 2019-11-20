/*
 * @Author: 吴占超
 * @Date: 2019-08-07 13:44:38
 * @Last Modified by: 吴占超
 * @Last Modified time: 2019-08-07 13:46:16
 */
// https://docs.cypress.io/api/introduction/api.html
import { login, logout } from '../utils/login';

describe('My First Test', () => {
  before(login);

  it('user', () => {
    cy.visit('/user');
    cy.get('#search').type('a');
    cy.get('.v-input__append-outer').click();
    cy.wait(3000);
    cy.get('#search').clear('');
    cy.get('.v-input__append-outer').click();
  });

  after(logout);
});
