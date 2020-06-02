const showsService = require("../service/shows-service");

exports.getProd = async function(req, res) {
  try {
    const showData = await showsService.getProduction(req.params.prodId);
    const shows = combineShows(showData);
    console.log(shows)

    if (req.params.prodId) {
      res.status(200).json(shows[req.params.prodId]);
    }
    else {
      res.status(200).json(shows);
    }
    console.log("details received by SHOWS controller");

  } catch (err) {
    console.log(err);
    res.status(400).json({errMessage: "Unable to get show data."});
  }
};

// Combine the separate entries from the inner join to one entry
function combineShows(shows) {
  let showMap = new Map();
  for (const i in shows) {
    if (!showMap.has(shows[i].production_id)) {
      showMap.set(shows[i].production_id, i);
      shows[i].date = [shows[i].date];
      shows[i].doors_open = [shows[i].doors_open];
      shows[i].total_seats = [shows[i].total_seats];
      shows[i].sold = [shows[i].sold];
    }
    else {
      const index = showMap.get(shows[i].production_id);
      shows[index].date.push(shows[i].date);
      shows[index].doors_open.push(shows[i].doors_open);
      shows[index].total_seats.push(shows[i].total_seats);
      shows[index].sold.push(shows[i].sold);
    }
  }
  let result = {};
  for (const i of showMap.values()) {
    result[shows[i].production_id] = shows[i];
  }
  return result;
}

exports.getSeats = async function(req, res) {
  try {
    const seatsData = await showsService.getSeats(req.params.prodId);

    // Need to combine those of the same showid together and have a list of seat numbers instead of many rows
    const seats = combineSeats(seatsData);

    console.log(seats)
    res.status(200).json(seats);

  } catch (err){
    res.status(400).json({errMessage: "Unable to get seats data."});
  }
};


function combineSeats(seats) {
  let seatMap = new Map();
  for (const i in seats) {
    if (!seatMap.has(seats[i].show_id)) {
      seatMap.set(seats[i].show_id, i);
      seats[i].seat_number = [seats[i].seat_number];

    }
    else {
      const index = seatMap.get(seats[i].show_id);
      seats[index].seat_number.push(seats[i].seat_number);

    }
  }
  let result = {};
  for (const i of seatMap.values()) {
    result[seats[i].show_id] = seats[i];
  }
  return result;
}
    