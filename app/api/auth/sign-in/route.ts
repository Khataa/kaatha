const users = [
    {
        "name" : "siddarth", 
        "age" : 21
    },
    {
        "name" : "mohan", 
        "age" : 22
    },
]


export async function GET(req: Request) {
    // console.log("Received GET request");
    // // return new Response(null, { status: 200 });
    // return new Response(JSON.stringify({ success: true }), { status: 200 });
    return Response.json(users, { status: 200 });  }