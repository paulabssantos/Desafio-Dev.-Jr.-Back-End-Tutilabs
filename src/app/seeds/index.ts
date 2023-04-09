import { CreateRisk } from "./CreateRisk";
import { CreateRoles } from "./CreateRoles";
import { CreateStatus } from "./CreateStatus";
import { CreateUsers } from "./CreateUsers";

export async function populateDatabase() {
    await CreateStatus()
    await CreateRoles()
    await CreateRisk()
    await CreateUsers()

}

populateDatabase()
