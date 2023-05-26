interface InputFormProps{
    id: string;
    name: string;
    type: string;
    formInfo: {}
    setFormInfo: (arg: any) => void;
}

export function InputForm({ name, id, setFormInfo, formInfo, type } : InputFormProps){
    return(
        <div className="mb-4">
            <label className="block text-gray-50 text-sm font-bold mb-2" htmlFor={id}>
                {name}
            </label>
            <input 
                className="shadow focus:outline-red-800 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id={id} 
                type={type} 
                placeholder={name}
                onChange={e => setFormInfo({
                    ...formInfo,
                    [id]: e.currentTarget.value
                })}
            />
        </div>
    )
}