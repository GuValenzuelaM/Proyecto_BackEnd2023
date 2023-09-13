import chai from "chai";
import supertest from "supertest";
import {app} from "../src/app.js"
import { SessionsController } from "../src/controllers/sessions.controller.js"

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
        expect(response.status).to.equal(302);
    });


    it("el endpoint post api/sessions/login debe permitir loguear al usuario", async function () {
        const MockUser = {
            email: "maura@gmail.com",
            password: "coder"
        };
        const response = await requester.post("/api/sessions/login").send(MockUser);
        expect(response.status).to.equal(302);
    });
    
});
