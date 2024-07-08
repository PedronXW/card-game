import { RoundNonExistsError } from './round-non-exists'

describe('RoundNonExistsError', () => {
  it('should be able to create a new RoundNonExistsError', () => {
    const error = new RoundNonExistsError()

    expect(error.message).toBe('Round non exists')
  })
})
