import jwt from "jsonwebtoken";

export const generateToken = (userId: number) => {
  return jwt.sign(
    { userId },                // payload
    process.env.JWT_SECRET!,   // secret key
    { expiresIn: "1d" }        // hết hạn sau 1 ngày
  );
};

export const generateTokenVerify = (userId: number) => {
  return jwt.sign(
    { userId },                // payload
    process.env.JWT_SECRET!,   // secret key
    { expiresIn: "15m" }        // hết hạn sau 1 ngày
  );
};
export const generateRandomNumber = (length: number): string => {
    const characters = "0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};
