export function rolView(rol) {
    switch (rol) {
        case "events":
            navigateTo("/dashboard/events")
            break;
        default:
            break;
    }
    
}