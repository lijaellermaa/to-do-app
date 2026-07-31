import { expect, Locator } from '@playwright/test';

export class Button {
  readonly btnLocator: Locator;

  constructor(btnLocator: Locator) {
    this.btnLocator = btnLocator;
  }

  async click(): Promise<void> {
    await this.btnLocator.click();
  }

  async checkVisibility(visible = true): Promise<void> {
    await expect(this.btnLocator).toBeVisible({ visible });
  }
}
