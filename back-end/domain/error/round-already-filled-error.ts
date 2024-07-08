import { ServiceError } from '../../@shared/errors/service-error'

export class RoundAlreadyFilledError extends Error implements ServiceError {
  constructor() {
    super(`Round Already filled`)
  }
}
