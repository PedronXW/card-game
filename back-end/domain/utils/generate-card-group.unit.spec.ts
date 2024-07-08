import { generateCardGroup } from './generate-card-group'

describe('Generate Card Group', () => {
  it('should be able to generate the initial card groups randomically', async () => {
    const groups = generateCardGroup()

    expect(groups).toBeInstanceOf(Array<number>)
    expect(groups).toHaveLength(5)
  })
})
