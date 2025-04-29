import '@testing-library/cypress/add-commands'

// Custom command to wait for game to be ready
Cypress.Commands.add('waitForGameReady', () => {
  cy.get('.game-board').should('exist')
  cy.get('.snake-segment').should('exist')
  cy.get('.apple').should('exist')
})

// Custom command to simulate game over
Cypress.Commands.add('simulateGameOver', () => {
  // Move snake to wall
  for (let i = 0; i < 20; i++) {
    cy.get('body').type('{rightarrow}')
    cy.wait(100)
  }
  cy.get('.game-over').should('exist')
})

// Custom command to eat an apple
Cypress.Commands.add('eatApple', () => {
  cy.get('body').type('{rightarrow}')
  cy.wait(1000)
  cy.contains('Score: 1').should('exist')
}) 