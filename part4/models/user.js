import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    unique: true,
    required: true
  },
  name: String,
  passwordHash: {
    type: String,
    required: true
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog"
    }
  ],
})

userSchema.set("toJSON", {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
    delete returnObject.__v
    // passwordHash not revealed
    delete returnObject.passwordHash
  }
})

const User = mongoose.model("User", userSchema)

export default User