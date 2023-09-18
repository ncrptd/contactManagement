import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { ACTIONS, contactReducer } from "../reducer/contactReducer";
const ContactContext = createContext();
const ContactDispatchContext = createContext();

const initialState = {
    contacts: [],
    selectedContacts: [],
    open: false,
    contactDetails: null,
    sortOrder: 'asc'
}
function ContactProvider({ children }) {
    const [state, dispatch] = useReducer(contactReducer, initialState);

    const createContact = async (formDetails) => {
        try {
            const res = await axios.post('https://coyote-leather-jacket.cyclic.cloud/api/contacts', formDetails);
            const newContact = res.data;
            const updatedContacts = [...state.contacts, newContact]
            dispatch({ type: ACTIONS.ADD_NEW_CONTACT, payload: { updatedContacts } })
        } catch (error) {
            console.log(error)
        }
    }

    const setSortOrder = (sortOrder) => {
        dispatch({ type: ACTIONS.SET_SORT_ORDER, payload: { sortOrder } })
    }
    useEffect(() => {
        const getContacts = async () => {
            try {
                if (state.contacts.length === 0) {
                    const res = await axios.get('https://coyote-leather-jacket.cyclic.cloud/api/contacts');
                    const data = res.data;
                    dispatch({ type: ACTIONS.GET_CONTACTS, payload: { contacts: data } });
                    dispatch({ type: ACTIONS.TOGGLE_OPEN, payload: { open: false } })
                }

            } catch (error) {
                console.log(error)
            }
        };
        getContacts()
    }, [state.contacts.length]);


    return (
        <ContactContext.Provider value={{ state, createContact, setSortOrder }}>
            <ContactDispatchContext.Provider value={{ dispatch }}>
                {children}
            </ContactDispatchContext.Provider>
        </ContactContext.Provider>
    )
}

export { ContactProvider, ContactContext, ContactDispatchContext }