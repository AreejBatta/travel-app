import { handleSubmit } from "../client/scripts/FormHandler.js";
describe("is sub ok", ()=>{
    it ("submits?", ()=>{
        expect (handleSubmit).toBeDefined();
    })
})