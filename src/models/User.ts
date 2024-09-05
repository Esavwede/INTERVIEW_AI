import mongoose, { Schema, Document } from "mongoose" 
import bcrypt from "bcrypt" 

export interface IUser extends Document 
{
  firstname: string, 
  lastname: string,
  email: string, 
  password: string, 
  isVerified: boolean, 
  createdAt: Date, 
  updatedAt: Date, 
  comparePassword( candidatePassword: string): Promise<boolean> 
}


  const userSchema = new Schema<IUser>(
    {
        firstname: 
        {
            type: String,
            required: true,
            minlength: 2
        },
        lastname: 
        {
            type: String, 
            required: true, 
            minlength: 2
        }, 
        email: 
        {
          type: String,
          required: true, 
          minlength: 2, 
          unique: true 
        },
        password:
        {
          type: String, 
          required: true, 
          minlength: 6 
        },
        isVerified:   
        {
          type: Boolean,
          required: true, 
          default: false 
        }
    },
    {
      timestamps: true 
    }
  )

  userSchema.pre("save", async function(next){

      if( !this.isModified('password') )return next()
      const salt = await bcrypt.genSalt(10) 
      this.password = await bcrypt.hash( this.password, salt )
      next() 
  })

  
userSchema.methods.comparePassword = async function( candidatePassword: string ): Promise<boolean> {
    try 
    {
        return await bcrypt.compare( candidatePassword, this.password )
    }
    catch(e: any)
    {
        return false
    }
}


  export const User = mongoose.model<IUser>("User", userSchema ) 