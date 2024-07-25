import { test, expect } from "@playwright/test";
import User from "../models/User";
import SignupPage from "../pages/SignupPage";
import TodoPage from "../pages/TodoPage";
import NewTodoPage from "../pages/NewTodoPage";

// ****test case for add new todo******

test(`should be able add new todo`, async ({ page, request, context }) => {
  const user = new User();
  const signupPage = new SignupPage();
  await signupPage.signupUsingAPI(request, user, context);
  await page.pause();
  const newTodoPage = new NewTodoPage();
  await newTodoPage.load(page);
  await page.pause();
  await newTodoPage.addTodo(page, "GG ma man");
  const todoPage = new TodoPage();
  const todoItem = await todoPage.getTodoItem(page);
  expect(await todoItem.innerText()).toEqual("GG ma man");
});

// *****test case for delete todo******

test(`DELETE todo`, async ({ page, request, context }) => {
  const user = new User();
  const signupPage = new SignupPage();
  await signupPage.signupUsingAPI(request, user, context);
  const newTodoPage = new NewTodoPage();
  await newTodoPage.addTodoUsingApi(request, user);
  const todoPage = new TodoPage();
  await todoPage.load(page);
  await todoPage.deleteTodo(page);
  await page.getByTestId("delete").click();
  const noTodoMessage = await todoPage.getNoTodoMessage(page);
  await expect(noTodoMessage).toBeVisible();
});
