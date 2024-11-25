

interface TicketData {
  title: string;
  body: string;
  tags: Array<{ id: string }>;
}

export async function fetchTicketData(devrevSDK: any, workID: string): Promise<{ ticketData: TicketData; tagID: string | undefined }> {
  try {
    const response = await devrevSDK.worksGet({ id: workID });

    const ticketData: TicketData = {
      title: response.work?.title ?? '',
      body: response.work?.body ?? '',
      tags: response.work?.tags ?? []
    };

    // Get the first tag ID if available
    const tagID = ticketData.tags[0]?.id;






    return { ticketData, tagID };
  } catch (error) {
    console.error('Error fetching ticket details:', error);
    throw error; // Rethrow error for handling in calling function
  }
}





































// exports default fetchTicketData(devrevSDK:any,workID:String){


// try{
//     const TicketData = await devrevSDK.work.get(TicketId);
// const title:string = TicketData.title;
// const description:string=TicketData.body;
// const tagID:string=TicketData.tags.tag.id; //check this once 




// return {TicketData,tagID};


// } catch (error) {
//     console.error('Error fetching ticket details:', error.message);
//     throw error; // Rethrow error for handling in calling function
// }








// }