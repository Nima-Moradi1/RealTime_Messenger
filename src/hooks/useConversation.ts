import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
    const params = useParams()
    const conversationId = useMemo(()=> {
        if(!params?.conversationId) {
            return ''
        }
        return params.conversationId as string;

    },[params?.conversationId])
    
    //The !! turns the string into a boolean to use it as open or closed
    const isOpen = useMemo(() => !!conversationId , [conversationId])
    return useMemo(() => ({
        isOpen , 
        conversationId
    }),[isOpen,conversationId])
}

export default useConversation;