/*
 * @Author: 方振起
 * @Date: 2019-08-16 17:17:56
 * @Last Modified by: 方振起
 * @Last Modified time: 2019-08-16 17:27:11
 */

import { login } from '../utils/login';

describe('My First Test', () => {
  before(login);
  it('ledger-stock-log', () => {
    cy.visit('/ledger-stock-log');
    cy.wait(1000);
    cy.get('[data-cy=search]').click();
    cy.wait(1000);
    cy.get('[data-cy=doFilter]').click();
    cy.wait(1000);
    cy.get('[data-cy=stock0]').click();
  });
});
