//register

exports.register =(req,res)=>{
    console.log("Inside Register request")
    const{username,email,password}=req.body
    console.log(username,email,password);
    //check email is present
    //if email is present then existing user
    //
    res.status(200).json("Request Recieved!!!")
}