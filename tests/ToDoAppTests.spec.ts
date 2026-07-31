import { test } from '@playwright/test';
import { ToDoPage } from '../POMs/pages/ToDoPage';

test('Create to-do item', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  await toDoPage.checkToDoItemsVisibility(0);
  await toDoPage.createToDoItem();
  await toDoPage.checkToDoItemsVisibility(1);
});

test('Create 2 to-do items', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  await toDoPage.checkToDoItemsVisibility(0);
  await toDoPage.createToDoItem();
  await toDoPage.createToDoItem();
  await toDoPage.checkToDoItemsVisibility(2);
});

test('Activate to-do item test', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  await toDoPage.checkToDoItemsVisibility(0);
  const createdToDo = await toDoPage.createToDoItem();
  await toDoPage.checkToDoItemsVisibility(1);

  await createdToDo.activate();
  await createdToDo.checkIsActivated();
});

test('Activate to-do item test - search by text', async ({ page }) => {
  const itemText = 'test text';
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  await toDoPage.checkToDoItemsVisibility(0);
  await toDoPage.createToDoItem(itemText);
  await toDoPage.checkToDoItemsVisibility(1);
  const createdToDo = toDoPage.getToDoItemByText(itemText);

  await createdToDo.activate();
  await createdToDo.checkIsActivated();
});

test('Delete to-do item test', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  await toDoPage.checkToDoItemsVisibility(0);
  const createdToDo = await toDoPage.createToDoItem();
  await toDoPage.checkToDoItemsVisibility(1);

  await createdToDo.deleteItem();
  await toDoPage.checkToDoItemsVisibility(0);
});

test('Create 2 items, activate 1, click Clear completed', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();

  const firstItem = await toDoPage.createToDoItem('First task');
  await toDoPage.createToDoItem('Second task');
  await toDoPage.checkToDoItemsVisibility(2);

  await firstItem.activate();
  await toDoPage.clickClearCompleted();

  await toDoPage.checkToDoItemsVisibility(1);

  const remainingItem = toDoPage.getToDoItemByText('Second task');
  await remainingItem.checkItemVisibility(true);
});

test('Create 2 items, activate 1, filter by Completed', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();

  const firstItem = await toDoPage.createToDoItem('First task');
  await toDoPage.createToDoItem('Second task');

  await firstItem.activate();
  await toDoPage.filterByCompleted();

  await toDoPage.checkToDoItemsVisibility(1);

  const completedItem = toDoPage.getToDoItemByText('First task');
  await completedItem.checkItemVisibility(true);
});

test('Filter Active test', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();

  const firstItem = await toDoPage.createToDoItem('First task');
  await toDoPage.createToDoItem('Second task');

  await firstItem.activate();
  await toDoPage.filterByActive();

  await toDoPage.checkToDoItemsVisibility(1);

  const activeItem = toDoPage.getToDoItemByText('Second task');
  await activeItem.checkItemVisibility(true);
});

test('Filter All test', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();

  const firstItem = await toDoPage.createToDoItem('First task');
  const secondItem = await toDoPage.createToDoItem('Second task');

  await firstItem.activate();

  await toDoPage.filterByActive();
  await toDoPage.checkToDoItemsVisibility(1);

  await toDoPage.filterByAll();
  await toDoPage.checkToDoItemsVisibility(2);

  await firstItem.checkItemVisibility(true);
  await secondItem.checkItemVisibility(true);
});
