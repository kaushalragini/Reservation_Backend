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
  [0, 0, 0], //11
];
let emptySeats = [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3];
let status = [0, 0, 0, 0, 0, 0, 0, 0];

const seatBookingPossible = (number) => {
  if (number > 7) {
    return false;
  } else if (lastBookedRow === 11 && lastBookedCol >= 4) {
    return false;
  } else if (lastBookedRow >= 12) {
    return false;
  } else {
    return true;
  }
};

const seatBookingInRow = (number, row) => {
  if (emptySeats[row] <= number) {
    return true;
  }
  return false;
};

const seatBooking = (number) => {
  if (seatBookingPossible(number)) {
    for (let i = 0; i < seats.length; i++) {
      if (status[i]) {
        continue;
      }
      console.log("aaaa");
      console.log(emptySeats[i], number);

      if (emptySeats[i] >= number) {
        let j;
        for (j = 7 - emptySeats[i]; j < 7 - emptySeats[i] + number; j++) {
          seats[i][j] = 1;
        }
        emptySeats[i] -= number;
        // lastBookedCol = lastBookedCol + number;
        if (i !== 11 && j >= 7) {
          // lastBookedRow++;
          // lastBookedCol = 0;
          status[i] = 1;
        } else if (i === 11 && j >= 3) {
          // lastBookedRow++;
          // lastBookedCol = 0;
          status[i] = 1;
        }
        break;
      } else {
        continue;
      }
    }
    return true;
  } else {
    return false;
  }
};

trainRouter.post("/book", async (req, res) => {
  const number = parseInt(req.body.number);
  console.log("number ", number);
  try {
    if (seatBooking(number)) {
      res.send({ msg: "Seat booked successfully", data: seats });
    } else {
      res.send({ msg: "Seat can not be booked", data: seats });
    }
    // check if seat can be booked
    // if seat can be booked book
    // if (seatBookingPossible(number)) {
    //   if (number === 1) {
    //     seats[lastBookedRow][lastBookedCol] = 1;
    //     lastBookedCol += 1;
    //   } else if (number <= 6 - lastBookedCol + 1) {
    //     for (let i = lastBookedCol; i < lastBookedCol + number; i++) {
    //       seats[lastBookedRow][i] = 1;
    //     }
    //     lastBookedCol = lastBookedCol + number;
    //   } else if (number > 6 - lastBookedCol) {
    //     let seatInCurrentRow = 6 - lastBookedCol;
    //     console.log(number, seatInCurrentRow, lastBookedCol);
    //     for (
    //       let i = lastBookedCol;
    //       i <= lastBookedCol + seatInCurrentRow;
    //       i++
    //     ) {
    //       seats[lastBookedRow][i] = 1;
    //     }
    //     lastBookedRow++;
    //     lastBookedCol = 0;
    //     let seatInNextRow = number - seatInCurrentRow - 1;
    //     for (let i = 0; i < seatInNextRow; i++) {
    //       seats[lastBookedRow][i] = 1;
    //     }
    //     lastBookedCol = seatInNextRow;
    //   }
    //   if (lastBookedRow !== 11 && lastBookedCol >= 7) {
    //     lastBookedRow++;
    //     lastBookedCol = 0;
    //   } else if (lastBookedRow === 11 && lastBookedCol >= 3) {
    //     lastBookedRow++;
    //     lastBookedCol = 0;
    //   }
    //   console.log(seats);
    //   res.send({ msg: "Seat booked successfully", data: seats });
    // } else {
    //   res.send({ msg: "Seat can not be booked", data: seats });
    // }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error booking seat" });
  }
});

// Routes
trainRouter.get("/list", async (req, res) => {
  try {
    res.send({ data: "aaaaaaa" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching seats" });
  }
});

trainRouter.post("/reset", async (req, res) => {
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
    [0, 0, 0], //11
  ];
  emptySeats = [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3];
  status = [0, 0, 0, 0, 0, 0, 0, 0];
  lastBookedRow = 0;
  lastBookedCol = 0;

  res.send({ msg: "reset successfully", data: seats });
});

module.exports = { trainRouter };
