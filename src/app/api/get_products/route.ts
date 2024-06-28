import { connectToMongoDB } from "@/libs/MongoConnect";
import Product from "@/libs/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToMongoDB()
        const data = await Product.find()
        return NextResponse.json(data)
        // return NextResponse.json({msg:"list of products"})
    } catch (error) {
        return NextResponse.json({
            error,
            msg: 'Something went wrong'
        },
            { status: 400 }
        )
    }
}