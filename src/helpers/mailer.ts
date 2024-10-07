import nodemailer from "nodemailer";
import User from "@/models/userModels";
import bcryptjs from 'bcryptjs'

export  const sendEmail = async({mail,emailType,userid} : any) =>{
    try {
        const hashedToken = await bcryptjs.hash(userid.toString,10)

       if(emailType ==="verify"){
        await User.findByIdAndUpdate(userid,{verifyedToekn:hashedToken,verifyTokenExpiry:Date.now() + 3600000})

       }else if(emailType ==="RESET"){
        await User.findByIdAndUpdate(userid,{forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now() + 3600000})
        
       }
       var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "7ba578dd61fe6b",
          pass: "********7ed5"
        }
      });
      
      const mailOptions ={
        from :"murariyf@gmail.com",
        to:"email",
        subject: emailType === "VERIFY" ? "Verify email":"reset your password",
        html:`<p> click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email":"reset your password" } or  copy and paste the link below in your browser . <br> ${process.env.domain}/verifyemail?token =${hashedToken}</p>`
      }
      const mailresponse = await transport.sendMail(mailOptions)  ;
      return mailresponse




    } catch (error:any) {
        throw new Error(error.message)
        
    }
}