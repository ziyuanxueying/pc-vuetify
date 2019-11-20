/*
 * @Author: 方振起
 * @Date: 2019-08-19 15:09:57
 * @Last Modified by: 方振起
 * @Last Modified time: 2019-08-19 15:19:30
 */

import { login } from '../utils/login';

describe('My First Test', () => {
  before(login);
  it('version', () => {
    cy.visit('/version');
    cy.wait(1000);
    cy.get('[data-cy=add]').click();
    cy.wait(1000);
    cy.get('[data-cy=title]').type('新版本发布啦');
    cy.wait(1000);
    cy.get('[data-cy=versionNumber]').type('1.0.01');
    cy.wait(1000);
    cy.get('[data-cy=content]').type('升级了新功能');
    cy.wait(1000);
    cy.get('[ data-cy=confirm]').click();
    cy.wait(1000);
    cy.get('[data-cy=searchText]').type('新版本发布');
    cy.wait(1000);
    cy.get('.v-input__append-outer > .v-input__icon > .v-icon').click();
    cy.wait(1000);
    cy.get('[data-cy=edit0]').click();
    cy.wait(1000);
    cy.get('[data-cy=title]').type('哈哈');
    cy.wait(1000);
    cy.get('[ data-cy=confirm]').click();
    cy.wait(1000);
    cy.get('[data-cy=del0]').click();
  });
});
