import { Side } from '../../back-end/domain/entities/game'
import { Round } from '../../back-end/domain/entities/round'
import {
  FetchRoundsResponse,
  RoundRepository,
} from '../../back-end/domain/repositories/round-repository'

export class InMemoryRoundRepository implements RoundRepository {
  public rounds: Round[] = []

  async createRound(round: Round): Promise<Round> {
    this.rounds.push(round)

    return round
  }

  async selectCard(card: string, id: string, side: Side): Promise<Round> {
    const roundIndex = this.rounds.findIndex(
      (round) => round.id.getValue() === id,
    )

    if (side === Side.BLUE) {
      this.rounds[roundIndex].blueCardPlayed = card
    } else {
      this.rounds[roundIndex].redCardPlayed = card
    }

    return this.rounds[roundIndex]
  }

  async fetchRoundById(id: string): Promise<Round | undefined> {
    return this.rounds.find((round) => round.id.getValue() === id)
  }

  async fetchRoundsByGame(
    gameId: string,
    page: number,
    limit: number,
  ): Promise<FetchRoundsResponse> {
    const startIndex = (page - 1) * limit

    const endIndex = page * limit

    return {
      rounds: this.rounds
        .filter((round) => round.game.getValue() === gameId)
        .slice(startIndex, endIndex),
      totalRoundsCount: this.rounds.filter(
        (round) => round.game.getValue() === gameId,
      ).length,
    }
  }
}
