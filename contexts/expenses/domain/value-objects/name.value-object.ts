import { InvalidNameException } from "../exceptions/invalid-name.exception";

export class NameValueObject {
  constructor(public readonly value: string) {
    this.value = this.formatValue(this.value);
    this.validate(this.value);
  }

  private formatValue(value: string) {
    return value.trim().toLowerCase();
  }

  private validate(name: string) {
    if (!name) {
      throw new InvalidNameException(
        `Invalid name: ${name}, name cannot be empty`
      );
    }

    if (name.length > 255) {
      throw new InvalidNameException(
        `Invalid name: ${name}, name must be less than 255 characters`
      );
    }

    if (name.length < 2) {
      throw new InvalidNameException(
        `Invalid name: ${name}, name must be at least 3 characters`
      );
    }
  }

  toJSON(): { value: string } {
    return { value: this.value };
  }
}
