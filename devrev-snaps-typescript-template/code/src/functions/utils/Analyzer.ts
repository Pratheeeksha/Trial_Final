import { string } from "yargs"
import {partAssigner,tagAssigner} from "./Assigner"







exports default analyzer(title:String, description:String, TicketData:String){
 

    //here the short context of ticket is taken.
     const context = api logic //mrudul 
    // function for part assignment -> search for service,code,product,capability,feature 
     
    const partID:String = await partAssigner(context,TicketData);

    const {tagType,reasoning} =await tagAssigner(title,description,TicketData);//this is for ticket classification to know what type of ticket is it

     //update the ticket with the new tags and part and with the reasoning for the type of ticket

     return{reasoning,tagType,context,partID};


     









}