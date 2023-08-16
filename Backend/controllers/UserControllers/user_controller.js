import {
  createUserService,
  signInUserService,
  passwordResetOTPService,
  updateUserPasswordService,
  updateUserProfileService,
  updateUserSearchedBooleanService,
} from "../../services/UserServices/user_services.js";

export async function createUserController(request, response) {
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

export async function signInUserController(request, response) {
  try {
    // Call the signInUserService function from the service and pass the request and response objects
    const result = await signInUserService(request, response);

    // If the signInUserService function returns a result, send a success response
    return result;
  } catch (error) {
    console.error("Error in signUserController:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
}

export async function passwordResetOTPController(request, response) {
  try {
    // Call the passwordResetOTPService function from the service and pass the request and response objects
    const result = await passwordResetOTPService(request, response);
    // If the passwordResetOTPService function returns a result, send a success response
    return result;
  } catch (error) {
    console.error("Error in passwordResetOTPService:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
}


export async function updatePasswordController(request, response) {
  try {
    // Call the updateUserPasswordService function from the service and pass the request and response objects
    const result = await updateUserPasswordService(request, response);
    // If the updateUserPasswordService function returns a result, send a success response
    return result;
  } catch (error) {
    console.error("Error in passwordResetService:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
}

export async function updateUserProfileController(request, response) {
  try {
    // Call the updateUserProfileService function from the service and pass the request and response objects
    const result = await updateUserProfileService(request, response);
     // If the updateUserProfileService function returns a result, send a success response
    return result;
  } catch (error) {
    console.error("Error in passwordResetService:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
}

export async function updateUserSearchedBooleanController(request, response) {
  try {
     // Call the updateUserSearchedBooleanService function from the service and pass the request and response objects
    const result = await updateUserSearchedBooleanService(request, response);
     // If the updateUserSearchedBooleanService function returns a result, send a success response
    return result;
  } catch (error) {
    console.error("Error in updateUserSearchedBooleanService:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
}

export default {
  createUserController,
  signInUserController,
  passwordResetOTPController,
  updatePasswordController,
  updateUserProfileController,
  updateUserSearchedBooleanController,
};
