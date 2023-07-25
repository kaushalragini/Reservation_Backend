const express = require("express");
const trainRouter = express.Router();
// step-1
// used 2d array dataStructure to make this seat
// initialize each row inside element with zero which means seat is empty
// for the last row take only three element to make seat count 80

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
// step-2 create one more array which says number of empty seat in each row
let emptySeats = [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3];

// step-3 create one another array which says the status of each row no of booked seat initialize with zero which means no seat is booked

let status = [0, 0, 0, 0, 0, 0, 0, 0];
// step-4 apply basic condition which one function

const seatBookingPossible = (number) => {
  // if seat number is greater than 7 which means you can not book the seats
  if (number > 7) {
    return false;
    // other wise return true
  } else {
    return true;
  }
};
// step-5 make another function for handling all possible cases

const seatBooking = (number) => {
  if (seatBookingPossible(number)) {
    // if number is less than 7 then run a loop on 2d array
    for (let i = 0; i < seats.length; i++) {
      console.log(emptySeats[i], number);
      // if status[i]===1 which means you seat is already booked and return false
      if (status[i]) {
        // check one more condition like i===11 means no more row is availabe to check
        if (i === 11) {
          return false;
        }
        continue;
      }
      // if emptyseats array element is greater than number which means seat is available
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
