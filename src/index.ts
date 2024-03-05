import {
  dynamodbCreateRecord,
  dynamodbCreateTable,
  dynamodbDeleteTable,
  dynamodbDescribeTable,
} from "./aws";
import vendors from "./data/vendors";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const init = async () => {
  const vendorTableName = "Vendors";
  const vendorTable = await dynamodbDescribeTable(vendorTableName);

  if (!(vendorTable instanceof Error)) {
    console.log("Vendors table does exist, deleting...");
    await dynamodbDeleteTable(vendorTableName);
    await delay(6000);
  }

  const vendorsTableParams: AWS.DynamoDB.CreateTableInput = {
    TableName: "Vendors",
    KeySchema: [{ AttributeName: "twitterId", KeyType: "HASH" }],
    AttributeDefinitions: [{ AttributeName: "twitterId", AttributeType: "S" }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  };

  await dynamodbCreateTable(vendorsTableParams);
  await delay(6000);

  for (const vendor of vendors) {
    const res = await dynamodbCreateRecord(vendorTableName, vendor);
    if (res instanceof Error) {
        console.log("Error creating record", vendor, res);
        }
  }

};

init();
