/* eslint-disable no-undef */
describe('Vista de Flota - Manejo de Red', () => {
    beforeEach(() => {
        cy.clearLocalStorage()
        const authState = {
            token: 'token-simulado-cypress',
            user: { name: 'Cmdr. Shepard', avatar: 'user-astronaut' },
        }

        cy.window().then((win) => {
            win.localStorage.setItem('auth', JSON.stringify(authState))
        })

        cy.intercept({ method: 'GET', url: '**/v4/rockets' }, { fixture: 'rockets.json' }).as(
            'getRockets',
        )
        cy.visit('/rockets')
    })

    it('renderiza la lista de cohetes utilizando los datos de la red interceptada', () => {
        cy.wait('@getRockets')
        cy.contains('Cypress Rocket 1').should('be.visible')
        cy.contains('Cohete de prueba inyectado por Cypress').should('be.visible')
    })

    it('muestra la pantalla de error si la API falla', () => {
        cy.intercept('GET', '**/v4/rockets', { statusCode: 500, body: 'Error de servidor' }).as(
            'getFailedRockets',
        )
        cy.visit('/rockets')
        cy.wait('@getFailedRockets')

        cy.contains('Error de Sincronización').should('be.visible')
    })
})
