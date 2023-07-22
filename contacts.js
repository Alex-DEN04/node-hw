const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "/db/contacts.json");
const { nanoid } = require("nanoid");
const newContactId = nanoid();

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = await contacts.find((item) => item.id === contactId);
  return contactById || null;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: newContactId, name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [deleteContactById] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deleteContactById;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
