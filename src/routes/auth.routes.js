import { Router } from "express";

const router = Router();

//RUTAS DE LAS VISTAS

router.get("/", (req,res)=>{
    res.render("home");
});

router.get("/login", (req,res)=>{
    res.render("login");
});

router.get("/signup", (req,res)=>{
    res.render("registro");
});

router.get("/profile", (req,res)=>{
    console.log(req.session.user)
    res.render("perfil",{email:req.session.user.email});
});

export { router as viewsRouter};