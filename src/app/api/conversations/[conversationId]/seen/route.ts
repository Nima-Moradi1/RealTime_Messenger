import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/libs/prismadb'
import { pusherServer } from "@/libs/pusher";


type Params = { conversationId: string };


export async function POST(request:Request , {params} : {params : Promise<Params>}){
     try {
        const {conversationId} = await params ;
        const currentUser = await getCurrentUser()
        if(!currentUser?.email || !currentUser?.id) {
            return new NextResponse('Unauthorized' , {status : 401});
        }
            const conversation = await prisma.conversation.findUnique({
                where : {
                    id: conversationId
                } , 
                include : {
                    messages : {
                        include : {
                            seen : true
                        }
                    },
                    users : true
                }
            })
            if(!conversation) {
                return new NextResponse('Invalid ID' , {status : 400})
            }

            //find the last message here 
            const lastMessage = conversation?.messages[conversation?.messages?.length - 1]
            if(!lastMessage) {
                return NextResponse.json(conversation)
            }

            // update seen of last message
            const updatedMessage = await prisma.message.update({
                where : {
                    id : lastMessage?.id
                } , 
                include : {
                    sender : true , 
                    seen : true
                }, 
                data : {
                    seen : {
                        connect : {
                            id: currentUser?.id
                        }
                    }
                }
            })
            await pusherServer.trigger(currentUser.email , 'conversations:update' , {
                id : conversationId , 
                messages : [updatedMessage]
            })

            if(lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
                return NextResponse.json(conversation)
            }
            await pusherServer.trigger(conversationId! , 'messages:update' , updatedMessage)

            return NextResponse.json(updatedMessage);

     } catch (error) {
        console.log(error , "ERROR_CONVERSATION_SEEN_API");
        return new NextResponse('Internal Error', {status : 500})
     }
}