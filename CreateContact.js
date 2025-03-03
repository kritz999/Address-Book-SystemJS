// Address Book Contact Class
class Contact {
    constructor(firstName, lastName, address, city, state, zip, phone, email) {
        if (!this.validateName(firstName)) throw new Error("Invalid First Name: Must start with a capital letter and be at least 3 characters long.");
        if (!this.validateName(lastName)) throw new Error("Invalid Last Name: Must start with a capital letter and be at least 3 characters long.");
        if (!this.validateAddress(address)) throw new Error("Invalid Address: Must be at least 4 characters long.");
        if (!this.validateAddress(city)) throw new Error("Invalid City: Must be at least 4 characters long.");
        if (!this.validateAddress(state)) throw new Error("Invalid State: Must be at least 4 characters long.");
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

    findContact(email) {
        return this.contacts.find(contact => contact.email === email);
    }

    listContacts() {
        return this.contacts;
    }

    filterContactsByCity(city) {
        return this.contacts.filter(contact => contact.city.toLowerCase() === city.toLowerCase());
    }

    updateContact(email, newDetails) {
        let contact = this.findContact(email);
        if (contact) {
            Object.assign(contact, newDetails);
        } else {
            throw new Error("Contact not found.");
        }
    }
}

// Example Usage
const addressBook = new AddressBook();

try {
    const contact1 = new Contact("John", "Doe", "123 Street", "New York", "NY", "10001", "1234567890", "john.doe@example.com");
    addressBook.addContact(contact1);
    console.log("Contacts:", addressBook.listContacts());
} catch (error) {
    console.error(error.message);
}
