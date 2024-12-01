interface InputProps{
    placeholder: string,
    reference?: any,
    type?: string
}

export default function Input ({placeholder, type}: InputProps ) {
    return <div>
        <input type={type} placeholder={placeholder} className="px-4 py-2 border-2 m-2 rounded-md"></input>
    </div>
}