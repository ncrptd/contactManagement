import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { ACTIONS, contactReducer } from "../reducer/contactReducer";
const ContactContext = createContext();
const ContactDispatchContext = createContext();

const initialState = {
    contacts: [],
    selectedContacts: [],
    open: false,
    tooltipOpen: false,
    contactDetails: null,
    sortOrder: 'asc',
    searchValue: ''
}
function ContactProvider({ children }) {
    const [state, dispatch] = useReducer(contactReducer, initialState);

    const createContact = async (formDetails) => {
        try {
            const res = await axios.post('https://coyote-leather-jacket.cyclic.cloud/api/contacts', formDetails);
            const newContact = await res.data;
            const updatedContacts = [...state.contacts, newContact]
            dispatch({ type: ACTIONS.ADD_NEW_CONTACT, payload: { updatedContacts } })
        } catch (error) {
            console.error(error)
        }
    };

    const updateContact = async (contactDetails, id) => {
        try {
            const res = await axios.put(`https://coyote-leather-jacket.cyclic.cloud/api/contacts/${id}`, contactDetails);
            const updatedContact = res.data;
            const updatedContacts = state.contacts.map((contact) => contact._id === updatedContact._id ? updatedContact : contact);
            dispatch({ type: ACTIONS.UPDATE_CONTACT, payload: { updatedContacts } })
        } catch (error) {
            console.error(error)
        }
    }

    const deleteContact = async (id) => {
        try {
            const res = await axios.delete(`https://coyote-leather-jacket.cyclic.cloud/api/contacts/${id}`);
            const { data } = await res.data;
            if (data) {
                const updatedContacts = state.contacts.filter((contact) => data._id !== contact._id);
                dispatch({ type: ACTIONS.DELETE_CONTACT, payload: { updatedContacts } })
            }
        } catch (error) {
            console.error('Failed to delete contact', error)

        }
    }
    const setSortOrder = (sortOrder) => {
        dispatch({ type: ACTIONS.SET_SORT_ORDER, payload: { sortOrder } })
    }
    const setSearchValue = (value) => {
        dispatch({ type: ACTIONS.SET_SEARCH_VALUE, payload: { value } })
    }

    const toggleTooltip = (id) => {
        dispatch({ type: ACTIONS.TOGGLE_TOOLTIP, payload: { id } })
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
                console.error(error)
            }
        };
        getContacts()
    }, [state.contacts.length]);


    return (
        <ContactContext.Provider value={{ state, createContact, updateContact, deleteContact, setSortOrder, setSearchValue, toggleTooltip }}>
            <ContactDispatchContext.Provider value={{ dispatch }}>
                {children}
            </ContactDispatchContext.Provider>
        </ContactContext.Provider>
    )
}

export { ContactProvider, ContactContext, ContactDispatchContext }