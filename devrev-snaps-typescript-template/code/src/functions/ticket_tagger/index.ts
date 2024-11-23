import { client, publicSDK } from "@devrev/typescript-sdk";
import {analyzer} from "../utils/Analyzer";
import {updateTicket} from "../utils/updateTicket";

import {fetchTicketData} from "../utils/fetchTicketData"


async function handleDevRevEvent(event: any) {
    // Extracting necessary credentials and configurations from the event context
    const devrevPAT = event.context.secrets.service_account_token;
    const API_BASE = event.execution_metadata.devrev_endpoint;
  
    // Setting up the DevRev SDK client
    const devrevSDK = client.setup({
      endpoint: API_BASE,
      token: devrevPAT,
    });
  
    // Extracting relevant information of the work from the event payload
    const workCreated = event.payload.work_created.work;
    const workID= event.payload.work_created.work.id;
    const workType=event.payload.work_created.work.type;
     
   //function to fetch the data
    const {TicketData,tagID}=await fetchTicketData(devrevSDK,workID);


    //function for analysis of title and description . send the event as parameter -> check wt to return 
    const {reasoning,tagType,context,partID}= await analyzer(TicketData);


   const {response}=await updateTicket(devrevSDK,tagType,context,partID,workID,workType,tagID) ;
    console.log(response);
   
   

    // optional -> maybe to put comment that ticket it tagged and is specifies what exactly is the ticket about in the internal discussion






    let bodyComment = "Hello , the ticket is updated !!! Reason why the ticket is tagged"+reasoning;
     




const body = {
      object: workCreated.id,
      type: "timeline_comment",
      body: bodyComment,
    };
    const comment = await devrevSDK.timelineEntriesCreate(body as any);
  
    // Returning the response from the DevRev SDK
    return comment;




  }
  




//main function to write the logic 
export const run = async (events: any[]) => {
    /*
    Put your code here to handle the event.
    */
    for (let event of events) {
      await handleEvent(event);
    }
  };
  