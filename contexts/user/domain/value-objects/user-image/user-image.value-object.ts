import { UserInvalidImageException } from "../../exceptions/user-invalid-image.exception";

export class UserImageValueObject {
  constructor(public readonly value: string | null | undefined) {
    this.validate(value);
  }

  /**
   * Validates the image URL. Accepts null, undefined, or strings starting with 'https://', 'http://', or 'data:'.
   * @param value The image URL to validate
   * @throws UserInvalidImageException if the value is not valid
   */
  validate(value: string | null | undefined): void {
    if (value === null || value === undefined) {
      return;
    }
    if (typeof value !== "string") {
      throw new UserInvalidImageException("User image must be a string");
    }
    if (
      !(
        value.startsWith("https://") ||
        value.startsWith("http://") ||
        value.startsWith("data:")
      )
    ) {
      throw new UserInvalidImageException(
        "User image must be a valid URL (http, https, or data-uri)"
      );
    }
  }

  /**
   * Compares this value object with another for equality
   * @param other Another UserImageValueObject
   * @returns true if values are equal
   */
  equals(other: UserImageValueObject): boolean {
    return this.value === other.value;
  }

  /**
   * Returns the string representation of the value
   */
  toString(): string {
    return this.value ?? "";
  }

  /**
   * Returns the JSON representation of the value
   */
  toJson(): string {
    return this.value ?? "";
  }
}
