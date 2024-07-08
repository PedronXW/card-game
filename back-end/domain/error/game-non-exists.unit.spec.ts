import { GameNonExistsError } from './game-non-exists'

describe('GameNonExistsError', () => {
  it('should be able to create a new GameNonExistsError', () => {
    const error = new GameNonExistsError()

    expect(error.message).toBe('Game non exists')
  })
})
