import { WorkType } from "@devrev/typescript-sdk/dist/auto-generated/public-devrev-sdk"

//code on how to update the already created ticket using devrevsdk 
updateTicket(devrevSDK:any,tagType:String[],context:String,partID:String,workID:String,WorkType:String, tagID:String){

const newTag={
    id:tagID,
    value:tagType
}


const updatedInfo={
id:workID,
type:WorkType,
applies_to_part:partID,
tags:  newTag                    // check how to show the tags
//how to show the reasoning 

}

const response = await devrevSDK.works.update(updatedInfo);

    //works.update
    return response;
    


    // maybe a function that will create the comment and put in discussion 
}