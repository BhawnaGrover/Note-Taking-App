import axios from 'axios';
export default function auth(){
    const http = axios.create({
        baseURL:"https://note-taking-backend-server.vercel.app/api",
        headers:{
            "Content-type" : "application/json"
        }
    });
    return {
        http
    }
}