const express = require("express");
const trainRouter = express.Router();

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
  } else {
    return true;
  }
};

const seatBooking = (number) => {
  if (seatBookingPossible(number)) {
    let flag = false;
    for (let i = 0; i < seats.length; i++) {
      console.log("aaaa");
      console.log(emptySeats[i], number);
      if (status[i]) {
        if (i === 11) {
          return false;
        }
        continue;
      }

      if (emptySeats[i] >= number) {
        let j;
        let startIndex = i === 11 ? 3 - emptySeats[i] : 7 - emptySeats[i];
        console.log("startIndex => currentRow ", startIndex, i);
        for (j = startIndex; j < startIndex + number; j++) {
          seats[i][j] = 1;
        }
        emptySeats[i] -= number;
        if (i !== 11 && j >= 7) {
          status[i] = 1;
        } else if (i === 11 && j >= 3) {
          status[i] = 1;
        }
        break;
      } else {
        if (i === 11) {
          return false;
        }
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

  res.send({ msg: "reset successfully", data: seats });
});

module.exports = { trainRouter };
