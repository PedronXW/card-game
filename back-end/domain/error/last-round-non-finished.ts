import { ServiceError } from '../../@shared/errors/service-error'

export class LastRoundNonFinishedError extends Error implements ServiceError {
  constructor() {
    super(`Last round non finished`)
  }
}
