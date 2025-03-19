//Creating a global state for all the active users 
import {create} from 'zustand'

interface ActiveListProps {
    members : string[] ,
    add : (id:string) => void ,
    remove : (id:string) => void ,
    set : (ids:string[]) => void 
}

//Do not make the mistake of passing the interface props as a React.FC components, pass it as props to the zustand create method

const useActiveList = create<ActiveListProps>((set)=> ({
    members : [] ,
    add : (id) => set((state)=> ({members : [...state.members , id]})) ,
    remove : (id) => set((state)=> ({members : state.members.filter((memberId:string)=> id !== memberId)})) ,
    set : (ids) => set({members : ids})
}))

export default useActiveList ;