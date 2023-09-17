

function Form() {
    return (
        <div className="flex flex-col gap-2 ">
            <label htmlFor="name">Name</label>
            <input className="border-2 rounded-md focus:outline-none focus:border-purple-500 p-2" type="text" id='name' name='name' autoFocus />

            <label htmlFor="email">Email</label>
            <input className="border-2 rounded-md focus:outline-none focus:border-purple-500 p-2" type="email" id='email' name='email' />

            <label htmlFor="phone">Phone</label>
            <input className="border-2 rounded-md focus:outline-none focus:border-purple-500 p-2" type="tel" name="phone" id="phone" />



        </div>
    )
}

export default Form