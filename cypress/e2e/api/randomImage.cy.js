import dogApi from '../../fixtures/dogApi.json'

const { baseUrl } = dogApi

describe('GET /breeds/image/random', () => {
  let response

  before(() => {
    cy.request(`${baseUrl}/breeds/image/random`).then((res) => {
      response = res
    })
  })

  it('deve retornar status 200', () => {
    expect(response.status).to.eq(200)
  })

  it('deve retornar status "success" no corpo', () => {
    expect(response.body.status).to.eq('success')
  })

  it('deve retornar uma URL de imagem válida', () => {
    expect(response.body.message).to.be.a('string')
    expect(response.body.message).to.match(/^https:\/\/images\.dog\.ceo\/.+\.(jpg|png)$/i)
  })

  it('deve retornar imagens diferentes em chamadas consecutivas', () => {
    const urls = new Set()

    Cypress._.times(3, () => {
      cy.request(`${baseUrl}/breeds/image/random`).then((res) => {
        urls.add(res.body.message)
      })
    })

    cy.then(() => {
      expect(urls.size).to.be.greaterThan(1)
    })
  })
})
