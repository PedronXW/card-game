import { CardNotAllowedError } from './card-not-allowed-error'

describe('CardNotAllowedError', () => {
  it('should be able to create a new CardNotAllowedError', () => {
    const error = new CardNotAllowedError()

    expect(error.message).toBe('Card not Allowed error')
  })
})
