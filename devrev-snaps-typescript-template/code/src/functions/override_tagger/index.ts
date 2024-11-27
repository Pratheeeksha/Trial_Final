import { client } from '@devrev/typescript-sdk';

interface EventContext {
    secrets: {
      service_account_token: string;
    };
  }
  
  
  interface ExecutionMetadata {
    devrev_endpoint: string;
  }
  
  interface WorkCreated {
    work: {
      id: string;
      type: string;
    };
  }
  
  interface Event {
    context: EventContext;
    execution_metadata: ExecutionMetadata;
    payload: {
      work_created: WorkCreated;
    };
  }
  

  export async function handleEvent(event: any): Promise<any> {
    try {
      const devrevPAT= event.context.secrets.service_account_token;
      const API_BASE= event.execution_metadata.devrev_endpoint;
  
      const devrevSDK = client.setupBeta({
        endpoint: API_BASE,
        token: devrevPAT,
      });
  
    const ticket_id = event.payload.source_id;
    console.log(ticket_id);
    const tag_id = event.input_data.global_values. tag_picker;
    const part_assigned_id = event.input_data.global_values.part_picker;
    
    console.log("done fetching the overrrided tag name and part id",part_assigned_id)
    
    console.log("fetched the tag and tag id:",tag_id);


    const updatedInfo = {
        id: ticket_id,
        type: "ticket",
        applies_to_part: part_assigned_id,
        tags:{"set":[{"id":tag_id}]}, // Tags should be an set
      
      };
       console.log(updatedInfo);

      const response = await devrevSDK.worksUpdate(updatedInfo as any );
      
      console.log("updated ticket :",response);
      console.log("part thingy",response.data.work.applies_to_part);
      console.log("tags thingy",response.data.work.tags);


      const bodyComment = "Hello, the ticket is manually overridden and tagged as required!";
       
  
      const commentBody = {
        object: ticket_id,
        type: "timeline_comment",
        body: bodyComment,
      };
      
      const comment = await devrevSDK.timelineEntriesCreate(commentBody as any);
     
      return comment;
    
    } catch (error) {
      console.error('Error handling DevRev event:', error);
      throw error;
    }
  }
  


export const run = async (events: any[]): Promise<void> => {
    try {
             
      console.info("events", JSON.stringify(events));
  
  
      for (let event of events) {
        await handleEvent(event);
        console.log("done execution and  commenting")
      }
    } catch (error) {
      console.error('Error processing events:', error);
      throw error;
    }
  };
  
  
  export default run;
  