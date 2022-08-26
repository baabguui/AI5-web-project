import { Schema, model, Mongoose } from "mongoose";
const id = require('./types/id');

const UserSchema = new Schema(
  {
    id,
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("user", UserSchema);

export { UserModel };