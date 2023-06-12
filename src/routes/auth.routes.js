import { Router } from "express";

const router = Router();

//RUTAS DE LAS VISTAS

router.get("/", (req,res)=>{
    res.render("home");
});

app.get("/login",(req,res)=>{
    const {name} = req.query;
    console.log("sesion actual", req.session);
    req.session.user=name;
    res.send("sesion creada");
});

router.get("/signup", (req,res)=>{
    res.render("registro");
});

router.get("/profile", (req,res)=>{
    console.log(req.session.user)
    res.render("perfil",{email:req.session.user.email});
});

export { router as authRouter};