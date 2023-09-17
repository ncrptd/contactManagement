import { useContext } from "react";
import { ContactContext, ContactDispatchContext } from "../context/ContactContext";

const useContacts = () => useContext(ContactContext)

const useDispatch = () => useContext(ContactDispatchContext);

export { useContacts, useDispatch }