import User from "../models/user.models.js";

export const registerUser = async (req, res) => {
    try{
        const {name, username, email, phoneNo, password} = req.body;
        if(!name || !username || !email || !phoneNo || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        //Check if user already exists
        const existingUser = await User.findOne({$or: [{email}, {username}, {phoneNo}]});
        if(existingUser){
            return res.status(400).json({message: "User with this email, username or phone number already exists"});
        }

        const newUser = new User({
            name,
            username,
            email,
            phoneNo,
            password
        });
        
        await newUser.save();
        res.status(201).json({message: "User registered successfully", user: newUser});
    }catch(error){
        console.error("Error registering user:", error);
        res.status(500).json({message: "Server error"});
    }
}

export const loginUser = async (req, res) => { //req=data coming, res=what we send back
    try{
        //extract username and password from request body
        const {username, password} = req.body; 

        // write conditions  

        //required fields
        if(!username || !password){ //if not username or password
            return res.status(400).json({message: "Username and password are required"}); //send status ans json message in response //res.status().json()
        }
        
        //Invalid username and Password
        const user = await User.findOne({username}); //matches the username with the saved usernames,save the result in user variable
        //username
        if(!user){//if no user found
            return res.status(400).json({message: "Invalid username or password"}); //return res.status.json
        }
        //Password
        if(user.password !== password){//compare the passwords
            return res.status(400).json({message: "Invalid username or password"}); //return res.status.json
        }

        res.status(200).json({message: "Login successful", user});//if everything is fine, res.status.json with messsage and user data 
    }catch(error){//if something crashes
        console.error("Error logging in user:", error);//log error 500
        res.status(500).json({message: "Server error"});//res.status.json({})
    }}

export const getUserProfile = async (req, res) => {
        try{
            const {username} = req.body;
            const user = await User.findOne({
                username
            });
            if(!user){
                return res.status(404).json({message: "User not found"});
            }
            res.status(200).json({user});
        }
        catch(error){
            console.error("Error fetching user profile:", error);
            res.status(500).json({message: "Server error"});
        }
    }


export const editProfile=async (req,res)=>{
    try{
       const {name,username,email,password, phoneNo,pfp, gender, dob,bio, skills}= req.body;
       if(!username||!password){
          return res.status(400).json({message: "Username and password are required"});
       }
       const user = await User.findOne({username}); //matches the username with the saved usernames,save the result in user variable
        //username
        if(!user){//if no user found
            return res.status(400).json({message: "Invalid username or password"}); //return res.status.json
        }
        if (username) user.username=username;
        if (name) user.name=name;
        if (email) user.email=email;
        if (phoneNo) user.phoneNo=phoneNo;
        if (pfp) user.pfp=pfp;
        if (gender) user.gender=gender;
        if (dob) user.dob=dob;
        if (bio) user.bio=bio;
        if (skills) user.skills=skills;
        return res.status(200).json({message:"Profile updated successfully",user});
    }
}