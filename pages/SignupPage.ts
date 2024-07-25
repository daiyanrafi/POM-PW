import { APIRequestContext, BrowserContext, Page } from "@playwright/test";
import User from "../models/User";
import UserAPi from "../apis/UserApi";

export default class SignupPage {
  async load(page: Page) {
    await page.goto("/signup");
  }

  private get firstNameInput() {
    return "first-name";
  }
  private get lastNameInput() {
    return "last-name";
  }
  private get emailInput() {
    return "email";
  }
  private get passwordInput() {
    return "password";
  }
  private get confirmPasswordInput() {
    return "confirm-password";
  }
  private get submitButton() {
    return "submit";
  }

  async signup(page: Page, user: User) {
    await page.getByTestId(this.firstNameInput).fill(user.getFirstName());
    await page.getByTestId(this.lastNameInput).fill(user.getLastName());
    await page.getByTestId(this.emailInput).fill(user.getEmail());
    await page.getByTestId(this.passwordInput).fill(user.getPassword());
    await page.getByTestId(this.confirmPasswordInput).fill(user.getPassword());
    await page.getByTestId(this.submitButton).click();
  }

  async signupUsingAPI(
    request: APIRequestContext,
    user: User,
    context: BrowserContext
  ) {
    const response = await new UserAPi().signup(request, user);

    //response er sob data json hishebe extract kore rakhlam
    const responseBody = await response.json();
    const access_token = responseBody.access_token;
    const firstName = responseBody.firstName;
    const userID = responseBody.UserID;

    //set cookies
    await context.addCookies([
      {
        name: "access_token",
        value: access_token,
        url: "https://todo.qacart.com",
      },
      {
        name: "firstName",
        value: firstName,
        url: "https://todo.qacart.com",
      },
      {
        name: "userID",
        value: userID,
        url: "https://todo.qacart.com",
      },
    ]);

    console.log(access_token, firstName, userID);
  }
}
