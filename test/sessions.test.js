import chai from "chai";
import supertest from "supertest";
import {app} from "../src/app.js"

const expect = chai.expect;
const requester = supertest(app)

describe("Test sessions", ()=>{
    
    it("El endpoint post /singup debe permitir crear un usuario", async function(){
        const MockUser = {
            first_name: "Mara",
            last_name: "Pavez",
            age:29,
            email: "mara@gmail.com",
            password: "prueba"
        }

        const result = await requester.post("/api/sessions/signup").send(MockUser)
        const {data} = result
        expect(data).to.be.equal(200)
        
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
});