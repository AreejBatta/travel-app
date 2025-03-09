import { updateImgUI } from "../client/scripts/updateImgUI.js";
describe("is there a response", ()=>{
    it ("returns data", ()=>{
        expect (updateImgUI).toBeDefined();
    })
})