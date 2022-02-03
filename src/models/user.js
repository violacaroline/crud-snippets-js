import mongoose from 'mongoose'

// Create a schema. SHOULD I HAVE A USER SCHEMA?
const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1,
    maxlength: 30
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 30
  }
}, {
  timestamps: true, // NECESSARY FOR USER MODEL?
  toObject: {
    virtuals: true, // ensure virtual fields are serialized
    /**
     * Performs a transformation of the resulting object to remove sensitive information.
     *
     * @param {object} doc - The mongoose document which is being converted.
     * @param {object} ret - The plain object representation which has been converted.
     */
    transform: function (doc, ret) {
      delete ret._id
      delete ret.__v // NECESSARY FOR USER MODEL?
    }
  }
})

schema.virtual('id').get(function () {
  return this._id.toHexString() // NECESSARY FOR USER MODEL?
})

// Create a model using the schema.
export const User = mongoose.model('User', schema)
