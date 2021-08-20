import * as express from "express";
import * as mysql from "mysql";

export const router = express.Router();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

connection.connect(() => {
  console.log("DB connected!");
});

router.get("/hello", (_, res) => {
  res.status(200).json({
    greetings: "Thank you for spending some time on this test. All the best 🙌",
  });
});

router.get("/events", (_, res) => {
  /* 
    {  
      "id":"decaa026-2ce5-49cb-aff9-92326b85a98c",
      "event_type":"mood_observation",
      "visit_id":"39b94aab-cc35-4874-807f-c23472aec663",
      "timestamp":"2019-04-23T10:53:13+01:00",
      "caregiver_id":"4786d616-259e-4d52-80f7-8cf7dc6d881a",
      "care_recipient_id":"03f3306d-a4a3-4179-ab88-81af66df8b7c",
      "mood":"okay",
    }
  */

  connection.query("SELECT * from events limit 10;", function (err, results) {
    if (err) throw err;

    // console.log("The solution is: ", rows);

    res.status(200).json({
      events: results,
    });
  });
});

/* 
connection.end(() => {
  console.log("DB Disconected!");
}); 
*/
