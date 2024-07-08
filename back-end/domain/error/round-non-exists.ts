import { ServiceError } from '../../@shared/errors/service-error'

export class RoundNonExistsError extends Error implements ServiceError {
  constructor() {
    super(`Round non exists`)
  }
}
