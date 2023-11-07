import { faker } from '@faker-js/faker'

describe('Create Issue', () => {
    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(5),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
    }

    beforeEach(() => {
        cy.login()
        cy.createProject(issue.project)
    })
    it('criando uma issue no projeto',()=> {

        cy.createIssue(issue)

        cy.get('.issue-details')
          .should('contain', issue.title)
          .and('contain', issue.description)

        
    })
})