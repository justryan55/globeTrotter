import jwt from "jsonwebtoken";

export const checkToken = async (authHeader) => {
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const secretKey = process.env.SECRET_KEY;
    const decodedToken = jwt.verify(token, secretKey);

    if (decodedToken) {
      const userId = decodedToken.userId;
      const firstName = decodedToken.firstName;
      const lastName = decodedToken.lastName;
      const email = decodedToken.email;
      const countriesVisited = decodedToken.countries_visited;

      return {
        userId,
        firstName,
        lastName,
        email,
        countriesVisited,
      };
    } else {
      return {
        success: false,
        message: "Not authorised",
      };
    }
  }
};
