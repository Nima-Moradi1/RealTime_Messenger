import { NextResponse } from "next/server";

interface Iparams {
    conversationId? : string
}

export async function POST(request:Request , {params} : {params : Iparams}){
     try {
        
     } catch (error) {
        console.log(error , "ERROR_CONVERSATION_SEEN_API");
        return NextResponse.json('Internal Error', {status : 500})
     }
}