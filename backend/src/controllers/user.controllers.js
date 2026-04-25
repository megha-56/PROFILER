import User from "../models/user.models";

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

export const loginUser = async (req, res) => {
    try{
        const {username, password} = req.body;
        if(!username || !password){
            return res.status(400).json({message: "Username and password are required"});
        }

        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({message: "Invalid username or password"});
        }

        if(user.password !== password){
            return res.status(400).json({message: "Invalid username or password"});
        }

        res.status(200).json({message: "Login successful", user});
    }catch(error){
        console.error("Error logging in user:", error);
        res.status(500).json({message: "Server error"});
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