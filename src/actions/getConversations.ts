import prisma from '@/libs/prismadb'
import getCurrentUser from './getCurrentUser'


const getConversations = async () => {
    const currentUser = await getCurrentUser()
    if(!currentUser?.id) {
        return []
    }

    try {
        const conversations = await prisma.conversation.findMany({
            //Order users by the new last message a user send (like telegram or whatsapp)
            orderBy : {
                lastMessageAt : 'desc'
            } , 
            //load every conversation that includes the currentUser
            where : {
                userIds : {
                    has : currentUser.id
                } , 
     },
            include : {
                users : true , 
                messages : {
                    include : {
                        sender : true , 
                        seen : true
                    }
                }
            }
    })
    return conversations
    } catch (error) {
        console.log(error);
        return []
    }
}

export default getConversations ;