import conf from "../config/conf";

import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      console.log("appwrite service::getCurrentUser", error);
    }
    return null;
  }

  async logout() {
    try {
      return await this.account.deleteSession("current");
    } catch (error) {
      console.log("appwrite service::logout", error);
    }
  }
}

const authService = new AuthService();
export default authService;
