import { cards } from '../../../lib/cards'
import { EntityId } from '../../@shared/entities/entity-id'
import { attributeConversorFromString } from '../../infra/repositories/mappers/round-mapper'
import { Round } from '../entities/round'
import { generateCardGroup } from './generate-card-group'

export const firstRoundGenerator = (attribute: string, game: string) => {
  const generateRandomListItems = generateCardGroup()

  const blueCardGroup: string[] = []

  const redCardGroup: string[] = []

  cards.forEach((card, index) => {
    // distribute cards to sides
    if (generateRandomListItems.includes(index)) {
      blueCardGroup.push(card.name)
    } else {
      redCardGroup.push(card.name)
    }
  })

  const round = Round.create({
    blueCardsBeforeRound: blueCardGroup,
    redCardsBeforeRound: redCardGroup,
    selectedAttribute: attributeConversorFromString(attribute),
    game: new EntityId(game),
  })

  return round
}
