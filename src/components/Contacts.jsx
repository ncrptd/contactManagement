import { useContacts, useDispatch } from "../hooks/ContactHooks"
import { ACTIONS } from "../reducer/contactReducer";
import * as Dialog from '@radix-ui/react-dialog'
import { DotsVerticalIcon, Cross1Icon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import ContactFields from "./ContactFields";
import { useState } from "react";

function Contacts() {
    const [open, setOpen] = useState(false);
    const { state, updateContact, deleteContact, toggleTooltip } = useContacts();
    const { contacts, selectedContacts, sortOrder, searchValue, tooltipOpen } = state;
    const { dispatch } = useDispatch();

    const handleContactSelect = (contact) => {
        const isContactPresent = selectedContacts.includes(contact);
        let newContacts;
        if (isContactPresent) {
            newContacts = selectedContacts.filter((item) => item._id !== contact._id)
        } else {
            newContacts = [...selectedContacts, contact]
        }
        dispatch({ type: ACTIONS.SELECT_CONTACT, payload: { selectedContacts: newContacts } })
    };

    const getSortedContacts = (sort, data) => {

        const sortedContacts = [...data];
        if (sort === 'asc') {
            return sortedContacts.sort((a, b) => a?.name.localeCompare(b?.name));
        } else if (sort === 'des') {
            return sortedContacts.sort((a, b) => b?.name.localeCompare(a?.name));
        }
        return sortedContacts
    }

    const getSearchedContacts = (name, data) => {
        return data.filter((contact) => contact.name.toLowerCase().includes(name.toLowerCase()))
    }


    const handleToolTip = (e, id) => {
        e.stopPropagation()
        toggleTooltip(id)
    }
    const handleFormSubmit = async (e, id) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.currentTarget));
        await updateContact(data, id);
        setOpen(false)
        toggleTooltip(false)
    }
    const handleContactDelete = async (id) => {
        await deleteContact(id);
        toggleTooltip(false)
    }

    const isContactSelected = (id) => {
        return selectedContacts.find((contact) => id === contact._id)
    }

    const handleSelectAll = () => {
        if (selectedContacts.length === contacts.length) {
            return dispatch({ type: ACTIONS.SELECT_CONTACT, payload: { selectedContacts: [] } })
        }
        const selectedContactsCopy = [...contacts];
        dispatch({ type: ACTIONS.SELECT_CONTACT, payload: { selectedContacts: selectedContactsCopy } })
    }
    const sortedContacts = getSortedContacts(sortOrder, contacts);
    const visibleContacts = getSearchedContacts(searchValue, sortedContacts);

    return (
        <table className="w-full text-center">
            <tbody>
                <tr className="bg-purple-600 text-white border-r ">
                    <th className="border-r border-slate-400 p-2 text-left">
                        <input type="checkbox" className="color-white cursor-pointer accent-purple-400 rounded-2xl mr-2" onChange={handleSelectAll} />
                        Contact</th>
                    <th className="border-r border-slate-400 p-2">Mobile</th>
                    <th className="border-r border-slate-400 p-2">Email</th>
                    <th className="border-r border-slate-400 p-2">Created Date</th>
                </tr>

                {visibleContacts.map((contact) => <tr className="" key={contact?._id} >
                    <td className={`flex justify-between border-r border-slate-400 `}>
                        <form>
                            <input className="color-white cursor-pointer accent-purple-400 rounded-2xl" type="checkbox" name="" id="" checked={isContactSelected(contact?._id)} onChange={() => handleContactSelect(contact)} />
                        </form>
                        <span>{contact?.name}</span>

                        <div className="relative cursor-pointer" onClick={(e) => handleToolTip(e, contact?._id)}><DotsVerticalIcon />

                            {contact._id === tooltipOpen && <div className={`absolute bg-white shadow-2xl top-0 left-2 p-4 flex flex-col gap-2 justify-center items-start text-start rounded-md`}>
                                <Dialog.Root open={open} onOpenChange={setOpen}>
                                    <Dialog.Trigger>
                                        <div className="flex justify-center items-center gap-2  hover:text-gray-500"  >
                                            <Pencil1Icon /> <span>Edit</span>
                                        </div>
                                    </Dialog.Trigger>
                                    <Dialog.Portal>
                                        <Dialog.Overlay className='fixed inset-0 bg-black/50'>
                                            <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 bg-white rounded-md text-gray-900'>
                                                <form
                                                    onSubmit={(e) => handleFormSubmit(e, contact?._id)}
                                                >
                                                    <div className="flex justify-between contacts-center mb-2">
                                                        <h2 className="text-xl font-semibold">Edit contact</h2>
                                                        <Dialog.Close className="text-gray-400 focus:text-gray-500">
                                                            <Cross1Icon />
                                                        </Dialog.Close>
                                                    </div>
                                                    <ContactFields contact={contact} />
                                                    <button className="p-2 w-full mt-4 uppercase rounded-md bg-purple-500 text-white cd" type="submit">Submit</button>
                                                </form>
                                            </Dialog.Content>
                                        </Dialog.Overlay>
                                    </Dialog.Portal>
                                </Dialog.Root>
                                <div className="flex justify-center items-center gap-2  hover:text-gray-500" onClick={() => handleContactDelete(contact?._id)}>
                                    <TrashIcon /> <span>Delete</span>
                                </div>
                            </div>}

                        </div>

                    </td>
                    <td className="border-r border-slate-400">{contact?.phone}</td>
                    <td className="border-r border-slate-400">{contact?.email}</td>
                    <td>{contact?.createdAt.split('T')[0]}</td>
                </tr>)}
            </tbody>
        </table >
    )
}

export default Contacts