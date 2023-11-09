import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('Create Issue', options, () => {
    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(5),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
    }

    beforeEach(() => {
        cy.api_deleteProjects()
        cy.login()
        cy.api_createProject(issue.project)
    })
    it.only('criando uma issue no projeto',()=> {

        cy.createIssue(issue)

        cy.get('.issue-details')
          .should('contain', issue.title)
          .and('contain', issue.description)        
    })
})