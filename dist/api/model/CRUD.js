"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/api/model/CRUD.ts
var CRUD_exports = {};
__export(CRUD_exports, {
  default: () => CRUD_default
});
module.exports = __toCommonJS(CRUD_exports);
var import_uuid = require("uuid");

// src/api/config/DefaultConfig.ts
var config = {
  tableName: "table_name"
};
var DefaultConfig_default = config;

// src/api/config/db.ts
var import_aws_sdk = __toESM(require("aws-sdk"));
import_aws_sdk.default.config.update({
  region: "us-east-1"
});
var dynamodb = new import_aws_sdk.default.DynamoDB.DocumentClient();
var db_default = dynamodb;

// src/util/index.ts
var Util = class {
  static fun(value) {
    return value;
  }
  static getDate() {
    const date = /* @__PURE__ */ new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  static resOk(data, message) {
    return {
      statusCode: 200,
      message: "Ok",
      body: data
    };
  }
  static resCreated(data, itemType) {
    return {
      statusCode: 201,
      message: `${itemType || "Item"} created with success.`,
      body: data
    };
  }
  static resError(error, message) {
    return {
      statusCode: 500,
      message: "Intern server error",
      error
    };
  }
};

// src/api/model/CRUD.ts
var CRUDModel = class {
  constructor() {
    this.tableName = DefaultConfig_default.tableName;
  }
  async create(body, itemType) {
    const data = {
      id: (0, import_uuid.v4)(),
      itemType,
      ...body
    };
    try {
      await db_default.put({ TableName: this.tableName, Item: data }).promise();
      return Util.resCreated(data, itemType);
    } catch (err) {
      return Util.resError(err, "Error in create item");
    }
  }
  async read(id) {
    try {
      const item = await db_default.get({ TableName: this.tableName, Key: { id } }).promise();
      return Util.resOk(item.Item);
    } catch (err) {
      return Util.resError(err, "Error in read item");
    }
  }
  // Template to update
  async update(id, data) {
    try {
      const params = {
        TableName: this.tableName,
        Key: { id },
        UpdateExpression: "set param1 = :newParam1, param2 = :newParam2",
        ExpressionAttributeValues: {
          ":newParam1": data.param1,
          ":newParam2": data.param2
        }
      };
      await db_default.update(params).promise();
      return Util.resOk("");
    } catch (err) {
      return Util.resError(err, "Error in update item");
    }
  }
  async delete(id) {
    const params = {
      TableName: this.tableName,
      Key: { id }
    };
    try {
      await db_default.delete(params).promise();
      return Util.resOk("");
    } catch (err) {
      return Util.resError(err, "Error in remove item");
    }
  }
};
var CRUD_default = new CRUDModel();
