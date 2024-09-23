import c from "config";
import { NextFunction, Request, Response} from "express";




export function ensureRequestDefined( req: Request, res: Response, next: NextFunction)
{
        if( req.user === undefined) return res.status(500).json({ success: false, msg:"Server Error "})
        if( req.context === undefined ) return res.status(500).json({ success: false, msg:"Server Error "})

        const userLogContext = req.context
        const user = req.user 

        if( !userLogContext ) return res.status(500).json({ success: false, msg:"Server Error "})
        if( !user ) return res.status(500).json({ success: false, msg:"Server Error "})

        return next() 
}