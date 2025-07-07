import { DomainException } from 'src/shared/domain/exceptions/domain.exception';

export class InvalidRefreshTokenException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
