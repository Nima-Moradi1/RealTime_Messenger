import { withAuth } from "next-auth/middleware";


//This withAuth function automatically sends the un-authenticated users to '/'
export default withAuth({
    pages : {
        signIn : '/'
    }
})

export const config = {
    matcher : [
        "/users/:path*"
    ]
}