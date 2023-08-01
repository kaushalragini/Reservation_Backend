const express = require("express");
const trainRouter = express.Router();
// step-1
// used 2d array dataStructure to make this seat
// initialize each row inside element with zero which means seat is empty
// for the last row take only three element to make seat count 80
// let total_seat = 90;
// let nRows = 12;
// let ncol;
// let lastRowCol;

// if (total_seat % nRows === 0) {
//   ncol = Math.ceil(total_seat / nRows);
//   lastRowCol = 0;
// } else {
//   ncol = Math.ceil(total_seat / (nRows - 1)) - 1;
//   lastRowCol = total_seat -((nRows - 1) * ncol) ;
// }
// let nCol = Math.ceil(total_seat / nRows);

// let seatss = [];
// for (let i = 0; i < nRows; i++) {
//   let seat = [];
//   let last = ncol;
//   for (let j = 0; j < ncol; j++) {
//     seat[j] = 0;
//   }
//   seatss.push(seat);
// }

// let lastRowArray = [];
// for (let i = 0; i < lastRowCol; i++) {
//   lastRowArray[i] = 0;
// }
// if (lastRowCol) {
//   seatss.push(lastRowArray);
// }
// // seatss.push(lastRowArray);
// console.log(seatss);

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

let status = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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
  // if saet boking is possible go inside other wise return false
  if (seatBookingPossible(number)) {
    // if number is less than 7 then run a loop on 2d array
    for (let i = 0; i < seats.length; i++) {
      console.log(emptySeats[i], number);

      // if status[i]===1 which means you seat is already booked and return false
      if (status[i] === 1) {
        // check one more condition like i===11 means no more row is availabe to check
        if (i === 11) {
          return false;
        }
        continue;
      }
      // if emptyseats array element is greater than number which means seat is available
      if (emptySeats[i] >= number) {
        console.log("1111111", emptySeats);
        let minValue = +Infinity;
        let minIndex = -1;
        for (let k = 0; k < emptySeats.length; k++) {
          let diff = emptySeats[k] - number;
          if (diff >= 0 && diff < minValue) {
            minValue = diff;
            minIndex = k;
          }
          console.log(minValue, minIndex);
        }
        console.log("got the minimum index ", minIndex);
        if (minIndex !== -1) {
          let startIndex =
            minIndex === 11
              ? 3 - emptySeats[minIndex]
              : 7 - emptySeats[minIndex];
          console.log("1startIndex => currentRow ", startIndex, minIndex);
          for (j = startIndex; j < startIndex + number; j++) {
            seats[minIndex][j] = 1;
          }
        } else {
          let startIndex = i === 11 ? 3 - emptySeats[i] : 7 - emptySeats[i];
          console.log("2startIndex => currentRow ", startIndex, i);
          for (j = startIndex; j < startIndex + number; j++) {
            seats[i][j] = 1;
          }
        }
        let indexChange = minIndex === -1 ? i : minIndex;
        emptySeats[indexChange] -= number;
        if (indexChange !== 11 && j >= 7) {
          status[indexChange] = 1;
        } else if (indexChange === 11 && j >= 3) {
          status[indexChange] = 1;
        }
        break;
      } else {
        console.log("2222222222");
        if (i === 11) {
          console.log("3333333333");
          return false;
        }
        console.log("444444444");
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
// trainRouter.get("/list", async (req, res) => {
//   try {
//     res.send({ data: "aaaaaaa" });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching seats" });
//   }
// });

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
