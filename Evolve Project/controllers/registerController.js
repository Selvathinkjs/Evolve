const con = require("../db/connect");

const getRegister = async (req, res) => {
  const sql = "SELECT * FROM Register";
  con.query(sql, (err, rows, field) => {
    if (err) throw err;
    res.status(200).json({ msg: rows });
  });
};
// register

const createRegister = async (req, res) => {
  try {
    const {
      fullName,
      Mobile_Number,
      Work_Email,
      Appointment_Date,
      City,
      State,
      Learn_skills,
      Learn_budget,
      Zero_cost_EMI,
      Explore_learning_options,
      Aadharcard,
      Pancard,
      Dateofbirth,
      Gender,
      Marital_status,
      Current_residency_pincode,
    } = req.body;

    // valid email through regex
    const emailValReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailValReg.test(Work_Email))
      return res.status(401).json("provide valid email");

    //Check email already exists - 'Exists' means alias column name for email
    let isEmailExists =
      "select count(Work_Email) 'Exists' From Register Where Work_Email = ?";
    con.query(isEmailExists, [Work_Email], (err, result) => {
      if (err) {
        throw err;
      } else {
        let row = "";
        Object.keys(result).forEach(function (key) {
          row = result[key];
          //console.log("row.Exists: ", row.Exists);
        });
        if (row.Exists < 1) {
          const sql =
            "INSERT INTO Register(fullName,Mobile_Number,Work_Email,Appointment_Date,City,State, Learn_skills, Learn_budget, Zero_cost_EMI,Explore_learning_options, Aadharcard, Pancard, Dateofbirth, Gender, Marital_status,Current_residency_pincode) VALUES('" +
            fullName +
            "','" +
            Mobile_Number +
            "','" +
            Work_Email +
            "','" +
            Appointment_Date +
            "', '" +
            City +
            "', '" +
            State +
            "', '" +
            Learn_skills +
            "','" +
            Learn_budget +
            "', '" +
            Zero_cost_EMI +
            "','" +
            Explore_learning_options +
            "','" +
            Aadharcard +
            "','" +
            Pancard +
            "','" +
            Dateofbirth +
            "','" +
            Gender +
            "','" +
            Marital_status +
            "','" +
            Current_residency_pincode +
            "')";
          if (fullName != "" && Work_Email != "") {
            con.query(sql, (err) => {
              if (err) throw err;
              res.status(200).json({ msg: "User Registered" });
            });
          } else {
            res.send("All the fields are required");
          }
        } else return res.status(401).json({ msg: "email already exists" });
      }
    });
  } catch (err) {
    res.status(500).status({ msg: err });
  }
};

module.exports = {
  getRegister,
  createRegister,
};
