/*
 * @Author: 吴占超
 * @Date: 2019-08-07 13:41:59
 * @Last Modified by: 吴占超
 * @Last Modified time: 2019-08-07 13:48:13
 */
const login = () => {
  cy.visit('/');
  cy.get('#userName').type('admin');
  cy.get('#passWord').type('2222');
  cy.get('#submit').click();
  cy.wait(3000);
};

const logout = () => {
  cy.get('#btnOut').click();
  cy.wait(3000);
};
export default { login, logout };
