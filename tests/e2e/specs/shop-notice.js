/*
 * @Author: 方振起
 * @Date: 2019-08-16 17:17:40
 * @Last Modified by:   方振起
 * @Last Modified time: 2019-08-16 17:17:40
 */

import { login } from '../utils/login';

describe('My First Test', () => {
  before(login);
  it('shop-notice', () => {
    cy.visit('/shop-notice');
    cy.get('[data-cy=add]').click();
    cy.wait(1000);
    cy.get('.container > :nth-child(1) > .v-input__control > .v-input__slot > .v-select__slot > .v-input__append-inner > .v-input__icon > .v-icon').click();
    cy.wait(1000);
    cy.get('.v-list-item__content:nth-child(1)').click();
    cy.wait(1000);
    cy.get(':nth-child(2) > .v-input__control > .v-input__slot > .v-select__slot > .v-select__selections').click();
    cy.wait(1000);
    cy.get('[aria-labelledby*=店长-list-item]').click();
    cy.wait(1000);
    cy.get('[data-cy=search]').type('f');
    cy.get('.v-input__append-outer > .v-input__icon > .v-icon').click();
    cy.wait(1000);
    cy.get(':nth-child(1) > .py-0.col > .px-0 > .v-list-item__content > .v-list-item__subtitle > .radio-style').click();
    cy.wait(1000);
    cy.get('[data-cy=confirm]').click();
    cy.wait(1000);
    cy.get(':nth-child(1) > .v-card > .flex > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple').click();
    cy.wait(1000);
    cy.get('[data-cy=del0]').click();
    cy.wait(1000);
    cy.get('[data-cy=search]').click();
    cy.wait(1000);
    cy.get(':nth-child(1) > .v-input > .v-input__control > .v-input__slot > .v-select__slot > .v-input__append-inner > .v-input__icon > .v-icon').click();
    cy.wait(1000);
    cy.get('[id*="明尚-list-item"]').click();
    cy.wait(1000);
    cy.get('[data-cy="nickName"]').type('t');
    cy.wait(1000);
    cy.get('[data-cy="doFilter"]').click();
  });
});
