import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function GET(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const parts = pathname.split("/api/images/")[1]?.split("/") || [];

    if (parts.length < 2) {
        return NextResponse.json({ error: "Email and filename are required" }, { status: 400 });
    }

    const email = parts[0];
    const filename = parts.slice(1).join("/"); // Handle filenames with slashes
    console.log("Email:", email);
    console.log("Filename:", filename);

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: `${email}/${filename}`,
    };

    try {
        const command = new GetObjectCommand(params);
        const { Body, ContentType } = await s3.send(command);

        if (!Body) {
            return NextResponse.json({ error: "Image not found" }, { status: 404 });
        }

        const stream = Body as ReadableStream;
        return new Response(stream, {
            headers: {
                "Content-Type": ContentType || "image/jpeg", // Fallback to JPEG if ContentType is missing
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });

    } catch (error) {
        console.error("Error fetching image from S3:", error);
        return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
    }
}
