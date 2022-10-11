const express = require("express");
const _ = require("lodash");
const Card = require("../models/Card");
const auth = require("../middlewares/auth");
const router = express.Router();

// post new card
router.post("/", auth, async (req,res)=>{
  try {
      if (!req.payload.biz) return res.status(400).send("Only bussiness accounts can add cards");
      const {value, error} = await cardValidation(req.body);
      if (error) return res.status(400).send(error.message);
      let card = new Card(value);
      let bizCheck = true;
      let newBizNumber;
      do {
          newBizNumber = _.random(1, 999);
          let checkCard = await Card.findOne({bizNumber: newBizNumber});
          if(!checkCard) bizCheck = false;
      } while (bizCheck);
          card.bizNumber = newBizNumber;
          card.userId = req.payload._id;
          await card.save();
          res.status(200).send(card);
  } catch (error) {
      res.status(400).send("Error in card" + error);
  }
});

// get all user's cards
router.get("/myCards", auth, async (req,res)=>{
  try {
      if (!req.payload.biz) return res.status(400).send("Only bussiness accounts can have cards");
      let cards = await Card.find({userId: req.payload._id}, "-userId -__v");
      res.status(200).send(cards);
  } catch (error) {
      res.status(400).send("Error in card" + error);
  }
});

// get full card   by card id
router.get("/:id", auth, async (req,res)=>{
  try {
      let card = await Card.findById(req.params.id);
      if(!card) return res.status(404).send("No card found");
      res.status(200).send(card);
  } catch (error) {
      res.status(400).send("Error in card" + error);
  }
});

// put update card   by card id
router.put("/:id", auth, async (req,res)=>{
  try {
      const {value, error} = await cardValidation(req.body);
      if(error) return res.status(400).send(error.message);
      let card = await Card.findOneAndUpdate({_id: req.params.id, userId: req.payload._id}, value, {new:true,});
      if(!card) return res.status(405).send("Method not allowed");
      res.status(200).send(card);
  } catch (error) {
      res.status(400).send("Error in card" + error);
  }
});

// delete card   by card id
router.delete("/:id", auth, async (req,res)=>{
  try {
      let card = await Card.findOneAndDelete({_id: req.params.id, userId: req.payload._id});
      if(!card) return res.status(405).send("Method not allowed");
      res.status(200).send("Card deleted successfully");
  } catch (error) {
      res.status(400).send("Error in card" + error);
  }
});

// get all cards
router.get("/", auth, async (req,res)=>{
  try {
      let cards = await Card.find({},"-_id -bizNumber -userId -__v");
      res.status(200).send(cards);
  } catch (error) {
      res.status(400).send("Error in card" + error);
  }
});

module.exports = router;
