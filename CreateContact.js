// AddressBook.js

class Contact {
    constructor(firstName, lastName, address, city, state, zip, phone, email) {
        if (!this.validateName(firstName) || !this.validateName(lastName)) {
            throw new Error("First and Last Name should start with a capital letter and have at least 3 characters.");
        }
        if (!this.validateAddress(address) || !this.validateAddress(city) || !this.validateAddress(state)) {
            throw new Error("Address, City, and State should have at least 4 characters.");
        }
        if (!this.validateZip(zip)) {
            throw new Error("Invalid Zip Code format.");
        }
        if (!this.validatePhone(phone)) {
            throw new Error("Invalid Phone Number format.");
        }
        if (!this.validateEmail(email)) {
            throw new Error("Invalid Email format.");
        }

        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phone = phone;
        this.email = email;
    }

    toString() {
        return `${this.firstName} ${this.lastName}, ${this.address}, ${this.city}, ${this.state} - ${this.zip}, Ph: ${this.phone}, Email: ${this.email}`;
    }

    validateName(name) {
        return /^[A-Z][a-zA-Z]{2,}$/.test(name);
    }

    validateAddress(value) {
        return /^.{4,}$/.test(value);
    }

    validateZip(zip) {
        return /^[0-9]{5,6}$/.test(zip);
    }

    validatePhone(phone) {
        return /^[0-9]{10}$/.test(phone);
    }

    validateEmail(email) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }
}

class AddressBook {
    constructor(name) {
        this.name = name;
        this.contacts = [];
    }

    addContact(contact) {
        if (this.contacts.some(c => c.firstName === contact.firstName && c.lastName === contact.lastName)) {
            throw new Error("Contact with this name already exists!");
        }
        this.contacts.push(contact);
    }

    removeContact(email) {
        this.contacts = this.contacts.filter(contact => contact.email !== email);
    }

    removeContactByName(firstName, lastName) {
        this.contacts = this.contacts.filter(contact => contact.firstName !== firstName || contact.lastName !== lastName);
    }

    updateContactByName(firstName, lastName, updatedDetails) {
        let contact = this.contacts.find(contact => contact.firstName === firstName && contact.lastName === lastName);
        if (!contact) throw new Error("Contact not found!");
        Object.assign(contact, updatedDetails);
    }

    searchContactsByCity(city) {
        return this.contacts.filter(contact => contact.city === city);
    }

    searchContactsByState(state) {
        return this.contacts.filter(contact => contact.state === state);
    }

    viewPersonsByCity(city) {
        return this.contacts.filter(contact => contact.city === city).map(contact => contact.toString());
    }

    viewPersonsByState(state) {
        return this.contacts.filter(contact => contact.state === state).map(contact => contact.toString());
    }

    getContactCount() {
        return this.contacts.length;
    }

    getContactCountByCity(city) {
        return this.contacts.filter(contact => contact.city === city).length;
    }

    getContactCountByState(state) {
        return this.contacts.filter(contact => contact.state === state).length;
    }

    sortContactsByName() {
        this.contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
    }
}

class AddressBookSystem {
    constructor() {
        this.addressBooks = [];
    }

    createAddressBook(name) {
        if (this.addressBooks.some(book => book.name === name)) {
            throw new Error("Address Book with this name already exists!");
        }
        let newBook = new AddressBook(name);
        this.addressBooks.push(newBook);
    }

    getAddressBook(name) {
        return this.addressBooks.find(book => book.name === name);
    }
}

// Usage Example
try {
    let system = new AddressBookSystem();
    system.createAddressBook("Personal");
    system.createAddressBook("Work");

    let personalBook = system.getAddressBook("Personal");
    let workBook = system.getAddressBook("Work");

    let contact1 = new Contact("John", "Doe", "123 Main St", "New York", "New York", "10001", "1234567890", "john.doe@example.com");
    let contact2 = new Contact("Jane", "Smith", "456 Oak St", "Los Angeles", "California", "90001", "0987654321", "jane.smith@example.com");
    
    personalBook.addContact(contact1);
    workBook.addContact(contact2);
    
    personalBook.sortContactsByName();
    console.log("Sorted Contacts in Personal Book:", personalBook.contacts.map(contact => contact.toString()));
    
} catch (error) {
    console.error(error.message);
}
