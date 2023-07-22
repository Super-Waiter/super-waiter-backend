import firebaseAdmin from "../firebase";

export const checkFirebaseId = async (authorization: string) => {
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return false;
  }

  const token = authorization.split("Bearer ")[1];

  try {
    // Verify Firebase ID token
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    return false;
  }
};
