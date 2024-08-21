const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({

  experience:[{ 
   company: {
    type: String,
    default: ""
  },
  title:{
    type: String,
    default: ""
  },
  startDate:{
    type: String,
    default: ""
  },
  endDate:{
    type: String,
    default: ""
  },
  description:{
    type: String,
    default: ""
  },
}],
  certificate:[{ 
   name: {
    type: String,
    default: ""
  },
  description:{
    type: String,
    default: ""
  }, 
}],
  award:[{ 
   title: {
    type: String,
    default: ""
  },
  description:{
    type: String,
    default: ""
  }, 
}],
achievement:[{ 
  description:{
    type: String,
    default: ""
  }, 
}],
postGraduation:[{ 
  degree:{
    type: String,
    default: ""
  }, 
  university:{
    type: String,
    default: ""
  }, 
  year:{
    type: String,
    default: ""
  }, 
  score:{
    type: String,
    default: ""
  }, 
}],
graduation:[{ 
  degree:{
    type: String,
    default: ""
  }, 
  university:{
    type: String,
    default: ""
  }, 
  year:{
    type: String,
    default: ""
  }, 
  score:{
    type: String,
    default: ""
  }, 
}],
srSecondary:[{ 
  stream:{
    type: String,
    default: ""
  }, 
  board:{
    type: String,
    default: ""
  }, 
  year:{
    type: String,
    default: ""
  }, 
  score:{
    type: String,
    default: ""
  }, 
}],
// 
patent:[{ 
  name: {
    type: String,
    default: ""
  },
  description:{
    type: String,
    default: ""
  }, 
}],
interest:[{ 
  title: {
    type: String,
    default: ""
  },

}],
language:[{ 
  label: {
    type: String,
    default: ""
  },
  value: {
    type: String,
    default: ""
  },
  rating:{
    type: Number,
    default: 0
  }, 
}],
reference:[{ 
  name: {
    type: String,
    default: ""
  },
  contact:{
    type: String,
    default: ""
  }, 
  email:{
    type: String,
    default: ""
  }, 
}],

generalInformation:{
  type: String,
  default: ""
}, 
 
  // Add more fields as needed
  user: {
    type: Schema.Types.ObjectId,
    ref: "myUser",
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("myProfile", ProfileSchema);
