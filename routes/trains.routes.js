const express = require("express");
// const {TrainModel} = require("../models/train.models")
const trainRouter = express.Router();
// const { record } = require("../middleware/record.middleware");

let lastBookedRow = 0;
let lastBookedCol = 0;
let seats = [
    [0, 0, 0, 0, 0, 0, 0], //0
    [0, 0, 0, 0, 0, 0, 0], //1
    [0, 0, 0, 0, 0, 0, 0], //2
    [0, 0, 0, 0, 0, 0, 0], //3
    [0, 0, 0, 0, 0, 0, 0], //4
    [0, 0, 0, 0, 0, 0, 0], //5
    [0, 0, 0, 0, 0, 0, 0], //6
    [0, 0, 0, 0, 0, 0, 0], //7
    [0, 0, 0, 0, 0, 0, 0], //8
    [0, 0, 0, 0, 0, 0, 0], //9
    [0, 0, 0, 0, 0, 0, 0], //10
    [0, 0, 0] //11
]

const seatBookingPossible = (number) => {
    if (number > 7) {
        return false;
    }
    else if (lastBookedRow === 11 && lastBookedCol >= 4) {
        return false;
    }
    else if (lastBookedRow >= 12) {
        return false;
    }
    else {
        return true;
    }
}

trainRouter.post('/book', async (req, res) => {
    const number = parseInt(req.body.number);
    console.log("number ", number);
  try {
    // check if seat can be booked
      // if seat can be booked book
      if (seatBookingPossible(number)) {
          if (number === 1) {
              seats[lastBookedRow][lastBookedCol] = 1;
              lastBookedCol+= 1
          }
          else if (number <= (6-lastBookedCol+1)) {
              for (let i = lastBookedCol; i < lastBookedCol + number; i++){
                  seats[lastBookedRow][i] = 1;
              }
              lastBookedCol = lastBookedCol + number;
          }
          else if (number > (6 - lastBookedCol)) {
              let seatInCurrentRow = 6 - lastBookedCol;
              console.log(number, seatInCurrentRow, lastBookedCol);
              for (let i = lastBookedCol; i <= lastBookedCol+seatInCurrentRow; i++){
                  seats[lastBookedRow][i] = 1;
              }
              lastBookedRow++;
              lastBookedCol = 0;
              let seatInNextRow = number - seatInCurrentRow-1;
              for (let i = 0; i < seatInNextRow; i++){
                  seats[lastBookedRow][i] = 1;
              }
              lastBookedCol = seatInNextRow;
          }
          if (lastBookedRow !== 11 && lastBookedCol >= 7) {
              lastBookedRow++;
              lastBookedCol = 0;
          }
          else if (lastBookedRow === 11 && lastBookedCol>=3) {
              lastBookedRow++;
              lastBookedCol = 0;
          }
          console.log(seats);
          res.send({ msg: "Seat booked successfully", data: seats})
      }
      else {
        res.send({msg: "Seat can not be booked", data: seats})    
      }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error booking seat' });
  }
});

// Routes
trainRouter.get('/list', async (req, res) => {
  try {
    res.send({"data": "aaaaaaa"});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching seats' });
  }
});

trainRouter.post('/reset', async (req, res) => {
    seats = [
        [0, 0, 0, 0, 0, 0, 0], //0
        [0, 0, 0, 0, 0, 0, 0], //1
        [0, 0, 0, 0, 0, 0, 0], //2
        [0, 0, 0, 0, 0, 0, 0], //3
        [0, 0, 0, 0, 0, 0, 0], //4
        [0, 0, 0, 0, 0, 0, 0], //5
        [0, 0, 0, 0, 0, 0, 0], //6
        [0, 0, 0, 0, 0, 0, 0], //7
        [0, 0, 0, 0, 0, 0, 0], //8
        [0, 0, 0, 0, 0, 0, 0], //9
        [0, 0, 0, 0, 0, 0, 0], //10
        [0, 0, 0] //11
    ]
    lastBookedRow = 0;
    lastBookedCol = 0;
    res.send({"data": "reset successfully"});
})


module.exports = { trainRouter };