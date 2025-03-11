import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/libs/prismadb'


export async function POST(request : Request) {
    try {
        const currentUser = await getCurrentUser()
        const body = await request.json()
        const {
            userId ,
            isGroup , 
            members, 
            name
        } = body
        //only execute the rest if there already is a user logged in
        if(!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized' , {status : 401})
        }
        //a group cannot have less than 2 members or does not include a name
        if(isGroup && (!members || members.length < 2 || !name)) {
            return new NextResponse('Invalid Data' , {status : 400})
        }
        // creating a group chat (not sensitive to name or exact members)
        if(isGroup) {
            const newConversation = await prisma.conversation.create({
                data : {
                    name , 
                    isGroup , 
                    users : {
                        connect : [
                            ...members.map((member : {value : string})=> ({
                                id:member.value
                            })) , 
                            {
                                id:currentUser.id
                            }
                        ]
                    }
                } , 
                //because we need all users data (image , name , ..) we include users too (instead of just their ids)
                include : {
                    users : true
                }
            })
            return NextResponse.json(newConversation)
        }
        //one to one conversation (here however, we should check if we already have a conversation with that user or not)
        const existingConversation = await prisma.conversation.findMany({
            where : {
                OR : [
                     {
                        userIds : {
                            equals : [currentUser.id , userId]
                        }
                    } , 
                    {
                        userIds : {
                            equals : [userId , currentUser.id]
                        }
                    }
                ]
            }
        }) ;
        const singleConversation = existingConversation[0];
        if(singleConversation) {
            return NextResponse.json(singleConversation)
        }
        const newConversation = await prisma.conversation.create({
            data : {
                users : {
                    connect : [
                        {
                            id:currentUser.id
                        } , 
                        {
                            id: userId
                        }
                    ]
                } 
            } , 
            include : {
                users : true
            }
        }
    )
    return NextResponse.json(newConversation)

    } catch (error) {
        console.log(error);
        return new NextResponse('Internal Error' , {status : 500})
    }
}