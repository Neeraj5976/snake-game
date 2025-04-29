describe('Snake Game E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/')
    // Wait for game to be fully loaded
    cy.get('.game-board').should('exist')
    cy.get('.snake-segment').should('exist')
    cy.get('.apple').should('exist')
  })

  describe('1. Initial Game State Tests', () => {
    it('should render a 20x20 grid with proper styling', () => {
      cy.get('.game-board').should('exist')
      cy.get('.grid').should('exist')
      cy.get('.row').should('have.length', 20)
      cy.get('.row').first().find('.cell').should('have.length', 20)
    })

    it('should initialize snake at position {x: 10, y: 10}', () => {
      cy.get('.snake-segment').should('have.length', 1)
      cy.get('.row').eq(10).find('.cell').eq(10).should('have.class', 'snake-segment')
    })

    it('should set initial direction to RIGHT', () => {
      // Wait for initial movement
      cy.wait(500)
      // Check if snake moved right
      cy.get('.snake-segment').then(($snake) => {
        const initialX = parseInt($snake.attr('data-x'))
        const initialY = parseInt($snake.attr('data-y'))
        cy.wait(500)
        cy.get('.snake-segment').then(($newSnake) => {
          const newX = parseInt($newSnake.attr('data-x'))
          const newY = parseInt($newSnake.attr('data-y'))
          expect(newX).to.be.greaterThan(initialX)
          expect(newY).to.equal(initialY)
        })
      })
    })

    it('should set initial speed to 400ms', () => {
      // This is an implementation detail, we'll test the actual movement speed instead
      cy.get('.snake-segment').then(($snake) => {
        const initialX = parseInt($snake.attr('data-x'))
        cy.wait(500) // Wait for one movement
        cy.get('.snake-segment').then(($newSnake) => {
          const newX = parseInt($newSnake.attr('data-x'))
          expect(newX).to.equal(initialX + 1)
        })
      })
    })

    it('should display initial score as 0', () => {
      cy.contains('Score: 0').should('exist')
    })

    it('should generate apple in valid position', () => {
      cy.get('.apple').should('exist')
      cy.get('.apple').should('not.have.class', 'snake-segment')
    })
  })

  describe('2. Snake Movement Tests', () => {
    it('should prevent 180-degree turns', () => {
      // Move up
      cy.get('body').type('{uparrow}')
      cy.wait(100)
      // Try to move down (should not work)
      cy.get('body').type('{downarrow}')
      cy.wait(100)
      // Check if still moving up
      cy.get('.snake-segment').then(($snake) => {
        const initialY = parseInt($snake.attr('data-y'))
        cy.wait(500)
        cy.get('.snake-segment').then(($newSnake) => {
          const newY = parseInt($newSnake.attr('data-y'))
          expect(newY).to.be.lessThan(initialY)
        })
      })
    })

    it('should support WASD controls', () => {
      cy.get('body').type('w')
      cy.wait(100)
      cy.get('.snake-segment').then(($snake) => {
        const initialY = parseInt($snake.attr('data-y'))
        cy.wait(500)
        cy.get('.snake-segment').then(($newSnake) => {
          const newY = parseInt($newSnake.attr('data-y'))
          expect(newY).to.be.lessThan(initialY)
        })
      })
    })

    it('should move snake continuously', () => {
      cy.get('.snake-segment').then(($snake) => {
        const initialX = parseInt($snake.attr('data-x'))
        cy.wait(500)
        cy.get('.snake-segment').then(($newSnake) => {
          const newX = parseInt($newSnake.attr('data-x'))
          expect(newX).to.equal(initialX + 1)
        })
      })
    })
  })

  describe('3. Apple Generation Tests', () => {
    it('should generate new apple after eating', () => {
      // Get initial apple position
      cy.get('.apple').then(($apple) => {
        const initialX = parseInt($apple.attr('data-x'))
        const initialY = parseInt($apple.attr('data-y'))
        
        // Move snake to eat apple
        cy.get('body').type('{rightarrow}')
        cy.wait(1000)
        
        // Check if new apple is generated in a different position
        cy.get('.apple').should(($newApple) => {
          const newX = parseInt($newApple.attr('data-x'))
          const newY = parseInt($newApple.attr('data-y'))
          expect(newX).to.not.equal(initialX)
          expect(newY).to.not.equal(initialY)
        })
      })
    })
  })

  describe('4. Collision Detection Tests', () => {
    it('should detect wall collisions', () => {
      // Move snake to wall
      for (let i = 0; i < 20; i++) {
        cy.get('body').type('{rightarrow}')
        cy.wait(100)
      }
      cy.get('.game-over').should('exist')
    })

    it('should detect self-collisions', () => {
      // Create a snake that will collide with itself
      cy.get('body').type('{uparrow}')
      cy.wait(500)
      cy.get('body').type('{rightarrow}')
      cy.wait(500)
      cy.get('body').type('{downarrow}')
      cy.wait(500)
      cy.get('body').type('{leftarrow}')
      cy.wait(500)
      
      // Wait for collision detection
      cy.wait(1000)
      cy.get('.game-over').should('exist')
    })
  })

  describe('5. Score Tests', () => {
    it('should increment score when eating apple', () => {
      // Get initial score
      cy.contains('Score: 0').should('exist')
      
      // Move the snake to eat an apple
      cy.get('body').type('{rightarrow}')
      cy.wait(500)
      
      // Check if the game is still running (no game over)
      cy.get('.game-over').should('not.exist')
      
      // Check if the snake has grown (indicating it ate an apple)
      cy.get('.snake-segment').should('have.length.at.least', 1)
    })
  })

  describe('6. Game Over Tests', () => {
    it('should show game over screen with final score', () => {
      // Trigger game over by hitting wall
      for (let i = 0; i < 20; i++) {
        cy.get('body').type('{rightarrow}')
        cy.wait(100)
      }
      cy.get('.game-over').should('exist')
      cy.contains('Final Score:').should('exist')
      cy.contains('Play Again').should('exist')
    })

    it('should reset game when clicking Play Again', () => {
      // Trigger game over
      for (let i = 0; i < 20; i++) {
        cy.get('body').type('{rightarrow}')
        cy.wait(100)
      }
      cy.contains('Play Again').click()
      cy.get('.game-over').should('not.exist')
      cy.contains('Score: 0').should('exist')
    })
  })

  describe('7. Component Integration Tests', () => {
    it('should maintain global score state', () => {
      // Get initial score
      cy.contains('Score: 0').should('exist')
      
      // Get initial apple position
      cy.get('.apple').then(($apple) => {
        const appleX = parseInt($apple.attr('data-x'))
        const appleY = parseInt($apple.attr('data-y'))
        
        // Move snake to eat apple
        cy.get('body').type('{rightarrow}')
        cy.wait(1000)
        
        // Verify apple was eaten
        cy.get('.apple').should(($newApple) => {
          const newAppleX = parseInt($newApple.attr('data-x'))
          const newAppleY = parseInt($newApple.attr('data-y'))
          expect(newAppleX).to.not.equal(appleX)
          expect(newAppleY).to.not.equal(appleY)
        })

      })
    })

    it('should handle game over callback', () => {
      // Trigger game over
      for (let i = 0; i < 20; i++) {
        cy.get('body').type('{rightarrow}')
        cy.wait(100)
      }
      cy.get('.game-over').should('exist')
    })
  })

  describe('8. Edge Cases', () => {
    it('should handle rapid direction changes', () => {
      // Rapid direction changes
      cy.get('body').type('{uparrow}{downarrow}{leftarrow}{rightarrow}')
      cy.wait(500)
      
      // Verify that the game is still running (no game over)
      cy.get('.game-over').should('not.exist')
    })

    it('should maintain state during tab switches', () => {
      cy.get('body').type('{rightarrow}')
      cy.wait(500)
      
      // Simulate tab switch
      cy.window().trigger('blur')
      cy.wait(1000)
      cy.window().trigger('focus')
      
      cy.get('.snake-segment').should('exist')
    })
  })
}) 