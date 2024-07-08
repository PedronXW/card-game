import { Side } from '../entities/game'
import { Round } from '../entities/round'

export type FetchRoundsResponse = {
  rounds: Round[]
  totalRoundsCount: number
}

export abstract class RoundRepository {
  abstract createRound(round: Round): Promise<Round>
  abstract selectCard(card: string, id: string, side: Side): Promise<Round>
  abstract fetchRoundById(id: string): Promise<Round | undefined>
  abstract fetchRoundsByGame(
    gameId: string,
    page: number,
    limit: number,
  ): Promise<FetchRoundsResponse>
}
