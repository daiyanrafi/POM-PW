import { Page } from "@playwright/test";

export default class TodoPage {
  private get welcomeMessage() {
    return `welcome`;
  }
  private get deleteIcon() {
    return `delete`;
  }

  private get noTodoMessage() {
    return `no-todos`;
  }

  private get todoItem() {
    return `todo-item`;
  }

  async load(page: Page) {
    await page.goto("/todo");
  }

  getWelcomeMessageElement(page: Page) {
    return page.getByTestId(this.welcomeMessage);
  }

  async deleteTodo(page: Page) {
    await page.getByTestId(this.deleteIcon).click();
  }

  async getNoTodoMessage(page: Page) {
    return page.getByTestId(this.noTodoMessage);
  }

  async getTodoItem(page: Page) {
    return page.getByTestId(this.todoItem);
  }
}
