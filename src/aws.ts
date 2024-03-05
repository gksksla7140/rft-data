import AWS from "aws-sdk";
import { AWSRegions } from "./types/aws";
import { Vendor } from "./types/twitter";
import { marshall } from "@aws-sdk/util-dynamodb";

AWS.config.update({ region: AWSRegions.US_WEST_2 });

const dynamodb = new AWS.DynamoDB();

export const dynamodbCreateTable = async (
params: AWS.DynamoDB.CreateTableInput
) => {

    try {
        const result = await dynamodb.createTable(params).promise();
        console.log("Created table", result);
    }
    catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("DynamoDB createTable failed")
    }
}

export const dynamodbDescribeTable = async (tableName: string) => {
    try {
        const result = await dynamodb.describeTable({ TableName: tableName }).promise();
        console.log("Described table", result);
        return result;
    }
    catch (error) {
        if (error instanceof Error) {
            return error;
        }
        throw new Error("DynamoDB describeTable failed")
    }
}

export const dynamodbDeleteTable = async (tableName: string) => {
    try {
        const result = await dynamodb.deleteTable({ TableName: tableName }).promise();
        console.log("Deleted table", result);
        return result;
    }
    catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("DynamoDB deleteTable failed")
    }
}

export const dynamodbCreateRecord = async (tableName: string, vendor: Vendor) => {
    try {
        const result = await dynamodb.putItem({
            TableName: tableName,
            Item: marshall(vendor)
        }).promise();
        console.log("Created record", result);
        return result;
    }
    catch (error) {
        if (error instanceof Error) {
            return error;
        }
        throw new Error("DynamoDB putItem failed")
    }
}

export const dynamodbCreateRecords = async (tableName: string, vendors: Vendor[]) => {
    try {
        const result = await dynamodb.batchWriteItem({
            RequestItems: {
                [tableName]: vendors.map((vendor) => ({
                    PutRequest: {
                        Item: marshall(vendor)
                    }
                }))
            }
        }).promise();
        console.log("Created records", result);
        return result;
    }
    catch (error) {
        if (error instanceof Error) {
            return error;
        }
        throw new Error("DynamoDB batchWriteItem failed")
    }
}
