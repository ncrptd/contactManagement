const ACTIONS = {
    GET_CONTACTS: 'get-contacts',
    SELECT_CONTACT: 'select-contact',
    TOGGLE_OPEN: 'toggle-open',
    ADD_NEW_CONTACT: 'add-new-contact',
    SET_NEW_CONTACT_DETAILS: 'set-new-contact-details'
}


function contactReducer(state, action) {
    const { type, payload } = action;
    switch (type) {
        case ACTIONS.GET_CONTACTS: {
            return { ...state, contacts: payload.contacts }
        }
        case ACTIONS.SELECT_CONTACT: {
            return { ...state, selectedContacts: payload.selectedContacts }
        }
        case ACTIONS.TOGGLE_OPEN: {
            return { ...state, open: payload.open }
        }
        case ACTIONS.SET_NEW_CONTACT_DETAILS: {
            return { ...state, contactDetails: payload.contactDetails }
        }
        case ACTIONS.ADD_NEW_CONTACT: {
            return { ...state, contacts: payload.updatedContacts }
        }
    }

}



export { ACTIONS, contactReducer }