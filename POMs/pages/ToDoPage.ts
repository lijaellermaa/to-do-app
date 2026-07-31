import { expect, Locator, Page } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/en';
import { ToDoItem } from '../organisms/ToDoItem';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';

export class ToDoPage {
  readonly page: Page;
  private readonly url = 'https://todo-app.tallinn-learning.ee';
  readonly header: Locator;
  readonly main: Locator;
  readonly footer: Locator;
  readonly toDoItemInput: Input;
  readonly navigationContainer: Locator;
  readonly allFilter: Button;
  readonly activeFilter: Button;
  readonly completedFilter: Button;
  readonly clearCompletedBtn: Button;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByTestId('header');
    this.main = page.getByTestId('main');
    this.footer = page.getByTestId('footer');
    this.toDoItemInput = new Input(this.header.getByTestId('text-input'));
    this.navigationContainer = this.footer.getByTestId('footer-navigation');
    this.allFilter = new Button(this.navigationContainer.locator('a[href="#/"]'));
    this.activeFilter = new Button(this.navigationContainer.locator('a[href="#/active"]'));
    this.completedFilter = new Button(this.navigationContainer.locator('a[href="#/completed"]'));
    this.clearCompletedBtn = new Button(this.footer.locator('button.clear-completed'));
  }

  getToDoItemByIndex(index: number): ToDoItem {
    return new ToDoItem(this.main.getByTestId('todo-item').nth(index));
  }

  getToDoItemByText(text: string): ToDoItem {
    return new ToDoItem(this.main.locator('[data-testid="todo-item"]', { hasText: text }));
  }

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }

  async createToDoItem(text?: string): Promise<ToDoItem> {
    await this.toDoItemInput.fill(text == undefined ? faker.word.words(2) : text);
    await this.toDoItemInput.press('Enter');

    const toDoItems = this.main.getByTestId('todo-item');
    const itemCount = await toDoItems.count();

    return this.getToDoItemByIndex(itemCount - 1);
  }

  async checkToDoItemsVisibility(expectedCount: number): Promise<void> {
    const itemCount = await this.main.getByTestId('todo-item').count();
    expect(itemCount).toBe(expectedCount);
  }

  async clickClearCompleted(): Promise<void> {
    await this.clearCompletedBtn.click();
  }

  async filterByAll(): Promise<void> {
    await this.allFilter.click();
  }

  async filterByActive(): Promise<void> {
    await this.activeFilter.click();
  }

  async filterByCompleted(): Promise<void> {
    await this.completedFilter.click();
  }
}
