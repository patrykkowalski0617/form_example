import React from "react";
import { Field, reduxForm } from "redux-form";

const Form = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field
                    name="firstName"
                    component="input"
                    type="text"
                    label="First Name"
                />
            </div>
            <div>
                <Field
                    name="lastName"
                    component="input"
                    type="text"
                    label="Last Name"
                />
            </div>
            <div>
                <Field
                    name="email"
                    component="input"
                    type="email"
                    label="Email"
                />
            </div>
            <div>
                <Field
                    name="sex"
                    component="input"
                    type="radio"
                    value="male"
                    label="male"
                />
                <Field
                    name="sex"
                    component="input"
                    type="radio"
                    value="female"
                    label="male"
                />
            </div>
            <div>
                <Field
                    name="favoriteColor"
                    component="select"
                    label="Favorite Color"
                >
                    <option value="" />
                    <option value={"ff0000"}>Red</option>
                    <option value={"00ff00"}>Green</option>
                    <option value={"0000ff"}>Blue</option>
                </Field>
            </div>
            <div>
                <Field
                    name="employed"
                    component="input"
                    type="checkbox"
                    label="Employed"
                />
            </div>
            <div />
            <div>
                <button type="submit" disabled={pristine || submitting}>
                    Submit
                </button>
                <button
                    type="button"
                    disabled={pristine || submitting}
                    onClick={reset}
                >
                    Clear Values
                </button>
            </div>
        </form>
    );
};

export default reduxForm({
    form: "Form" // a unique identifier for this form
})(Form);
