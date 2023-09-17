import { useState } from "react"
import * as Dialog from '@radix-ui/react-dialog'
import { Cross1Icon } from '@radix-ui/react-icons'
import ContactFields from "./ContactFields";
import { useContacts } from "../hooks/ContactHooks";


function Header() {
    const [searchValue, setSearchValue] = useState('');
    const [open, setOpen] = useState(false)
    const { createContact, searchContact } = useContacts();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.currentTarget))
        await createContact(data);
        setOpen(false)
    };

    const handleContactSearch = () => {
        searchContact(searchValue)
    }
    return (
        <header className="flex justify-between p-2 bg-purple-800 ">
            <h1 className="text-2xl text-white">Contacts</h1>
            <ul className="flex gap-4 justify-center items-center">
                <li className="flex gap-2">
                    <input className="focus:outline-none p-1 text-black rounded-md" type="text" value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder="Contact" />
                    <button className="bg-purple-100  px-2 rounded-md hover:bg-purple-400 hover:text-white" onClick={handleContactSearch}>Search</button>
                </li>
                <li className="flex justify-center items-center gap-4 ">
                    <span className="cursor-pointer bg-white p-2 rounded-md "><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><path fill="currentColor" d="m3.5.5l.354-.354a.5.5 0 0 0-.708 0L3.5.5ZM3.146.146l-3 3l.708.708l3-3l-.708-.708Zm0 .708l3 3l.708-.708l-3-3l-.708.708ZM3 .5V15h1V.5H3ZM9 4h6V3H9v1Zm0 4h4V7H9v1Zm0 4h2v-1H9v1Z" /></svg>
                    </span>

                    <span className="cursor-pointer bg-white p-2 rounded-md ">  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><path fill="currentColor" d="m3.5 14.5l-.354.354a.5.5 0 0 0 .708 0L3.5 14.5Zm.354.354l3-3l-.708-.708l-3 3l.708.708Zm0-.708l-3-3l-.708.708l3 3l.708-.708ZM3 0v14.5h1V0H3Zm6 4h6V3H9v1Zm0 4h4V7H9v1Zm0 4h2v-1H9v1Z" /></svg></span>

                    <Dialog.Root open={open} onOpenChange={setOpen} >
                        <Dialog.Trigger className="bg-white p-2 rounded-md ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="currentColor" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" /></svg>
                        </Dialog.Trigger>
                        <Dialog.Portal open={open}>
                            <Dialog.Overlay className='fixed inset-0 bg-black/50'>
                                <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 bg-white rounded-md text-gray-900'>
                                    <form onSubmit={handleFormSubmit}>
                                        <div className="flex justify-between items-center mb-2">
                                            <h2 className="text-xl font-semibold">Add new contact</h2>
                                            <Dialog.Close className="text-gray-400 focus:text-gray-500">
                                                <Cross1Icon />
                                            </Dialog.Close>
                                        </div>
                                        <ContactFields />
                                        <button className="p-2 w-full mt-4 uppercase rounded-md bg-purple-500 text-white active:transform" type="submit">Submit</button>
                                    </form>
                                </Dialog.Content>
                            </Dialog.Overlay>
                        </Dialog.Portal>
                    </Dialog.Root>

                </li>
            </ul>
        </header >
    )
}

export default Header