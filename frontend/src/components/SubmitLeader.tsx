
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {type FieldValues, useForm} from "react-hook-form";



const SubmitLeader = () => {

    const leaderSchema = yup.object({
        fname: yup.string().required("Name is required"),
        lname: yup.string().required("Last name is required"),
        jobTitle: yup.string().required("Job title is required")
    })

    const {
        register,
        reset,
        handleSubmit
    } = useForm({
        resolver: yupResolver(leaderSchema)
    })

    type parsedLeader = yup.InferType<typeof leaderSchema>

    const onSubmit = async (data: FieldValues) => {
        const parsedData: parsedLeader = await leaderSchema.validate(data);
        console.log(parsedData);
        reset();
    }


    return (
        <div>
            <h1>Submit New Leader</h1>
            <form className={"formSubmit"} onSubmit={handleSubmit(e => onSubmit(e))}>
                <label htmlFor="nameInput">First Name</label>
                <input id={"nameInput"}
                       type="text"
                       placeholder={"Groot"}
                       {...register("fname")}
                />


                <div>
                    <label htmlFor={"descriptionField"}>Last Name</label>
                    <input id={"descriptionField"}
                           type="text"
                           placeholder={"I am Groot."}
                           {...register("lname")}
                    />
                </div>

                <label htmlFor={"jobTitleField"}>Job Title</label>
                <input id={"jobTitleField"}
                       type={"text"}
                       placeholder={"Guardian of the Galaxy"}
                       {...register("jobTitle")}
                       />

                <button type="reset">Reset</button>
                <button type="submit" >Submit</button>
            </form>
        </div>
    );
};

export default SubmitLeader;
