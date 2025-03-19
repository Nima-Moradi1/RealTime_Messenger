//Since Pusher does not support some features for app router, we created a pages directory
//To write the logic for Active status of users

import { NextApiRequest , NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { pusherServer } from "@/libs/pusher";


 async function handler(request:NextApiRequest, response : NextApiResponse){
    const session = await getServerSession(request , response , authOptions) ;
    if(!session?.user?.email) {
        return response.status(401);
    }

    const socketId = request.body.socket_id ;
    const channel = request.body.channel_name ;
    const data = {
        user_id : session.user.email
    }

    const authResponse = pusherServer.authorizeChannel(socketId , channel,data);

    return response.send(authResponse)
}

export default handler;