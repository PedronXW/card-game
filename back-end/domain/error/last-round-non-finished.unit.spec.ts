import { LastRoundNonFinishedError } from './last-round-non-finished'

describe('LastRoundNonExistsError', () => {
  it('should be able to create a new LastRoundNonExistsError', () => {
    const error = new LastRoundNonFinishedError()

    expect(error.message).toBe('Last round non finished')
  })
})
