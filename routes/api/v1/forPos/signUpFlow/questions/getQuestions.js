const questionSets = require('./questions');

const GetQuestion = async (req, res) => {
  try {
    const setNumber = 1;

    // Check if the setnumber exists
    if (!setNumber || !questionSets[setNumber]) {
      return res.status(400).json({ message: "Invalid set number" });
    }

    // Send the appropriate set of questions
    res.status(200).json({ questions: questionSets[setNumber] , message: "Questions fetched successfully", variant: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = GetQuestion;
