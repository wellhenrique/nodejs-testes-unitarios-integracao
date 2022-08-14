import { describe, expect, jest } from '@jest/globals';
import Editora from '../../models/editora';

describe('Teste model editora', () => {
  const ObjEditora = {
    nome: 'CDC',
    cidade: 'Sao Paulo',
    email: 'c@c.com',
  }

  it('Deve instanciar uma nova editora', () => {
    const editora = new Editora(ObjEditora)

    expect(editora).toEqual(
      expect.objectContaining(ObjEditora)
    )
  })

  it.skip('Deve salvar editora no banco de dados', () => {
    const editora = new Editora(ObjEditora)

    editora.salvar().then((dados) => {
      expect(dados.nome).toBe('CDC')
    })
  })

  it.skip('Deve salvar do banco de dados com async await', async () => {
    const editora = new Editora(ObjEditora)

    const dados = await editora.salvar()

    const resposta = await Editora.pegarPeloId(dados.id)

    expect(resposta).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        created_at: expect.any(String),
        updated_at: expect.any(String),
        ...ObjEditora,
      })
    )
  })

  it('Deve fazer uma chamada simulada ao banco de dados', () => {
    const editora = new Editora(ObjEditora)

    editora.salvar = jest.fn().mockReturnValue({
      id: 10,
      nome: 'CDC',
      cidade: 'Sao Paulo',
      email: 'c@c.com',
      updated_at: '2022-9-11',
      created_at: '2022-8-11'
    })

    const retorno = editora.salvar()

    expect(retorno).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        created_at: expect.any(String),
        updated_at: expect.any(String),
        ...ObjEditora
      })
    )
  })
})