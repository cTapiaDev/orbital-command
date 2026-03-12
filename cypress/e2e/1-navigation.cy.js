/* eslint-disable no-undef */
describe('Navegación Principal de Orbital Command', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('carga la vista del Dashboard correctamente en la raíz', () => {
        cy.contains('Bienvenido a bordo, Cmdr. Shepard').should('be.visible')
        cy.url().should('eq', Cypress.config().baseUrl + '/')
    })

    it('navega a la Flota al hacer clic en el menú', () => {
        cy.get('nav').contains('Flota').click()
        cy.url().should('include', '/rockets')
        cy.get('h2').contains('Flota SpaceX').should('be.visible')
    })

    it('muestra la página 404 si el usuario ingresa una ruta inválida', () => {
        cy.visit('/ruta-falsa', { failOnStatusCode: false })
        cy.contains('404').should('be.visible')
        cy.contains('Señal Perdida').should('be.visible')
        cy.contains('Volver a la Base').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/')
    })
})
