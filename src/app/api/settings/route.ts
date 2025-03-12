import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server';

export async function POST(request:Request){

    try {
        const currentUser = await getCurrentUser() ;
        const body = await request.json(); 
        const {image , name} = body
        if(!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized' , {status : 401})
        }
        const updatedSettings = await prisma.user.update({
            where : {
                id: currentUser?.id
            } , 
            data : {
                image : image , 
                name : name
            }
        })

        return NextResponse.json(updatedSettings);

    } catch (error) {
        console.log(error , "ERROR_SETTINGS_POST_API");
        return new NextResponse('Internal Error' , {status : 500})
    }

}