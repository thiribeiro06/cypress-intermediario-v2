Cypress.Commands.add('login', (
    user = Cypress.env('user_name'),
    password = Cypress.env('user_password'),
    { cacheSession = true} = {},
) => {   
    const login = () => {
    cy.visit('/users/sign_in')
    cy.intercept('users/sign_in').as('loginRequest')
    cy.get("[data-qa-selector='login_field']").type(user)
    cy.get("[data-qa-selector='password_field']").type(password, {log: false})
    cy.get("[data-qa-selector='sign_in_button']").click()

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 302)
    }

    const validate = () => {
        cy.visit('/')
        cy.location('pathname', {timeout: 1000})
          .should('not.eq', '/users/sign_in')
    }

    const options = {
        cacheAcrossSpecs: true,
        validate,
    }   
    
    if(cacheSession) {
        cy.session(user, login, options)
    } else {
        login()
    }
    
})

Cypress.Commands.add('logout', () => {
    cy.visit('/')
    cy.get('.header-user-dropdown-toggle').click()
    cy.intercept('/users/sign_out').as('logoutRequest')
    cy.get('[data-qa-selector="sign_out_link"]').click()    
    cy.wait('@logoutRequest').its('response.statusCode').should('eq',302)
    //cy.url.should('be.equal', `${Cypress.config('baseUrl')}/user/sign_in`)
})

Cypress.Commands.add('createProject',(project) => {

    cy.visit('/projects/new')
    cy.get('#blank-project-name > .project-name > #project_name').type(project.name)    
    cy.get(':nth-child(5) > #project_description').type(project.description)
    cy.get('#project_initialize_with_readme').check()
    cy.get('#blank-project-pane > #new_project > .btn-success').click()
})

Cypress.Commands.add('createIssue',(issue)=> {

    cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`)

    cy.get('#issue_title').type(issue.title)
    cy.get('#issue_description').type(issue.description)
    cy.get('#issue_confidential').check()

    cy.get('.append-right-10 > .btn').click()
})

