import axios, { Axios } from "axios";
import { bodyParts, Exercise, rapidApiKey } from "../constants";

const baseUrl = 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back?limit=10&offset=0' 

const apiCall = async(URL,params)=>{
   try {
        const options ={
            method:'GET',
            URL,
            params,
            Headers:{
                'x-rapidapi-host':' exercisedb.p.rapidapi.com' ,
                'x-rapidapi-key': rapidApiKey,
            }

        };
        const response = await axios.request(options);
        return response.data;
    }catch(err){
        console.log('error:',err.message);
    }
}
export const fetchExercisesByBodypart=async(Exercise)=>{
    let data=await apiCall(baseUrl+`/exercises/bodyPart/${Exercise}`);
    return data;
}