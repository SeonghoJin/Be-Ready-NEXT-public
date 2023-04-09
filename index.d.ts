import { User as customUser } from "@./common"



declare global {
    namespace Express {
        interface User extends customUser {
            _id: string
        }
    }
}