import dogApi from '../../fixtures/dogApi.json'

const { baseUrl, breed, invalidBreed } = dogApi

describe(`GET /breed/{breed}/images`, () => {
  let response

  before(() => {
    cy.request(`${baseUrl}/breed/${breed}/images`).then((res) => {
      response = res
    })
  })

  it('deve retornar status 200 para raça válida', () => {
    expect(response.status).to.eq(200)
  })

  it('deve retornar status "success" no corpo', () => {
    expect(response.body.status).to.eq('success')
  })

  it('deve retornar um array de imagens não vazio', () => {
    expect(response.body.message).to.be.an('array')
    expect(response.body.message.length).to.be.greaterThan(0)
  })

  it('cada imagem deve ser uma URL válida terminando em .jpg ou .png', () => {
    response.body.message.forEach((url) => {
      expect(url).to.match(/^https:\/\/images\.dog\.ceo\/.+\.(jpg|png)$/i)
    })
  })

  it('deve retornar 404 para raça inválida', () => {
    cy.request({
      url: `${baseUrl}/breed/${invalidBreed}/images`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404)
      expect(res.body.status).to.eq('error')
    })
  })
})
