const express = require("express");

const adminContoller = {
    getAdmins:(req,res)=>{
        res.json("All admins given")
    },

    getAdminById:(req, res)=>{
       res.json("Admin with id given")
    },

    addAdmin:(req,res)=>{
        res.json("Admin added succesfully")
    }

}


module.exports = adminContoller;