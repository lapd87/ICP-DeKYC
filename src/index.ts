import {
    $update,
    StableBTreeMap,
    Result,
} from "azle";
import {Organization, Customer, VerifiedDocRecord, KYCRecord} from "./types"
import {v4 as uuidv4} from "uuid";


// Define storage for all KYC records
const KYCRecordsStorage = new StableBTreeMap<string, KYCRecord>(0, 44, 1024);


// Function to create a new KYC record
$update;

export function createOrganization(
    name: string,
): Result<KYCRecord, string> {
    if (!name) {
        return Result.Err("Name is required.");
    }

    const organizationUUID = uuidv4();
    const newOrganization: Organization = {
        uuid: organizationUUID,
        name,
    };

    const newCustomer: Customer = {
        uuid: uuidv4(),
        name: "name",
    };

    const verifiedRecord: VerifiedDocRecord = {
        documentId: uuidv4(),
        owner: newCustomer,
        verifiedBy: [newOrganization],
    };

    const newKYCRecord: KYCRecord = {
        customerId: newCustomer.uuid,
        owner: newCustomer,
        documents: new Map().set(verifiedRecord.documentId, verifiedRecord),
    };

    KYCRecordsStorage.insert(newCustomer.uuid, newKYCRecord);
    return Result.Ok(newKYCRecord);
}

// A workaround to make the uuid package work with Azle
globalThis.crypto = {
    // @ts-ignore
    getRandomValues: () => {
        const array = new Uint8Array(32);

        for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 256);
        }

        return array;
    },
};