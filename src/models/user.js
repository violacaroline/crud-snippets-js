import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

// Create bcrypt
const bcrypt = bcryptjs

// Create a schema. SHOULD I HAVE A USER SCHEMA?
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: [10, 'The password must be at least 10 characters long.'],
    maxlength: 500
  }
}, {
  timestamps: true, // NECESSARY FOR USER MODEL?
  versionKey: false,
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

userSchema.virtual('id').get(function () {
  return this._id.toHexString() // NECESSARY FOR USER MODEL?
})

// Salts and hashes password before save.
userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 8)
})

// Create a model using the schema.
export const User = mongoose.model('User', userSchema)
