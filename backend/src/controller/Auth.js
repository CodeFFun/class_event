import { client } from "../client.js";
class Auth{
    async login(req, res){
        const {email, password} = req.body;
        if(!email && !password){
            res.status(400).send({message: "Not enough credentials"})
        }
        try{
        const user = client.user.findUnique({
            where: {user_email : email}
        })
        if(!user){
            res.status(400).json({message: "No User found"})
        }
        res.status(200).json({message: "Login Sucessfull", user})
    }catch(e){
        console.log(e.message)
        res.send(400).send("Something went wrong")
    }
    }
}


export default Auth
