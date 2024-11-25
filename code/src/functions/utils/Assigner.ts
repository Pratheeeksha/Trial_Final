

// Function to extract part_id
function extractPartId(jsonResponse: any): string | null {
    // Check if results exist and is an array
    if (jsonResponse.results && Array.isArray(jsonResponse.results) && jsonResponse.results.length > 0) {
        const part = jsonResponse.results[0].part; // Access the first result's part
        if (part && part.id) {
            return part.id; // Return the part ID
        }
    }
    return null; // Return null if not found
}

// Define the partAssigner function
export async function partAssigner(
    context: string, 
    TicketData: string, 
    devrevSDK: any
): Promise<string | null> {
    // Define the search payload
    const searchPayload = {
        namespace: "part",
        query: context,
        limit: 1,
        semantic_weight: 1.0
    };

    try {
        // Make the search request using the devrevSDK
        const response = await devrevSDK.searchHybrid(searchPayload);

        // Extract the part ID from the response
        const partId = extractPartId(response);

        console.log('Extracted Part ID:', partId);

        // Return the extracted part ID
        return partId;
    } catch (error) {
        console.error('Error in partAssigner:', error);
        return null; // Return null in case of an error
    }
}













































// // here we will be writing the search.hybrid api code for part 
// //IT SHOURLD RETURN THE SELECTED PART ID 
// import { client } from '@devrev/typescript-sdk';

// // Function to extract part_id
// function extractPartId(jsonResponse: any): string | null {
//     // Check if results exist and is an array
//     if (jsonResponse.results && Array.isArray(jsonResponse.results) && jsonResponse.results.length > 0) {
//         const part = jsonResponse.results[0].part; // Access the first result's part
//         if (part && part.id) {
//             return part.id; // Return the part ID
//         }
//     }
//     return null; // Return null if not found
// }


// exports async partAssigner(context:String,TicketData:String,devrevSDK:any){
//     //now write the connection the search.hybrid 
//   const  search_payload = {
//         "namespace": "part",
//         "query": context,
//         "limit": 1,  
//         "semantic_weight": 1.0 
//     }
    
//     const response = await devrevSDK.searchHybrid(search_payload); // CHECK THIS 


//     const partId = extractPartId(response); //check if only id is enough or other also reuired?
//     console.log('Extracted Part ID:', partId);
    

//     return partID;
// }