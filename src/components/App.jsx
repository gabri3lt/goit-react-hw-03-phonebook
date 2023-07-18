import React, { Component } from 'react';
import s from './App.module.css';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import { v4 as uuidv4 } from 'uuid';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

    parsedContacts && this.setState({ contacts: parsedContacts });
  }

  componentDidUpdate(prevState) {
    this.state.contacts !== prevState.contacts &&
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  handleAddContact = data => {
    const { contacts } = this.state;
    const newContact = { ...data, id: uuidv4() };

    if (
      contacts
        .map(contact => contact.name.toLowerCase())
        .includes(data.name.toLowerCase())
    ) {
      alert(`Contact "${data.name}" already exists`);
    } else {
      this.setState(prevState => ({
        contacts: [newContact, ...prevState.contacts],
      }));
    }
  };

  handleFilter = event => {
    const { value } = event.currentTarget;
    this.setState({ filter: value });
  };

  getMatchingContacts = () => {
    const { contacts, filter } = this.state;

    const optimizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(optimizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getMatchingContacts();

    return (
      <div className={s.container}>
        <section title="Phonebook" className={s.section}>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={this.handleAddContact} />
        </section>

        <section title="Contacts" className={s.section}>
          <h2>Contacts</h2>
          <Filter value={filter} onChange={this.handleFilter} />
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={this.deleteContact}
          />
        </section>
      </div>
    );
  }
}

export default App;
