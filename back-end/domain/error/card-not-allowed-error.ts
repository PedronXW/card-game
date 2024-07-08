import { ServiceError } from '../../@shared/errors/service-error'

export class CardNotAllowedError extends Error implements ServiceError {
  constructor() {
    super(`Card not Allowed error`)
  }
}
