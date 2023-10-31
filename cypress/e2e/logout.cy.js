describe('logout', () => {
    beforeEach(() => {
        cy.login()
    })
    it('Efetuando logout', () => {      
      cy.logout()
    })
  })