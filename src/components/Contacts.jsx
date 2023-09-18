import { useContacts, useDispatch } from "../hooks/ContactHooks"
import { ACTIONS } from "../reducer/contactReducer";


function Contacts() {
    const { state } = useContacts();
    const { contacts, selectedContacts, sortOrder } = state;
    const { dispatch } = useDispatch();
    const handleContactSelect = (id) => {
        const isContactPresent = selectedContacts.includes(id);
        let newContacts;
        if (isContactPresent) {
            newContacts = selectedContacts.filter((contactId) => contactId !== id)
        } else {
            newContacts = [...selectedContacts, id]
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
    const visibleData = getSortedContacts(sortOrder, contacts);

    return (
        visibleData.length < 1 ? <p>loading...</p> : <table className="w-full text-center">
            <tbody>
                <tr className="bg-purple-600 text-white border-r ">
                    <th className="border-r border-slate-400 p-2 text-left">Contact</th>
                    <th className="border-r border-slate-400 p-2">Mobile</th>
                    <th className="border-r border-slate-400 p-2">Email</th>
                    <th className="border-r border-slate-400 p-2">Created Date</th>
                </tr>

                {visibleData.map((item) => <tr className="" key={item?._id} >
                    <td className={`flex justify-between border-r border-slate-400 `}>
                        <form>
                            <input className="color-white cursor-pointer accent-purple-400 rounded-2xl" type="checkbox" name="" id="" checked={selectedContacts.includes(item?._id)} onChange={() => handleContactSelect(item._id)} />
                        </form>
                        <span>{item?.name}</span>
                        <span className="cursor-pointer ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><circle cx="8" cy="2.5" r=".75" /><circle cx="8" cy="8" r=".75" /><circle cx="8" cy="13.5" r=".75" /></g></svg>
                        </span>
                    </td>
                    <td className="border-r border-slate-400">{item?.phone}</td>
                    <td className="border-r border-slate-400">{item?.email}</td>
                    <td>{item?.createdAt.split('T')[0]}</td>
                </tr>)}
            </tbody>
        </table >
    )
}

export default Contacts