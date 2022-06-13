import { useContext } from "react"
import { InstanceContext } from "../context/InstanceContext";

function useSetUsersData(option) {
    const context = useContext(InstanceContext)

    function filter(event) {
        context.setModifyedUsersData(context.usersData.filter(user => {
            if (user[option].toLowerCase().includes(`${event.target.value}`)) {
                return user
            }
            }))
    }
    return filter
}

export {useSetUsersData}