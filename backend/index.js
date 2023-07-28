const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const Jwt = require("jsonwebtoken");
const jwtKey = "AK-collection";


app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins (you can specify specific origins instead)
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  ); // Allow the desired HTTP methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow the desired headers
  next();
});

require("./db/config");
const User = require("./db/User");
const AdminUser = require("./db/AdminUser");
const newUser = require("./db/newUser");
const Products = require("./db/Products");

const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});


app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      resp.send({ result: "Something went wrong, please try after some time" });
    }
    resp.send({ result, auth: token });
  });
});

app.post("/login", async (req, resp) => {
  console.log(req.body);

  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          resp.send({
            result: "Something went wrong, please try after some time",
          });
        }
        resp.send({ user, auth: token });
      });
    } else {
      resp.send({ result: "no user found" });
    }
  } else {
    resp.send({ result: "no user found" });
  }
});







// Define storage for the uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "./uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});













// Create upload instance
const upload = multer({ storage: storage });

// Define your API endpoint to add a new product
let idCounter = 0;

app.options("/add-product", cors());

app.post("/add-product", upload.single("image"), (req, res, next) => {
  idCounter++;
  // Create a new product object with the data from the request
  const product = new Products({
    id: idCounter,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    image: "http://127.0.0.1:5500/backend/uploads/" + req.file.filename
  });

  // Save the product to the database
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        product: result,
        message: "Product added successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(700).json({
        error: err,
      });
    });
});

app.get("/products", async (req, resp) => {
  let products = await Products.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ result: "Product Not Found" });
  }
});

app.get("/products/:id", (req, resp) => {
  const productId = req.params.id;

  Products.findOne({ id: productId })
    .then((result) => {
      if (result) {
        resp.json(result);
        console.log(result);
      } else {
        resp.send({ result: "record not found." });
      }
    })
    .catch((error) => {
      // Handle any potential errors
      console.error(error);
      resp.status(500).send({ error: "Internal Server Error" });
    });
});

app.delete("/products/:id", (req, resp) => {
  const productId = req.params.id;

  Products.findOneAndDelete({ id: productId })
    .then((result) => {
      if (result) {
        resp.json({ message: "Product deleted successfully" });
      } else {
        resp.status(404).json({ error: "Product not found" });
      }
    })
    .catch((error) => {
      // Handle any potential errors
      console.error(error);
      resp.status(500).json({ error: "Internal Server Error" });
    });
});

app.get('/product/:id'  , async (req, res) => {
  let data = await Products.findOne({ id: req.params.id});
  if (data) {
    res.json(data);
  } else {
    res.status(404)({ "error": "Product not found" })
  }  
})



// app.put("/product/:id", upload.single("image"), async (req, res)=>{
//   let data = await Products.updateOne({ id: req.params.id,},
//     {$set:req.body})
//     res.json(data);
    
//     console.log(data);
//     console.log(image)
// })

app.put("/product/:id", upload.single("image"), async (req, res) => {
  try {
    const productId = req.params.id;

    // Update the image field if a new file was uploaded
    if (req.file) {
      
      // Logic to process and save the uploaded image, e.g., move it to the desired location or update the filename in the database
      // Modify the code below according to your requirements and storage strategy

      const newImageFilename ="http://127.0.0.1:5500/backend/uploads/" + req.file.filename; // Get the filename of the uploaded image

      // Update the image field in the database
      await Products.updateOne({ id: productId }, { $set: { image: newImageFilename } });
    }

    // Update other fields if necessary
    await Products.updateOne({ id: productId }, { $set: req.body });

    // Retrieve the updated product document
    const updatedProduct = await Products.findOne({ id: productId });

    // Send the updated product data as the response
    res.json(updatedProduct);
    console.log(updatedProduct);
  } catch (error) {
    // Handle any errors that occurred during the update process
    console.log(error);
    res.status(500).json({ error: "An error occurred during product update." });
  }
});






// Login route
app.post("/adminloginn", async (req, resp) => {
  
  if (req.body.password && req.body.username) {
    let adminuser = await AdminUser.findOne(req.body).select("-password");
    if (adminuser) {
      Jwt.sign({ adminuser }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          resp.send({
            result: "Something went wrong, please try after some time",
          });
          console.log(req.body);
        }
        resp.send({ adminuser, auth: token });
      });
    } else {
      resp.send({ result: "no user found" });
    }
  } else {
    resp.send({ result: "no user found" });
  }
});

app.post("/adminlogin", async (req, resp) => {
  console.log(req.body);

  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          resp.send({
            result: "Something went wrong, please try after some time",
          });
        }
        resp.send({ user, auth: token });
      });
    } else {
      resp.send({ result: "no user found" });
    }
  } else {
    resp.send({ result: "no user found" });
  }
});



app.listen(8000, () => {
  console.log("Server started on port 8000");
});
