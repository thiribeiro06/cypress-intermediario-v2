Cypress.Commands.add('login', () => {
    const user = Cypress.env('user_name')
    const password = Cypress.env('user_password')

    cy.visit('/users/sign_in')
    cy.intercept('users/sign_in').as('loginRequest')
    cy.get("[data-qa-selector='login_field']").type(user)
    cy.get("[data-qa-selector='password_field']").type(password, {log: false})
    cy.get("[data-qa-selector='sign_in_button']").click()
    
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 302)
})

Cypress.Commands.add('logout', () => {
    cy.get('.header-user-dropdown-toggle').click()
    cy.intercept('/users/sign_out').as('logoutRequest')
    cy.get('[data-qa-selector="sign_out_link"]').click()    
    cy.wait('@logoutRequest').its('response.statusCode').should('eq',302)
    cy.url.should('be.equal', `${Cypress.config('baseUrl')}/user/sign_in`)
})

Cypress.Commands.add('createProject',(project) => {

    cy.visit('/projects/new')
    cy.get('#blank-project-name > .project-name > #project_name').type(project.name)    
    cy.get(':nth-child(5) > #project_description').type(project.description)
    cy.get('#project_initialize_with_readme').check()
    cy.get('#blank-project-pane > #new_project > .btn-success').click()
})

