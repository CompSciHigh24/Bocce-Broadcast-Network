const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoDBConnectionString =
  "mongodb+srv://SE12:CSH2024@cluster0.grvwwif.mongodb.net/BBN_Profile?retryWrites=true&w=majority&appName=Cluster0";

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.path}`);
  next();
});

mongoose
  .connect(mongoDBConnectionString)
  .then(() => {
    console.log("MongoDB connection successful.");
  })
  .catch((err) => console.log("MongoDB connection error:", err));

// Schema and model for School
const profileSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  name: { type: String, required: true },
  birthplace: { type: String, required: true },
  hometown: { type: String, required: false },
  homeclub: { type: String },
  firsttournament: { type: String },
  accolades: { type: String },
  recentfinishes: { type: String },
});

// Associate the schema to a LoanerItem model
const ProfileSchema = mongoose.model("Profile", profileSchema);

// Whatever you want to add to this part \\

app.get("/BBN", (req, res) => {
  res.sendFile(__dirname + "/public/BBN.html");
});

app.get("/", (req, res) => {
  ProfileSchema.find({}).then((profile) => {
    res.render("boccee.ejs", { boccee: profile });
    // res.json(profile);
  });
});

app.post("/", (req, res) => {
  const newProfile = new ProfileSchema({
    username: req.body.username,
    name: req.body.name,
    birthplace: req.body.birthplace,
    hometown: req.body.hometown,
    homeclub: req.body.homeclub,
    firsttournament: req.body.firsttournament,
    accolades: req.body.accolades,
    recentfinishes: req.body.recentfinishes,
  });

  newProfile
    .save()
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// app.patch("/BBN/:username ", (req, res) => {
//   console.log("Working????")
//   const filter = { _id: profile };
//   // const update = {
//   //   $set: {
//   //     username: req.body.username,
//   //     name: req.body.name,
//   //     homeclub: req.body.homeclub,
//   //     accolades: req.body.accolades,
//   //     recentfinishes: req.body.recentfinishes,
//   //     birthplace: req.body.birthplace,
//   //     hometown: req.body.hometown,
//   //     firsttournament: req.body.firsttournament,
//   //   },
//   // };

app.patch("/profile/:id", async (req, res) => {
  try {
    console.log("Working??");
    const { id } = req.params;
    const profile = await ProfileSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (profile == null) {
      res.status(404).json({ message: "user not found" });
    } else {
      res.status(200).json(profile);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//   ProfileSchema.findOneAndUpdate(filter, req.body, { new: type }).then(
//     (updatedBBN) => {
//       console.log(updatedBBN);
//       res.json(updatedBBN);
//     },
//   );
// });

//app.get("/profile/:username", (req, res) => {
// let profile = req.params.username;
//const filter = { _id: username };
//   ProfileSchema.findOne(filter).then((profile) => {
//     res.render("profile.ejs", profile);
//     // res.json(profile)
//   });
// });

app.get("/profile/:id", (req, res) => {
  //let username = req.params.username;
  let id = req.params.id;
  //const filter = { id: username };
  const profile = ProfileSchema.findOne({_id: id}).then((profile) => {
    res.render("profile.ejs", {profile: profile});
  })
  // if (profile == null) {
  //   return res.status(404).json({ message: "profile not found" });
  // } else {
  //   res.status(200).render("profile.ejs", { profile });
  // }
});
// console.log(username)
//   ProfileSchema.findOne(filter)
//     .then((profile) => {
//       if (profile) {
//         console.log(profile)
//         res.json(profile)
//           res.render("profile.ejs", { profile });
//         // Pass 'profile' object to the template
//       } else {
//         res.status(404).send("Profile not found");
//       }
// })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send("Server error");
//     });
// });

app.delete("/profile/:_id", (req, res) => {
  let id = req.params._id;
  // let User = ProfileSchema.findOne({ username: username });
  // if ((User = null)) {
  //   console.log("404 : user not found");
  //   return;
  // }
  ProfileSchema.findOneAndDelete({ _id: id }).then((_id)=>{
    res.json(_id)
  })
});
