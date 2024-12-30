import {client} from "../client.js"
class User{
    async getUserByRole(req, res){
        const {role} = req.body.role;
        if(!role){
            res.status(400).json({message: "Role field is empty"})
        }
        try{
            const user = await client.user.findMany({
                where: {Role: role}
            })
            res.status(200).json({message: "User found", user})
        }catch(e){
            console.log(e.message)
            res.status(400).json({message: "Something went wrong"})
        }
    }

    async getUserById(req, res){
        const {id} = req.params.id; 
        if(!id){
            res.status(400).json({message: "Information missing!!"})
        }
        try{
            const user = await client.user.findUnique({
                where: {user_id: id}
            })
            res.status(200).json({message: "User found", user})
        }catch(e){
            console.log(e.message)
            res.status(400).json({message: "Something went wrong"})
        }
    }

    async createUser(req, res){         
        const {name, email, password} = req.body;
        try{
        if(name && email && password){
            await client.user.create(req.body)
            res.status(201).json({message:"User created"})
        } else{
            res.status(400).json({message: "Please enter all credentials"})
        }
        }catch(e){
            console.log(e.message)
            res.status(400).json({message: "Something went wrong"})
        }
    }
    
    async updateUser(req, res){
        const {id} = req.params.id; 
        if(!id){
            res.status(400).json({message: "Information missing!!"})
        }
        try{
            const user = await client.user.update({
                where: {id: req.id},
                data: req.body
            })
            res.status(201).json({message: "User updated", user})
        }catch(e){
            console.log(e.message)
            res.status(400).json({mesage: "Cannot update user"})
        }
    }

    async deleteUser(req, res){
        const {id} = req.params.id; 
        if(!id){
            res.status(400).json({message: "Information missing!!"})
        }
        try{
            const user = await client.user.delete({
                where: {id: id}
            })
            res.status(200).json({message: "User deleted", user})
        }catch(e){
            console.log("User deleted")
            res.status(400).json({message: "Cannot delete user"})
        }
    }
}


export default User;
