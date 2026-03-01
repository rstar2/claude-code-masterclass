export function getAuthErrorMessage(error: { code: string }): string {
  switch (error.code) {
    case "auth/invalid-credential":
      return "Invalid email or password";
    case "auth/email-already-in-use":
      return "Email already registered";
    case "auth/invalid-email":
      return "Invalid email address";
    case "auth/weak-password":
      return "Password is too weak";
    case "auth/network-request-failed":
      return "Network error. Check connection";
    case "auth/too-many-requests":
      return "Too many attempts. Try again later";
    case "auth/user-disabled":
      return "This account has been disabled";
    case "auth/user-not-found":
      return "Invalid email or password";
    case "auth/wrong-password":
      return "Invalid email or password";
    case "auth/missing-email":
      return "Please enter an email address";
    case "auth/missing-password":
      return "Please enter a password";
    default:
      return "An error occurred. Please try again.";
  }
}
