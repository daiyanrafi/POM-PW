import { APIRequestContext, Page } from "@playwright/test";
import User from "../models/User";
import TodoApi from "../apis/TodoApi";

export default class NewTodoPage {
  private get newAdd() {
    return `add`;
  }

  private get newTodoInput() {
    return `new-todo`;
  }

  private get newTodoSubmit() {
    return `submit-newTask`;
  }
  async load(page: Page) {
    await page.goto("/todo/new");
  }

  async addTodo(page: Page, task: string) {
    await page.getByTestId(this.newAdd).click();
    await page.getByTestId(this.newTodoInput).fill(task);
    await page.getByTestId(this.newTodoSubmit).click();
  }

  async addTodoUsingApi(request: APIRequestContext, user: User) {
    await new TodoApi().addTodo(request, user);
  }
}
