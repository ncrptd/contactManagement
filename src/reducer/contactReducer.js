const ACTIONS = {
    GET_CONTACTS: 'get-contacts',
    SELECT_CONTACT: 'select-contact',
    TOGGLE_OPEN: 'toggle-open',
    ADD_NEW_CONTACT: 'add-new-contact',
    SET_NEW_CONTACT_DETAILS: 'set-new-contact-details',
    SET_SORT_ORDER: 'set-sort-order',
    SET_SEARCH_VALUE: 'set-search-value',
    DELETE_CONTACT: 'delete-contact',
    TOGGLE_TOOLTIP: 'toggle-tooltip',
    UPDATE_CONTACT: 'update-contact'
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
        case ACTIONS.SET_SORT_ORDER: {
            return { ...state, sortOrder: payload.sortOrder }
        }
        case ACTIONS.SET_SEARCH_VALUE: {
            return { ...state, searchValue: payload.value }
        }
        case ACTIONS.DELETE_CONTACT: {
            return { ...state, contacts: payload.updatedContacts }
        }
        case ACTIONS.TOGGLE_TOOLTIP: {
            return { ...state, tooltipOpen: payload.id }
        }
        case ACTIONS.UPDATE_CONTACT: {
            return { ...state, contacts: payload.updatedContacts }
        }
    }

}



export { ACTIONS, contactReducer }