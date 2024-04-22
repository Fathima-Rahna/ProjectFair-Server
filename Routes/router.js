const express = require('express')
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')

const router = new express.Router()



//register

router.post('/register',userController.register)

//login
router.post('/login',userController.login)

//addproject
router.post("/add-project",jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject)


//getallproject
router.get('/all-projects',jwtMiddleware,projectController.getAllProjects)


//getuserproject
router.get('/user-projects',jwtMiddleware,projectController.getUserProjects )

//gethomeproject

router.get('/home-projects',projectController.getHomeProjects)

//edit project
router.put('/edit-project/:pid',jwtMiddleware,multerConfig.single('projectImage'),projectController.editProject)


//remove

router.delete('/remove-project/:pid',jwtMiddleware,projectController.removeProject)


//edit user
router.put('/edit-user',jwtMiddleware,multerConfig.single("profileImage"),userController.editUser)
//export ruter
module.exports=router