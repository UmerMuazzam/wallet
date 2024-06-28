import { connectToMongoDB } from "@/libs/MongoConnect";
import Product from "@/libs/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request:NextRequest,URLparams:any) {
    try {
        const body = await request.json();
        const id = URLparams.params.id;
        const {name,category,price}= body


        await connectToMongoDB()
        const data = await Product.findByIdAndUpdate(id, {name,category,price})
        return NextResponse.json({message:'Updated successfully',data})
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