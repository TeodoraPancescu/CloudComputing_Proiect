import { ObjectId } from "mongodb";
import { sendMethodNotAllowed, sendOk } from "@/utils/apiMethods";
import { getCollection } from "@/utils/functions";

const COLLECTION_NAME = 'records';
const id = data._id;

const getRecords = async () => {
    const collection = await getCollection(COLLECTION_NAME);
    return await collection.find({}).toArray();
}

const getRecord = async(id) => {
    const collection = await getCollection(COLLECTION_NAME);
    return await collection.findOne({_id:ObjectId.createFromHexString(id)});
}

const createRecord = async(data) => {
    const collection = await getCollection(COLLECTION_NAME);
    return await collection.insertOne(data);
}

const updateRecord = async(id, data) => {
    const collection = await getCollection(COLLECTION_NAME);
    return await collection.updateOne({_id: new ObjectId(id)},{ $set: data});
}

const deleteRecord = async (id) => {
	const collection = await getCollection(COLLECTION_NAME);
	return collection.deleteOne({_id: new ObjectId(id)});
}

export default async function handler(req, res) {
    const isAllowedMethod = req.method === "GET" || req.method === "POST" || req.method === "PUT" || req.method === "DELETE";

    if(!isAllowedMethod){
        return sendMethodNotAllowed(res,'Method Not Allowed');
    }

    if(req.method === 'GET' && req.query.id){
        const record = await getRecord(req.query.id);
        return sendOk(res, record);
    }

    if(req.method === 'GET'){
        const records = await getRecords();
        return sendOk(res, records);
    }

    if(req.method === 'POST'){
        const records = await createRecord(req.body);
        return sendOk(res, records);
    }

    if(req.method === 'PUT'){
        const records = await updateRecord(req.query.id, req.body);
        return sendOk(res, records);
    }

    if(req.method === 'DELETE') {
		const id = req.query.id;
		const result = await deleteRecord(id);
		return sendOk(res, result);
	}
 }