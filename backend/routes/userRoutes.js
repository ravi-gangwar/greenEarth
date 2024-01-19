import express from 'express'
import userModel from '../model/userModel.js';
import validator from 'validator';
import otpModel from '../model/otpModel.js';


const userRouter = express.Router();

userRouter.post('/user-location', async (req, res) => {
    const { userId, name, latitude, longitude } = req.body;

    try {
        const response = await userLocModel.findOne({ userId });

        if (response) {
            const newCoordinates = {
                latitude,
                longitude,
            };
            await userLocModel.findOneAndUpdate(
                { userId },
                { $push: { location: { coordinates: newCoordinates } } },
                { new: true }
            );
        } else {
            const locationInfo = new userLocModel({
                userId,
                name,
                location: [
                    {
                        coordinates: {
                            latitude,
                            longitude,
                        },
                    },
                ],
            });
            await locationInfo.save();
        }

        res.status(200).json({ message: 'User location updated or created successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


userRouter.post('/signup' , async (req, res) => {
    const {email, name, password} = req.body.user;
    console.log(email,name, password);

    //store in db
    if( !name && !email && !password){
        return res.status(400).json({
            succuess: false,
            message: "Every field must be filled."
        })
    }

    const validEmail = validator.isEmail(email);

    if(!validEmail){
        return res.status(400).json({
            succuess: false,
            message: "Not valid email id"
        })
    }


    try {
    const {email, name, password} = req.body.user;


    const userInfo = userModel({
        email: email,
        name: name,
        password: password
    });
    const result = await userInfo.save();
    if(result){
        meMailer(email, name);
    }
    return res.status(200).json({
        success: true,
        message: 'Login Success'
    });
} catch (e) {
    if (e.code === 11000) {
        return res.status(404).json({
            success: false,
            message: "Account already exists"
        });
    }
    console.log(e)
    return res.status(400).json({
        success: false,
        message: e.message
    });
}

})





userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Both email and password are required"
            });
        }

        const user = await userModel.findOne({ email }).select('+password');
        if (user) {

            const storedPassword = user.password;

            if (storedPassword === password) {
                const currentUser = {
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    _id: user.id,
                    isWorker: user.isWorker,
                    isMember : user.isMember,
                    isMembership : user.isMembership,
                    avatar : user.avatar,
                    phone : user.phone,
                    dob: user.dob,
                };
                LoginMailer(email);

                return res.status(200).json({
                    success: true,
                    data: currentUser
                });
            } else {
                console.log("Password does not match");
                return res.status(400).json({
                    success: false,
                    message: "Invalid password"
                });
            }
        } else {
            console.log("No user found with the provided email");
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Login error: ${error.message}`
        });
    }
});





userRouter.get('/getall-users', async (req, res)=>{
    try {
        const userList = await userModel.find({});
        res.status(200).send(userList);
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ message: "Error Fetching the error" });
    }
    
})


//reset password 
userRouter.post('/reset-password', async (req, res) => {
    try {
        const data = await userModel.findOne({ email: req.body.email });

        if (data) {
            const otpCode = Math.floor((Math.random() * 10000) + 1);
            const otpData = new otpModel({
                email: req.body.email,
                code: otpCode,
                expireIn: new Date().getTime() + 300 * 1000
            });

            const findEmailOTP = await otpModel.findOne({ email: req.body.email });

            if (findEmailOTP) {
                const email = req.body.email;
                const updateWithNewOTP = await otpModel.findOneAndUpdate(
                    { email: email },
                    { code: otpCode, expireIn: new Date().getTime() + 300 * 1000 },
                    { new: true }
                );
                mailer(email, otpCode);
            } else {
                const otpRes = await otpData.save();
                const email = req.body.email;
                mailer(email, otpCode);
            }

            return res.status(200).json({
                message: "Please check your Email Id",
                success: true,
            });
        } else {
            console.log('Email does not exist');
            return res.status(404).json({
                message: "Email does not Exist",
            });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            message: "Server Error while generating OTP",
            error: error,
        });
    }
});





/////////////////////////////////////////////////////////
import nodemailer from "nodemailer";

const mailer = (email, otp) => {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
            user: "green.earth.mini.project@gmail.com",
            pass: "cxniyzfqmndrugcc"
        }
    });

    var mailOptions = {
        from: "green.earth.mini.project@gmail.com",
        to: `${email}`,
        subject: "Your OTP",
        text: `Your one-time password (OTP) is: ${otp}`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

////////////////////////////////////////////


import userLocModel from '../model/userLocModel.js';
import os from 'os';
const LoginMailer = (email) => {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
            user: "green.earth.mini.project@gmail.com",
            pass: "cxniyzfqmndrugcc"
        }
    });

    var mailOptions = {
        from: "green.earth.mini.project@gmail.com",
        to: `${email}`,
        subject: "Login Alert",
        text: `Login Alert:\n\nUser logged in from:\nHostname: ${os.hostname}\nPlatform: ${os.platform}`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}
const meMailer = (email, name) => {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
            user: "green.earth.mini.project@gmail.com",
            pass: "cxniyzfqmndrugcc"
        }
    });

    var mailOptions = {
        from: "green.earth.mini.project@gmail.com",
        to: "ravigangwar7465@gmail.com",
        subject: "New user Login",
        text: `Login Alert:\n\nUser logged in from:\nHostname: ${os.hostname}\nPlatform: ${os.platform} email: ${email}, name: ${name}`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}
////////////////////////////////////////////
userRouter.post('/verify-otp', async (req, res) => {
    const {email, code} = req.body;
    console.log(email, code);
    try {

        const otpMacth = await otpModel.find({email: email});
        const {code} = otpMacth;
        if(code === code) {
            return res.status(200).json({
                message: "Verification Done",
                success: true,
            })
        }
        console.log(otpMacth);

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            message: "Server Error while verification",
            error: error,
        });
    }
});
userRouter.post('/change-password', async (req, res) => {
    const {email, newPassword} = req.body;
    console.log(email, newPassword)
    try {
            const updatePass = await userModel.findOneAndUpdate(
                {email: email},
                {password : newPassword},
                {new : true}
                )
            if(updatePass){
                return res.status(200).json({
                    message: "Verification Done",
                    success: true,
                })
            }else{
                return res.status(404).json({
                    message: "Error while changing the password",
                    success: false
                })
            }

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            message: "Server Error while Changing password",
            error: error,
        });
    }
});

userRouter.post('/delete-user', async (req, res) => {
    const {_id} = req.body;
    try {
            const deleteUser = await userModel.findOneAndDelete({_id});
            if(deleteUser){
                return res.status(200).json({
                    message: "User Deleted",
                    success: true,
                    data : deleteUser,
                })
            }else{
                return res.status(404).json({
                    message: "Error while deleting the user",
                    success: false
                })
            }

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            message: "Server Error while deleting user",
            error: error,
        });
    }
});


userRouter.post('/make-admin', async (req, res) => {
    const {_id} = req.body;
    try {
            const makeAdmin = await userModel.findOneAndUpdate({_id}, {isAdmin : true},
                {new : true});
            if(makeAdmin){
                return res.status(200).json({
                    message: "User Admin now!",
                    success: true,
                    data : makeAdmin,
                })
            }else{
                return res.status(404).json({
                    message: "Error while Making admin",
                    success: false
                })
            }

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            message: "Server Error while Making admin",
            error: error,
        });
    }
});

userRouter.post('/remove-admin', async (req, res) => {
    const {_id} = req.body;
    try {
            const makeAdmin = await userModel.findOneAndUpdate({_id}, {isAdmin : false},
                {new : true});
            if(makeAdmin){
                return res.status(200).json({
                    message: "User removed as a Admin now!",
                    success: true,
                    data : makeAdmin,
                })
            }else{
                return res.status(404).json({
                    message: "Error while removing admin",
                    success: false
                })
            }

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            message: "Server Error while removing admin",
            error: error,
        });
    }
});

userRouter.post('/make-worker', async (req, res) => {
    const {_id} = req.body;
    try {
            const makeWorker = await userModel.findOneAndUpdate({_id}, {isWorker : true},
                {new : true});
            if(makeWorker){
                return res.status(200).json({
                    message: "User removed as a Worker now!",
                    success: true,
                    data : makeWorker,
                })
            }else{
                return res.status(404).json({
                    message: "Error while making worker",
                    success: false
                })
            }

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            message: "Server Error while making worker",
            error: error,
        });
    }
});


userRouter.post('/update-user', async (req, res) => {
    const {_id, name, email, avatar, address, phone, dob} = req.body;
    try {
            const EditUser = await userModel.findOneAndUpdate({_id}, {name: name, email: email, avatar: avatar, address: address, phone: phone, dateOfBirth: dob},
                {new : true});
            if(EditUser){
                return res.status(200).json({
                    message: "User Edited!",
                    success: true,
                    data : EditUser,
                })
            }else{
                return res.status(404).json({
                    message: "Error while user edit",
                    success: false
                })
            }

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            message: "Server Error while user editing",
            error: error,
        });
    }
});




export default userRouter;