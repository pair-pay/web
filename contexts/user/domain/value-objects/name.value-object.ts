import { Logger } from "@nestjs/common";
import { InvalidFullNameException } from "../exceptions/invalid-full-name.exception";

export class NameValueObject {
  constructor(public readonly value: string) {
    this.value = this.formatValue(this.value);
    this.validate(this.value);
  }

  public getValue() {
    return this.value;
  }

  private formatValue(text: string) {
    return text.trim().toLowerCase();
  }

  private validate(name: string) {
    if (!name) {
      throw new InvalidFullNameException(
        `Invalid full name: ${name}, full name cannot be empty`
      );
    }

    if (name.length > 255) {
      throw new InvalidFullNameException(
        `Invalid full name: ${name}, full name must be less than 255 characters`
      );
    }

    if (name.length < 2) {
      throw new InvalidFullNameException(
        `Invalid full name: ${name}, full name must be at least 3 characters`
      );
    }
  }

  toJSON(): string {
    return this.value;
  }
}
