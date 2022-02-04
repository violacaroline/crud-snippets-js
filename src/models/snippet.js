import mongoose from 'mongoose'
import { User } from './user.js'
// Create a schema.
const schema = new mongoose.Schema({
  userId: {
    type: String,
    id: User._id
  },
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 50
  },
  snippet: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 500
  } // NEEDS A CREATOR TO BE ABLE TO AUTHORIZE???
}, {
  timestamps: true,
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
      delete ret.__v
    }
  }
})

schema.virtual('id').get(function () {
  return this._id.toHexString()
})

// Create a model using the schema.
export const Snippet = mongoose.model('Snippet', schema)
