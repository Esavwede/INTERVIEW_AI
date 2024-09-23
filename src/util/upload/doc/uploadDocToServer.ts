
import multer from "multer" 
import path from "path";
import { config } from "dotenv"
config() 

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
     
        // Validate file
      const uploadPath = path.resolve("src", "uploads")
      cb(null, uploadPath ); 
    },
    filename: (req, file, cb) => {
    
      const userId = req.user?._id 
      const fileExt = path.extname( file.originalname )  
      cb(null, `${userId}-resume.${ fileExt }`)
    },
  });


  export const uploadToServer = multer({ storage , limits: { fileSize: 3 * 1024 * 1024 }});

