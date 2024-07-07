import { roles } from "../../middleware/auth.js";

export const endpoints = {

    create: [roles.Admin],
    delete: [roles.User],
 
    get: [roles.User],
    update: [roles.User]
}