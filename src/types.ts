import {
    Record,
    Vec,
} from "azle";

// Define a type for an organization
export type Organization = Record<{
    uuid: string;
    name: string;
}>;

// Define a type for customer
export type Customer = Record<{
    uuid: string;
    name: string;
}>;

// Define a type for a verified document record
export type VerifiedDocRecord = Record<{
    documentId: string;
    owner: Customer;
    verifiedBy: Vec<Organization>;
}>;

// Define a type for a complete KYC record
export type KYCRecord = Record<{
    customerId: string;
    owner: Customer;
    documents: Map<string, VerifiedDocRecord>;
}>;