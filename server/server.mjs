import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "./config/db.mjs";
import userModel from "./models/userModel.mjs";
import cors from "cors";
import countryModel from "./models/countryModel.mjs";
import postModel from "./models/postModel.mjs";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    const hashedpassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password: hashedpassword,
    });

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(500).json({
        success: false,
        message: "An account with this email address already exists",
      });
    }

    if (!firstName) {
      return res.status(500).json({
        success: false,
        message: "You must enter a first name",
      });
    }

    if (!lastName) {
      return res.status(500).json({
        success: false,
        message: "You must enter a last name",
      });
    }

    if (!email) {
      return res.status(500).json({
        success: false,
        message: "You must enter an email address",
      });
    }

    if (!password || password.length < 5) {
      return res.status(500).json({
        success: false,
        message: "You must enter a valid password",
      });
    }

    if (password !== confirmPassword) {
      return res.status(500).json({
        success: false,
        message: "Passwords do not match",
      });
    } else {
      const userCreated = await newUser.save();
      return res.status(200).json({
        success: true,
        message: "User created",
      });
    }
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json("No user associated with that email address");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(401).json("Invalid password");
  }

  const secretKey = process.env.SECRET_KEY;

  const payload = {
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    countries_visited: user.countries_visited,
  };

  const token = jwt.sign(payload, secretKey, { expiresIn: "1d" });

  res.status(200).json({
    message: "User is logged in",
    token: token,
  });
});

app.get("/api/auth/getUser", async (req, res) => {
  const authHeader = req.headers["authorisation"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const secretKey = process.env.SECRET_KEY;
    const decodedToken = jwt.verify(token, secretKey);

    const userId = decodedToken.userId;
    const firstName = decodedToken.firstName;
    const lastName = decodedToken.lastName;
    const email = decodedToken.email;
    const countriesVisited = decodedToken.countries_visited;

    return res.status(200).json({
      success: true,
      message: "User details identified",
      payload: { userId, firstName, lastName, email, countriesVisited },
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Unauthorised",
    });
  }
});

app.get("/api/getCountry", async (req, res) => {
  try {
    const countries = await countryModel.find();

    return res.status(200).json({
      success: true,
      message: "Countries obtained from database",
      payload: { countries },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving countries",
    });
  }
});

app.post("/api/addCountry", async (req, res) => {
  try {
    const { countryName, countryCode, token } = req.body;
    const secretKey = process.env.SECRET_KEY;
    const decodedToken = jwt.verify(token, secretKey);
    const userEmail = decodedToken.email;

    const user = await userModel.findOneAndUpdate(
      { email: userEmail },
      { $addToSet: { countries_visited: countryName } }
    );

    return res.status(200).json({
      success: true,
      message: `${countryName} added`,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post(`/api/:userId/newPost`, async (req, res) => {
  const { userId } = req.params;
  const { postedBy, message } = req.body;

  try {
    const newPost = new postModel({
      userId: userId,
      postedBy: postedBy,
      content: message,
      likedBy: [],
      totalLikes: 0,
    });

    await newPost.save();

    return res.status(200).json({
      success: true,
      message: "Post created",
    });
  } catch (err) {
    console.log(err);
  }
});

app.get(`/api/:userId/getPosts`, async (req, res) => {
  try {
    const { userId } = req.params;

    const postedByUser = await postModel.find({ userId: userId });

    const postDetails = postedByUser.map((post) => {
      return {
        postId: post.id,
        userId: post.userId,
        postedBy: post.postedBy,
        content: post.content,
        totalLikes: post.totalLikes,
        createdAt: post.createdAt,
      };
    });

    return res.status(200).json({
      success: true,
      details: postDetails,
    });
  } catch (err) {
    console.log(err);
  }
});

app.put("/api/:userId/updateBio", async (req, res) => {
  try {
    const { userId } = req.params;
    const { content } = req.body;
    const user = await userModel.findByIdAndUpdate(userId, { bio: content });

    return res.status(200).json({
      success: true,
      message: "Bio updated",
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/:userId/getUserBio", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId);
    const bio = user.bio;

    return res.status(200).json({
      success: true,
      message: "Bio successfully fetched",
      content: bio,
    });
  } catch (err) {}
});

app.get("/api/getCountriesVisited", async (req, res) => {
  const authHeader = req.headers["authorisation"];

  try {
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      const secretKey = process.env.SECRET_KEY;
      const decodedToken = jwt.verify(token, secretKey);
      const userEmail = decodedToken.email;

      const user = await userModel.find({ email: userEmail });
      const countriesVisitedByUser = user[0].countries_visited;

      return res.status(200).json({
        success: true,
        message: "Countries visited by user obtained",
        payload: { countriesVisitedByUser },
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.get(`/api/:postId/getPostLikes`, async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await postModel.find({ _id: postId });
    const totalLikes = post[0].likedBy.length;

    return res.status(200).json({
      success: true,
      postLikes: totalLikes,
    });
  } catch (err) {
    console.log(err);
  }
});

app.put("/api/:postId/updatePostLikes", async (req, res) => {
  try {
    const { postId } = req.params;
    const authHeader = req.headers["authorisation"];
    let user = "";

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      const secretKey = process.env.SECRET_KEY;
      const decodedToken = jwt.verify(token, secretKey);
      user = decodedToken.userId;
    }

    const post = await postModel.findByIdAndUpdate({ _id: postId });

    if (!post.likedBy.includes(user)) {
      post.likedBy.push(user);
    } else {
      post.likedBy.remove(user);
    }

    const updatedPost = await post.save();

    return res.status(200).json({
      success: true,
      updatedPostLikes: updatedPost.likedBy.length,
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/:postId/getComments", async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await postModel.findById(postId);
    const comments = post.comments;

    return res.status(200).json({
      success: true,
      message: comments,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/:postId/newComment", async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, postedBy, comment } = req.body;

    const post = await postModel.findById(postId);

    post.comments.push({ postedBy, comment });

    await post.save();

    return res.status(200).json({
      success: true,
      message: "New comment created",
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Todo - 10 - Instead of having all the backend routes in this one file, you can split the routes out to different files to
//             oranise them easier. So I would have a folder called routes and then a file called auth-routes.mjs, and maybe
//             countries-routes.mjs. You can follow this answer https://stackoverflow.com/a/37309212/2518608
