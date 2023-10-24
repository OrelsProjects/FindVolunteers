import { NextApiRequest } from "next"

export async function decodeRequestBody<T>(req: NextApiRequest): Promise<T> {
    const decoder = new TextDecoder();
    const chunk = await req.body.getReader().read();
    if (chunk.done) {
        throw new Error("Request body is empty");
    }

    const decodedChunk = decoder.decode(chunk.value, { stream: true });
    const decodedObject = JSON.parse(decodedChunk) as T;
    return decodedObject;
}
