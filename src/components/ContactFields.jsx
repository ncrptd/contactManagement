function ContactFields({ contact }) {
    return (
        <div className="flex flex-col gap-2 ">
            <label htmlFor="name">Name</label>
            <input className="border-2 rounded-md focus:outline-none focus:border-purple-500 p-2" type="text" id='name' name='name' autoFocus defaultValue={contact?.name} />

            <label htmlFor="email">Email</label>
            <input className="border-2 rounded-md focus:outline-none focus:border-purple-500 p-2" type="email" id='email' name='email' defaultValue={contact?.email} />

            <label htmlFor="phone">Phone</label>
            <input className="border-2 rounded-md focus:outline-none focus:border-purple-500 p-2" type="tel" name="phone" id="phone" defaultValue={contact?.phone} />



        </div>
    )
}

export default ContactFields