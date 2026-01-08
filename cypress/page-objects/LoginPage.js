import { generateRandomLogin, generateValidLogin } from "../utils/fakerUtils"

class LoginPage {

    visit() {
        cy.visit('https://demo4.dexmanager.com/DexFrontEnd/#!/login')
    }

    getLoginForm() {
        return cy.get('dex-app')
        .shadow()
        .find('iron-pages')
        .find('dex-login')
        .shadow()
        .find('form')
    }

    fillUserAndPass(user, password) {
        this.getLoginForm()
          .find('paper-input')
          .shadow()
          .find('paper-input-container')
          .eq(0)
          .find('iron-input')
          .within(() => {
              cy.get('input').type(user)
          })

        this.getLoginForm()
          .find('paper-input')
          .shadow()
          .find('paper-input-container')
          .eq(1)
          .find('iron-input')
          .within(() => {
              cy.get('input').type(password)
          })

        this.getLoginForm()
          .find('paper-button')
          .eq(0)
          .click()
    }

} export default new LoginPage()