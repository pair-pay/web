import { Logger } from "@nestjs/common";
import { InvalidAmountException } from "../exceptions/invalid-amount.exception";
import { InvalidCurrencyException } from "../exceptions/invalid-currency.exception copy";
import { CURRENCY_SYMBOL } from "../../../common/constants/currency.constant";

export class AmountValueObject {
  constructor(
    public readonly value: number,
    public readonly currency: string
  ) {
    this.validateAmount(this.value);
  }

  private validateAmount(amount: number) {
    if (!amount) {
      throw new InvalidAmountException(
        `Invalid amount: ${amount}, amount cannot be empty`
      );
    }

    if (amount < 0) {
      throw new InvalidAmountException(
        `Invalid amount: ${amount}, amount cannot be negative`
      );
    }
  }

  privatevalidateCurrency(currency: string) {
    if (!currency) {
      throw new InvalidCurrencyException(
        `Invalid currency: ${currency}, currency cannot be empty`
      );
    }

    if (!Object.values(CURRENCY_SYMBOL).includes(currency as CURRENCY_SYMBOL)) {
      throw new InvalidCurrencyException(
        `Invalid currency: ${currency}, currency must be a valid currency`
      );
    }
  }

  toJSON(): { value: number; currency: string } {
    return { value: this.value, currency: this.currency };
  }
}
