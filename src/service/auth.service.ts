import md5 from "md5"
import { User } from '@models';
import { generateRandomNumber, generateToken, generateTokenVerify } from '@helper/generate';
import { NotFoundError, UnauthorizedError, sendMail, } from '@helper';
import "dotenv/config";
import jwt, { JwtPayload } from 'jsonwebtoken';

class AuthService {
  static async login(email: string, password: string) {

    const user = await User.findOne({
      where: {
        email,
        status: 'active'
      },
      raw: true
    });

    if (!user) {
      throw new NotFoundError('Người dùng không tồn tại');
    }

    const isMatch = md5(password) === user.password;
    if (!isMatch) {
      throw new UnauthorizedError('Mật khẩu không chính xác');
    }

    const tokenUser = generateToken(user["id"]);
    return { tokenUser, user };
  }


  static async forgotPassword(email: string) {
    const user = await User.findOne(
      {
        where: {
          email,
          status: "active"
        },
        attributes: { exclude: ["password"] }
      });

    if (!user)
      throw new NotFoundError('Người dùng không tồn tại');


    const otpCode = generateRandomNumber(6);
    const otpExpires = new Date(Date.now() + 3 * 60 * 1000);

    user["otpCode"] = otpCode;
    user["otpExpires"] = otpExpires;
    user.save();

    sendMail(
      email,
      'Xác nhận tài khoản',
      `<h2>Xác nhận tài khoản của bạn</h2><p>Mã xác thực tài khoản của bạn là ${otpCode} sẽ có hiệu lực trong vòng 3 phút.</p>`,
    );

    return { message: ' Gửi mã otp thành công', email };
  }

  static async resetPassword(email: string, otpCode: string, newPassword: string) {

    const user = await User.findOne({
      where:
      {
        email,
        status: "active"
      }
    });
    if (!user) {
      throw new NotFoundError('Người dùng không tồn tại');
    }

    if (!user.otpExpires) {
      throw new Error('Không có thời gian hết hạn OTP');
    }

    if (otpCode !== user.otpCode) {
      throw new Error('mã OTP không hợp lệ! ');
    }

    // So sánh thời gian hiện tại với otpExpires
    if (Date.now() > user.otpExpires.getTime()) {
      throw new Error('OTP đã hết hạn');
    }

    user["password"] = md5(newPassword);
    await user.save();

    await user.update({ otpCode: null, otpExpires: null });

    return { message: 'Đổi mật khẩu thành công' };
  }


  static async changePassword(userId: number, oldPassword: string, newPassword: string, confirmPassword: string) {
    const user = await User.findOne({
      where: {
        id: userId,
        status: "active"
      }
    });
    if (!user) {
      throw new NotFoundError('Người dùng không tồn tại');
    }

    if (newPassword !== confirmPassword) {
      throw new UnauthorizedError('Xác nhận mật khẩu không chính xác');
    }

    const isMatch = md5(oldPassword) === user.password;
    if (!isMatch) {
      throw new UnauthorizedError('Mật khẩu cũ không chính xác');
    }
    user.password = md5(newPassword);

    await user.save();

    return { message: 'Đổi mật khẩu thành công' };
  }


  static async sendVerify(email: string) {
    // Tìm user
    const user = await User.findOne({ where: { email } });
    if (!user) throw new NotFoundError("Người dùng không tồn tại");

    // Tạo token verify (hết hạn 15 phút)
    const token = generateTokenVerify(user.id);

    // Link verify
    const verificationLink = `http://localhost:3000/auth/verify?token=${token}`;

    // Nội dung email
    const subject = "Xác nhận tài khoản";
    const html = `
    <h2>Xác nhận tài khoản của bạn</h2>
    <p>Nhấn vào liên kết bên dưới để xác thực email:</p>
    <a href="${verificationLink}">Xác nhận email</a>
    <p>Liên kết này sẽ hết hạn sau 15 phút.</p>
  `;

    // Gửi email
    sendMail(email, subject, html);

    return { message: "Email xác thực đã được gửi", email };
  }
  static async verify(tokenQuery: string) {
    if (!tokenQuery) throw new NotFoundError("Yêu cầu gửi token Query");

    try {
      // Giải mã token
      const decoded = jwt.verify(tokenQuery.trim(), process.env.JWT_SECRET!) as JwtPayload;

      // Kiểm tra userId
      if (!decoded || typeof decoded === "string" || !decoded.userId) {
        throw new NotFoundError("Token không chứa thông tin người dùng");
      }

      // Update trạng thái xác minh
      await User.update({ isVerified: true }, { where: { id: decoded.userId } });

      return { message: "Xác thực tài khoản thành công" };
    } catch (err) {
      throw new NotFoundError("Token không hợp lệ hoặc đã hết hạn");
    }
  }


}

export default AuthService;