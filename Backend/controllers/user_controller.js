import createUserService from "../services/user_services.js";

async function createUser(request, response) {
    try {
        // Call the createUserService function from the service and pass the request and response objects
        const result = await createUserService(request, response);

        // If the createUserService function returns a result, send a success response
        return result;
    } catch (error) {
        console.error("Error in createUserController:", error);
        response.status(500).json({ message: "Internal server error" });
    }
}

export default createUser;


