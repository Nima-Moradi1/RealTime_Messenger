import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/libs/prismadb'
import { pusherServer } from "@/libs/pusher";

type Params = { conversationId: string };

export async function DELETE(reuqest:Request , {params} : {params : Promise<Params>}){
    try {
        const {conversationId} = await params
        const currentUser = await getCurrentUser()
        if(!currentUser?.email || !currentUser?.id) {
            return new NextResponse('Unathorized' , {status : 401})
        } 
        const existingConversation = await prisma?.conversation.findUnique({
            where  : {
                id: conversationId
            } , 
            include : {
                users : true
            }
        })
        if(!existingConversation) {
            return new NextResponse('Invalid ID' , {status : 400})
        }

        const deletedConversation = await prisma.conversation.deleteMany({
            where : {
                id: conversationId , 
                //Protect that not anyone can delete any conversation , only users that are part of that conversation or group
                userIds : {
                    hasSome : [currentUser.id]
                }
            } 
        })
        existingConversation.users.forEach( async (user)=> {
            if(user.email) {
               await pusherServer.trigger(user.email , 'conversation:remove' , existingConversation)
            }
        })
        return NextResponse.json(deletedConversation) ;
        
    } catch (error) {
        console.log(error , 'ERROR_DELETE_CONVERSATION_API');
        return new NextResponse('Interal Error ' , {status : 500})
    }
}