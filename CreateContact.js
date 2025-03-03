// Address Book Contact Class
class Contact {
    constructor(firstName, lastName, address, city, state, zip, phone, email) {
        if (!this.validateName(firstName)) throw new Error("Invalid First Name: Must start with a capital letter and be at least 3 characters long.");
        if (!this.validateName(lastName)) throw new Error("Invalid Last Name: Must start with a capital letter and be at least 3 characters long.");
        if (!this.validateAddress(address)) throw new Error("Invalid Address: Must be at least 4 characters long.");
        if (!this.validateAddress(city)) throw new Error("Invalid City: Must be at least 4 characters long.");
        if (!this.validateState(state)) throw new Error("Invalid State: Must be at least 4 characters long and contain only letters.");
        if (!this.validateZip(zip)) throw new Error("Invalid Zip Code: Must be a 5 or 6 digit number.");
        if (!this.validatePhone(phone)) throw new Error("Invalid Phone Number: Must be a 10-digit number.");
        if (!this.validateEmail(email)) throw new Error("Invalid Email Format.");
        
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phone = phone;
        this.email = email;
    }

    validateName(name) {
        return /^[A-Z][a-zA-Z]{2,}$/.test(name);
    }

    validateAddress(value) {
        return /^[A-Za-z0-9 ]{4,}$/.test(value);
    }

    validateState(state) {
        return /^[A-Za-z]{4,}$/.test(state);
    }

    validateZip(zip) {
        return /^\d{5,6}$/.test(zip);
    }

    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    validatePhone(phone) {
        return /^\d{10}$/.test(phone);
    }
}

// Address Book Class
class AddressBook {
    constructor() {
        this.contacts = [];
    }

    addContact(contact) {
        if (this.contacts.some(c => c.email === contact.email)) {
            throw new Error("Contact with this email already exists.");
        }
        this.contacts.push(contact);
    }

    removeContact(email) {
        this.contacts = this.contacts.filter(contact => contact.email !== email);
    }

    findContactByEmail(email) {
        return this.contacts.find(contact => contact.email === email);
    }

    findContactByName(name) {
        return this.contacts.find(contact => contact.firstName.toLowerCase() === name.toLowerCase() || contact.lastName.toLowerCase() === name.toLowerCase());
    }

    deleteContactByName(name) {
        const contactIndex = this.contacts.findIndex(contact => contact.firstName.toLowerCase() === name.toLowerCase() || contact.lastName.toLowerCase() === name.toLowerCase());
        if (contactIndex !== -1) {
            this.contacts.splice(contactIndex, 1);
        } else {
            throw new Error("Contact not found.");
        }
    }

    listContacts() {
        return this.contacts;
    }

    filterContactsByCity(city) {
        return this.contacts.filter(contact => contact.city.toLowerCase() === city.toLowerCase());
    }

    updateContact(name, newDetails) {
        let contact = this.findContactByName(name);
        if (contact) {
            Object.assign(contact, newDetails);
        } else {
            throw new Error("Contact not found.");
        }
    }
}

// Address Book Collection Class
class AddressBookCollection {
    constructor() {
        this.addressBooks = [];
    }

    createNewAddressBook() {
        const newAddressBook = new AddressBook();
        this.addressBooks.push(newAddressBook);
        return newAddressBook;
    }

    listAddressBooks() {
        return this.addressBooks;
    }
}

// Example Usage
const addressBookCollection = new AddressBookCollection();
const addressBook1 = addressBookCollection.createNewAddressBook();

try {
    const contact1 = new Contact("John", "Doe", "123 Street", "New York", "NewYork", "10001", "1234567890", "john.doe@example.com");
    addressBook1.addContact(contact1);
    console.log("Contacts in AddressBook1:", addressBook1.listContacts());
    
    // Editing Contact
    addressBook1.updateContact("John", { phone: "9876543210", city: "Los Angeles" });
    console.log("Updated Contacts:", addressBook1.listContacts());
    
    // Deleting Contact
    addressBook1.deleteContactByName("John");
    console.log("Contacts after deletion:", addressBook1.listContacts());
} catch (error) {
    console.error(error.message);
}
