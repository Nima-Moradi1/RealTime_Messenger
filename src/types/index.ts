import { Conversation , Message , User } from "@prisma/client";

//? In case you're wondering why we extended some types , it's because in our action files,
//? We used the include object to contain users and messages and ... ; so we can't just pass a single
//? Type from Prisma to the object or array of objects we're passing to components!

export type FullMessageType = Message & {
    sender : User , 
    seen : User[]
}

export type FullConversationType = Conversation & {
    users : User[] , 
    messages : FullMessageType[]
}