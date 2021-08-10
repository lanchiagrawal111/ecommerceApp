import { useState } from "react";

const useForm = (initialValue) => {
    const [values, setValues] = useState(initialValue);

    const resetForm = () => {
        setValues({});
    };

    return [
        values,
        (e) => {
            setValues({
                ...values,
                [e.target.name]: e.target.value
            })
        },
        () => {
            setValues({...initialValue});
        }
    ]
}

export default useForm;