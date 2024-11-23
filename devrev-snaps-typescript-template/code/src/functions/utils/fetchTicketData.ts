
exports default fetchTicketData(devrevSDK:any,workID:String){


try{
    const TicketData = await devrevSDK.work.get(TicketId);
const title:string = TicketData.title;
const description:string=TicketData.body;
const tagID:string=TicketData.tags.tag.id; //check this once 




return {TicketData,tagID};


} catch (error) {
    console.error('Error fetching ticket details:', error.message);
    throw error; // Rethrow error for handling in calling function
}








}