import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/libs/prismadb'


export async function POST(request:Request) {
    try {
        const currentUser = await getCurrentUser()
        const body = await request.json() ;
        const {
            message , image , conversationId
        } = body ;
        if(!currentUser?.id || !currentUser?.email) {
            return new NextResponse("Unauthorized" , {status : 401})
        }

        const newMessage = await prisma.message.create({
            data : {
                body : message, 
                image : image , 
                conversation : {
                    connect : {
                        id:conversationId
                    }
                } , 
                sender : {
                    connect : {
                        id: currentUser.id
                    }
                } , 
                seen : {
                    connect : {
                        id : currentUser.id
                    }
                }
            } , 
            include : {
                seen: true ,
                sender : true
            }
        })
            // this works with pusher to realtime update (not working now (we don't have pusher))
        const updatedConversation = await prisma.conversation.update({
            where : {
                id : conversationId
            } , 
            data : {
                lastMessageAt : new Date() , 
                messages : {
                    connect : {
                        id:newMessage.id
                    }
                }
            } , 
            include : {
                users : true , 
                messages : {
                    include : {
                        seen : true
                    }
                }
            }
        })
        //for now we use the newMessage since we don't have pusher to use updateConversation
        return NextResponse.json(newMessage)

    } catch (error) {
        console.log(error , "ERROR_MEESAGE_API");
        return new NextResponse('Internal Error' , {status : 500}) ;
    }
}