

import { config } from "dotenv"
config() 
import axios from "axios";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import logger from "@src/system/logger/logger";



// Function to fetch the document from Cloudinary
export async function fetchUserResumeAsText( resumeUrl: string ): Promise<string> 
{
                try {
               

                logger.debug("Fetching Resume From Cloudinary")

                const username = process.env.CLOUDINARY_API_KEY || ''
                const password = process.env.CLOUDINARY_API_SECRET || '' 

                const response = await axios({
                    url: resumeUrl,
                    method: 'GET',
                    responseType: 'arraybuffer', // Get the document as a binary buffer
                });
      
                // Get the content type of the document
                const contentType = response.headers['content-type'];
                const documentBuffer = response.data;
            
                // Process the document based on the content type
                if (contentType === 'application/pdf') {
                    // Handle PDF document
                    return await handlePdfDocument(documentBuffer);
                } else if (contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                    // Handle DOCX document
                    return await handleDocxDocument(documentBuffer);
                } else {
                    throw new Error(`Unsupported document type: ${contentType}`);
                }
        } catch (error) {
          console.error('Error fetching or processing document:', error);
          throw error;
        }
}

// Function to handle PDF documents using pdf-parse
const handlePdfDocument = async (pdfBuffer: Buffer) => {
  try {
    const data = await pdfParse(pdfBuffer);
    return data.text; // Extracted text from the PDF
  } catch (error) {
    console.error('Error processing PDF document:', error);
    throw error;
  }
};

// Function to handle DOCX documents using mammoth
const handleDocxDocument = async (docxBuffer: Buffer) => {
  try {
    const result = await mammoth.extractRawText({ buffer: docxBuffer });
    return result.value; // Extracted text from the DOCX
  } catch (error) {
    console.error('Error processing DOCX document:', error);
    throw error;
  }
};


