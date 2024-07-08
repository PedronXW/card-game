import { cards } from '../../../lib/cards'
import {
  attributeConversorFromString,
  attributeConversorToString,
} from '../../infra/repositories/mappers/round-mapper'
import { Side } from '../entities/game'
import { Round } from '../entities/round'

export const nextRoundGenerator = (
  lastRound: Round,
  attribute: string,
): Round => {
  const selectedRedCard = cards.find(
    (card) => card.name === lastRound.redCardPlayed,
  )

  const selectedBlueCard = cards.find(
    (card) => card.name === lastRound.blueCardPlayed,
  )

  const redCardIndex = lastRound.redCardsBeforeRound.lastIndexOf(
    selectedRedCard!.name,
  )

  const blueCardIndex = lastRound.blueCardsBeforeRound.lastIndexOf(
    selectedBlueCard!.name,
  )

  if (
    selectedBlueCard![
      attributeConversorToString(lastRound.selectedAttribute!)!
    ] ===
    selectedRedCard![attributeConversorToString(lastRound.selectedAttribute!)!]
  ) {
    const nextRound = Round.create({
      game: lastRound.game,
      blueCardsBeforeRound: lastRound.blueCardsBeforeRound,
      redCardsBeforeRound: lastRound.redCardsBeforeRound,
      selectedAttribute: attributeConversorFromString(attribute),
    })

    return nextRound
  }

  const winner =
    selectedBlueCard![
      attributeConversorToString(lastRound.selectedAttribute!)!
    ] >
    selectedRedCard![attributeConversorToString(lastRound.selectedAttribute!)!]
      ? Side.BLUE
      : Side.RED

  let blueCards

  let redCards

  if (winner === Side.BLUE) {
    blueCards = [...lastRound.blueCardsBeforeRound, selectedRedCard!.name]
    lastRound.redCardsBeforeRound.splice(redCardIndex, 1)
    redCards = lastRound.redCardsBeforeRound
  } else {
    redCards = [...lastRound.redCardsBeforeRound, selectedBlueCard!.name]
    lastRound.blueCardsBeforeRound.splice(blueCardIndex, 1)
    blueCards = lastRound.blueCardsBeforeRound
  }

  const nextRound = Round.create({
    game: lastRound.game,
    blueCardsBeforeRound: blueCards,
    redCardsBeforeRound: redCards,
    selectedAttribute: attributeConversorFromString(attribute),
  })

  return nextRound
}
