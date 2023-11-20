"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/util/index.ts
var util_exports = {};
__export(util_exports, {
  Util: () => Util
});
module.exports = __toCommonJS(util_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Util
});
