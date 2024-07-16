const express = require("express");
const app = express();

const userModel = require("./models/user");
const postModel = require("./models/posts");

app.get("/", (req, res) => {
  res.send("hey");
});

app.get("/create", async (req, res) => {
  let createdUser = await userModel.create({
    username: "hayyat",
    email: "hayyat@gmail.com",
    age: 12,
  });

  res.send(createdUser);
});

app.get("/post/create", async (req, res) => {
  let createdPost = await postModel.create({
    postData: "haq in",
    user: "668ae556b89b4f192e655371",
  });

  let user = await userModel.findOne({ _id: "668ae556b89b4f192e655371" });
  user.posts.push(createdPost._id);
  await user.save();

  res.send({ createdPost, user });
});

app.listen(3000);
