import { RoundAlreadyFilledError } from './round-already-filled-error'

describe('RoundAlreadyFilledError', () => {
  it('should be able to create a new RoundAlreadyFilledError', () => {
    const error = new RoundAlreadyFilledError()

    expect(error.message).toBe('Round Already filled')
  })
})
