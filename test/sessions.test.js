import chai from "chai";
import supertest from "supertest";
import {app} from "../src/app.js"

const expect = chai.expect;
const requester = supertest(app)

describe("Test sessions", ()=>{
    
    before(async function () {
        this.timeout(10000);
        const MockUser = {
            first_name: "Maura",
            last_name: "Paz",
            age: 39,
            email: "maura@gmail.com",
            password: "coder"
        };
        const response = await requester.post("/api/sessions/signup").send(MockUser);
    });

    it("El endpoint post /signup debe permitir crear un usuario", async function () {
        const MockUser = {
            first_name: "Marco",
            last_name: "Pavón",
            age: 28,
            email: "marco@gmail.com",
            password: "coder"
        };
        const response = await requester.post("/api/sessions/signup").send(MockUser);
        //expect(response.status).to.equal(200);
        expect(response.text).to.be.equal("Usuario registrado correctamente");
    });


    it("el endpoint post api/sessions/login debe permitir loguear al usuario", async function () {
        const MockUser = {
            email: "maura@gmail.com",
            password: "coder"
        };
        const response = await requester.post("/api/sessions/login").send(MockUser);
        expect(response.text).to.be.equal("login exitoso");
    });
    
});

/*
it("El endpoint post /signup debe permitir crear un usuario", async function(){
        const MockUser = {
            first_name: "Maura",
            last_name: "Paz",
            age:39,
            email: "maura@gmail.com",
            password: "coder"
        }
        const response = await requester.post("/api/sessions/signup").send(MockUser);
        expect(response.text).to.be.equal("Usuario registrado correctamente");
        //expect(response.statusCode).to.be.equal(200);
    });
    
    it("el endpoint post api/sessions/login debe permitir loguear al usuario", async function () {
        const MockUser = {
            first_name: "Maura",
            last_name: "Paz",
            age:39,
            email: "maura@gmail.com",
            password: "coder"
        }
        const response = await requester.post("/api/sessions/login").send({email:MockUser.email, password:MockUser.password});
        expect(response.text).to.be.equal("login exitoso");
        //expect(response.statusCode).to.be.equal(200);
        
        const deleteMockUser = (await requester.delete("/api/users/delete-user"))
        const deleted = deleteMockUser
    });


    it("Endpoint /login (post) debe dar acceso a usuario", async function(){
        const MockUser = {
            first_name: "Mara",
            last_name: "Pavez",
            age:29,
            email: "mara@gmail.com",
            password: "prueba"
        }

        const registrationResult = await requester.post("/api/sessions/signup").send(MockUser);
            if (registrationResult.text === "Created. Redirecting to /profile") {
                const loginResult = await requester.post("/api/sessions/login").send({email: MockUser.email, password: MockUser.password});
                
                if (loginResult.text === "Found. Redirecting to /profile") {
                    const deleteMock = await requester.delete("/api/users/delete-user");
                    const deleted = deleteMock;
                } else {
                    expect.fail("Inicio de sesión fallido");
                }
            } else {
                expect.fail("Registro de usuario fallido");
            }
        });
*/