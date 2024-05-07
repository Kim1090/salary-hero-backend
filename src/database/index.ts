import Knex, { Knex as TypeKnex } from "knex";

import * as knexConfig from "../knexfile";

export class KnexSingleton {
  private static _instance?: TypeKnex;

  static get instance() {
    if (!this._instance) {
      this._instance = Knex(knexConfig);
    }
    return this._instance;
  }

  static set instance(knex: TypeKnex) {
    if (this._instance) {
      this._instance.destroy();
    }
    this._instance = knex;
  }
}
