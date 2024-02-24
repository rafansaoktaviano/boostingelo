const test = [
  {
    rank: "iron",
    service: [
      {
        divion: "1",
        price: 2,
      },
      {
        divion: "2",
        price: 2,
      },
      {
        divion: "3",
        price: 2,
      },
    ],
  },
  {
    rank: "silver",
    service: [
      {
        divion: "1",
        price: 4,
      },
      {
        divion: "2",
        price: 4,
      },
      {
        divion: "3",
        price: 4,
      },
    ],
  },
];

let totalCost = 0;
const gege = (
  rating = "26-50RR",
  currentRank = "iron",
  currentDivision = "1",
  targetRank = "silver",
  targetDivision = "3"
) => {
  let foundCurrent = false;
  for (const rank of test) {
    for (const service of rank.service) {
      if (foundCurrent) {
        totalCost += service.price;
        if (rank.rank === targetRank && service.divion === targetDivision) {
          console.log(totalCost);
          return totalCost;
        }
      }
      //     console.log(rank.divion == currentDivision);
      //     console.log(rank.divion);
      //   //   console.log(rank);
      if (rank.rank === currentRank && service.divion === currentDivision) {
        // console.log(service);
        // console.log(rank);
        foundCurrent = true;
        if (rating === "26-50RR") {
          totalCost -= service.price * 0.2;
        } else if (rating === "50-75RR") {
          totalCost -= service.price * 0.3;
        } else if (rating === "76-100RR") {
          totalCost -= service.price * 0.4;
        }

        // if (service.divion === currentDivision) {
        //   totalCost += service.price * 0.5;
        // } else {
        //   totalCost += service.price;
        // }
      }
    }
  }
};

gege();
