const projects = require("../Modal/projectModel");






//addproject
exports.addProject =async (req, res) => {
    console.log("Inside Add Project request");
    console.log(req.payload);
    console.log(req.body);
    console.log(req.file);
    const {title,language,overview,github,website}=req.body
    const userId =req.payload
    const projectImage = req.file.filename
    try{
       const existingProject = await projects.findOne({github})
       if(existingProject){
        res.status(406).json("project already available in our system,kindly upload another!!!")
       }else{
        const newproject = new projects({
            title,language,overview,github,website,projectImage,userId
        })
        await newproject.save()
        res.status(200).json(newproject)
       }
    }catch(err){
        res.status(401).json(err)
    }
    res.status(200).json("Request received"); // Change .JSON() to .json()
}


//get all projects
exports.getAllProjects = async (req,res)=>{
    const searchkey = req.query.search
    console.log(searchkey);
    const query = {
        language :{
            $regex: searchkey, $options: 'i'
        }
    }
    
   
    try{
           const allProjects = await projects.find(query)
           res.status(200).json(allProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

//get userprojects

exports.getUserProjects = async (req,res)=>{
    const userId = req.payload
   
    try{
           const userProjects = await projects.find({userId})
           res.status(200).json(userProjects)
    }catch(err){
        res.status(401).json(err)
    }
}


//get home projects


exports.getHomeProjects = async (req,res)=>{
   
    try{
           const homeProjects = await projects.find().limit(3)
           res.status(200).json(homeProjects)
    }catch(err){
        res.status(401).json(err)
    }
}


exports.editProject = async (req,res)=>{
    console.log("inside edit project");
    const {pid} = req.params
    const userId =req.payload
    const {title,language,overview,github,website,projectImage}=req.body
    const uploadImage = req.file?req.file.filename:projectImage
try{
    const updatedProject = await projects.findByIdAndUpdate({_id:pid},{
        title,language,overview,github,website,projectImage:uploadImage,userId
    },{new:true})
    await updatedProject.save()
    res.status(200).json(updatedProject)
}catch(err){
    res.status(401).json(err)
}


}