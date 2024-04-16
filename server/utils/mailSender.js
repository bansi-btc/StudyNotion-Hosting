const nodemailer=require('nodemailer'); 

const mailSender = async(email, title, body )=>{
    try{
        const transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            } 
        })

        let info = await transporter.sendMail({
            from:'hg343860@gmail.com',
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        })

        // console.log(info);

        return info;
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports=mailSender;