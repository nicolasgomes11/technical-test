import dogApi from '../../fixtures/dogApi.json'

const { baseUrl } = dogApi

describe('GET /breeds/list/all', () => {
  let response

  before(() => {
    cy.request(`${baseUrl}/breeds/list/all`).then((res) => {
      response = res
    })
  })

  it('deve retornar status 200', () => {
    expect(response.status).to.eq(200)
  })

  it('deve retornar status "success" no corpo', () => {
    expect(response.body.status).to.eq('success')
  })

  it('deve retornar um objeto de raças não vazio', () => {
    expect(response.body.message).to.be.an('object')
    expect(Object.keys(response.body.message).length).to.be.greaterThan(0)
  })

  it('deve retornar sub-raças como array', () => {
    Object.values(response.body.message).forEach((subBreeds) => {
      expect(subBreeds).to.be.an('array')
    })
  })

  it('deve conter a raça "hound"', () => {
    expect(response.body.message).to.have.property('hound')
  })
})
