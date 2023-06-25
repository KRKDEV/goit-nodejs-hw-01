const fs = require("fs").promises;
const path = require("path");
const { randomUUID } = require("crypto");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return console.table(JSON.parse(data));
  } catch (err) {
    return console.log(err);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const parseData = JSON.parse(data);
    return parseData.map((data) => {
      if (data.id === contactId) {
        return console.table(data);
      }
    });
  } catch (err) {
    return console.log(err);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const filterContacts = JSON.parse(data).filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(filterContacts));
    return console.log(`Contacts with ID ${contactId} was succesfully removed`);
  } catch (err) {
    return console.log(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const dataParse = JSON.parse(data);
    const addData = [
      ...dataParse,
      {
        id: randomUUID().slice(0, 21),
        name,
        email,
        phone,
      },
    ];
    await fs.writeFile(contactsPath, JSON.stringify(addData));
    console.table(addData);
  } catch (err) {
    return console.log(err);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
