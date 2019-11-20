/*
 * @Author: 方振起
 * @Date: 2019-08-19 10:06:11
 * @Last Modified by: 方振起
 * @Last Modified time: 2019-08-19 14:42:32
 */

import { login } from '../utils/login';

describe('My First Test', () => {
  before(login);
  it('notice', () => {
    cy.visit('/notice');
    cy.wait(1000);
    cy.get('[data-cy=add]').click();
    cy.wait(1000);
    cy.get('[data-cy=title]').type('e2e测试');
    cy.wait(1000);
    cy.get('[data-cy=content]').type('端到端测试');
    cy.wait(1000);
    cy.get('[ data-cy=confirm]').click();
    cy.wait(1000);
    cy.get('[data-cy=searchText]').type('e2e');
    cy.wait(1000);
    cy.get('.v-input__append-outer > .v-input__icon > .v-icon').click();
    cy.wait(1000);
    cy.get('[data-cy=edit0]').click();
    cy.wait(1000);
    cy.get('[data-cy=title]').type('e2e测试-在测试');
    cy.wait(1000);
    cy.get('[ data-cy=confirm]').click();
    cy.wait(1000);
    cy.get('[data-cy=del0]').click();
  });
});
