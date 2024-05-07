import { KnexSingleton } from "../index";

interface User {
  id: number;
  name: string;
  last_name: string;
  salary_rate: string;
  salary_type_id: number;
  company_id: number;
}

export class UserModel {
  private knex = KnexSingleton.instance;
  private tableName = "users";

  async findOne(userId: number): Promise<User | undefined> {
    return this.knex<User>(this.tableName).where({ id: userId }).first();
  }

  async findAll(): Promise<User[]> {
    return this.knex<User>(this.tableName).select();
  }
}
