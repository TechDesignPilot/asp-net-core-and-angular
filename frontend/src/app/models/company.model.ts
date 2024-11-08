import { Address } from "./address.model";
import { Contact } from "./contact.model";

export interface Company {
    id: number;
    name: string;
    address: Address;
    contacts: Contact[];
}