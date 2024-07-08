import { ServiceError } from '../../@shared/errors/service-error'

export class GameNonExistsError extends Error implements ServiceError {
  constructor() {
    super(`Game non exists`)
  }
}
