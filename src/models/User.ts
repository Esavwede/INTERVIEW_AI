
import mongoose, { Schema, Document } from "mongoose" 
import bcrypt from "bcrypt" 
import { ILearningModuleOverview, LearningModuleOverviewSchema } from "./LearningModule"
import logger from "@src/system/logger/logger"


// User Interface 
export interface IUser extends Document 
{
  firstname: string, 
  lastname: string,
  email: string, 
  password: string,
  isVerified: boolean, 
  newUser: boolean, 
  createdAt: Date, 
  updatedAt: Date, 
  learningProfile: ILearningModuleOverview[], 
  userHasCreatedFirstJobProfile: boolean, 
  comparePassword( candidatePassword: string): Promise<boolean> 
}


  // User Schema 
  const UserSchema = new Schema<IUser>(
    {
        firstname: 
        {
            type: String,
            minlength: 2
        },
        lastname: 
        {
            type: String, 
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
          required: false, 
          minlength: 6 
        },
        isVerified:   
        {
          type: Boolean,
          required: true, 
          default: false 
        },
        newUser: 
        {
          type: Boolean, 
          required: true, 
          default: true 
        },
        learningProfile:
        {
          type: [ LearningModuleOverviewSchema ]
        },
        userHasCreatedFirstJobProfile: 
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

  // Hash Password If Modified 
  UserSchema.pre("save", async function(next){

      if( !this.isModified('password') )return next()
      const salt = await bcrypt.genSalt(10) 
      this.password = await bcrypt.hash( this.password, salt )
      next() 
  })


// User Compare Password Method
UserSchema.methods.comparePassword = async function( candidatePassword: string ): Promise<boolean> {
    try 
    {
        return await bcrypt.compare( candidatePassword, this.password )
    }
    catch(e: any)
    {
        logger.error(e,'Bcrypt Error') 
        return false
    }
}


export const User = mongoose.model<IUser>("User", UserSchema ) 