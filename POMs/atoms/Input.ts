import { expect, Locator } from '@playwright/test';

export class Input {
  readonly inputLocator: Locator;

  constructor(inputLocator: Locator) {
    this.inputLocator = inputLocator;
  }

  async fill(value: string): Promise<void> {
    await this.inputLocator.fill(value);
  }

  async press(key: string): Promise<void> {
    await this.inputLocator.press(key);
  }

  async checkVisibility(visible = true): Promise<void> {
    await expect(this.inputLocator).toBeVisible({ visible });
  }
}
