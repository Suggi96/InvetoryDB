const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const { ensureAuthenticated } = require("../helpers/auth");

//Load Idea Model
require("../models/Idea");
const Idea = mongoose.model("ideas");
//Inventory Index Route with only unapproved items
router.get("/unapproved", ensureAuthenticated, (req, res) => {
  Idea.find({ status: "Unapproved" })
    .then(ideas => {
      res.render("inventory/unapproved", {
        ideas: ideas
      })
    })
});
//Inventory Index Route
router.get("/", ensureAuthenticated, (req, res) => {
  Idea.find({ user: req.user.id }) //Load data related only to an individual user
    .sort({ date: "desc" })
    .then(ideas => {
      res.render("inventory/index1", {
        ideas: ideas
      });
    });
});
//Add item Form
router.get("/add", ensureAuthenticated, (req, res) => {
  res.render("inventory/add");
});
//Edit item Form
router.get("/edit/:id", ensureAuthenticated, (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
    .then(inventory => {
      if (inventory.user != req.user.id) {
        req.flash("error_msg", "Not Authorised");
        res.redirect("/inventory");
      }
      else {
        res.render("inventory/edit", {
          inventory: inventory
        });
      }
    });
});
//Process Form
router.post("/", ensureAuthenticated, (req, res) => {
  console.log(req.body);
  const newUser = {
    productId: req.body.productId,
    productName: req.body.productName,
    vendor: req.body.vendor,
    mrp: req.body.mrp,
    batchNum: req.body.batchNum,
    batchDate: req.body.batchDate,
    quantity: req.body.quantity,
    status: req.body.status,
    user: req.user.id
  }
  new Idea(newUser)
    .save()
    .then(inventory => {
      req.flash("success_msg", "Item is added");
      res.redirect("/inventory");
    });
});
//Edit Form Process
router.put("/:id", ensureAuthenticated, (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
    .then(inventory => {

      //new values
      inventory.productId = req.body.productId;
      inventory.productName = req.body.productName;
      inventory.vendor = req.body.vendor;
      inventory.mrp = req.body.mrp;
      inventory.batchNum = req.body.batchNum;
      inventory.batchDate = req.body.batchDate;
      inventory.quantity = req.body.quantity;
      inventory.status = req.body.status;

      inventory.save()
        .then(inventory => {
          req.flash("success_msg", "Item is updated");
          res.redirect("/inventory");
        })
    });
});
//Delete Item
router.delete("/:id", ensureAuthenticated, (req, res) => {
  Idea.remove({ _id: req.params.id })
    .then(() => {
      req.flash("success_msg", "Item is deleted");
      res.redirect("/inventory");
    });
});

module.exports = router;