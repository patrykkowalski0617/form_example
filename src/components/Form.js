import React from "react";
import { Field, reduxForm } from "redux-form";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import asyncValidate from "./asyncValidate";

const useStyles = makeStyles(() =>
    createStyles({
        fieldWrapper: {
            display: "flex",
            justifyContent: "center"
        }
    })
);

const validate = values => {
    const errors = {};
    const requiredFields = [
        "firstName",
        "lastName",
        "email",
        "favoriteColor",
        "notes"
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = "Required";
        }
    });
    if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = "Invalid email address";
    }
    return errors;
};

const renderTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
}) => (
    <TextField
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />
);

const renderCheckbox = ({ input, label }) => (
    <div>
        <FormControlLabel
            control={
                <Checkbox
                    checked={input.value ? true : false}
                    onChange={input.onChange}
                />
            }
            label={label}
        />
    </div>
);

const radioButton = ({ input, ...rest }) => (
    <FormControl>
        <RadioGroup {...input} {...rest}>
            <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
    </FormControl>
);

const renderFormHelper = ({ touched, error }) => {
    if (!(touched && error)) {
        return;
    } else {
        return <FormHelperText>{touched && error}</FormHelperText>;
    }
};

const renderSelectField = ({
    input,
    label,
    meta: { touched, error },
    children,
    ...custom
}) => (
    <FormControl error={touched && error}>
        <InputLabel htmlFor="age-native-simple">Age</InputLabel>
        <Select
            native
            {...input}
            {...custom}
            inputProps={{
                name: "age",
                id: "age-native-simple"
            }}
        >
            {children}
        </Select>
        {renderFormHelper({ touched, error })}
    </FormControl>
);

const MaterialUiForm = props => {
    const { handleSubmit, pristine, reset, submitting, classes } = props;

    const uiClasses = useStyles();

    return (
        <form onSubmit={handleSubmit}>
            <Box component="div" className={uiClasses.fieldWrapper}>
                <Field
                    name="firstName"
                    component={renderTextField}
                    label="First Name"
                />
            </Box>
            <Box component="div" className={uiClasses.fieldWrapper}>
                <Field
                    name="lastName"
                    component={renderTextField}
                    label="Last Name"
                />
            </Box>
            <Box component="div" className={uiClasses.fieldWrapper}>
                <Field name="email" component={renderTextField} label="Email" />
            </Box>
            <Box component="div" className={uiClasses.fieldWrapper}>
                <Field name="sex" component={radioButton}>
                    <Radio value="male" label="male" />
                    <Radio value="female" label="female" />
                </Field>
            </Box>
            <Box component="div" className={uiClasses.fieldWrapper}>
                <Field
                    classes={classes}
                    name="favoriteColor"
                    component={renderSelectField}
                    label="Favorite Color"
                >
                    <option value="" />
                    <option value={"ff0000"}>Red</option>
                    <option value={"00ff00"}>Green</option>
                    <option value={"0000ff"}>Blue</option>
                </Field>
            </Box>
            <Box component="div" className={uiClasses.fieldWrapper}>
                <Field
                    name="employed"
                    component={renderCheckbox}
                    label="Employed"
                />
            </Box>
            <Box />
            <Box component="div" className={uiClasses.fieldWrapper}>
                <Field
                    name="notes"
                    component={renderTextField}
                    label="Notes"
                    multiline
                    rowsMax="4"
                    margin="normal"
                />
            </Box>
            <Box component="div" className={uiClasses.fieldWrapper}>
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
            </Box>
        </form>
    );
};

export default reduxForm({
    form: "MaterialUiForm", // a unique identifier for this form
    validate,
    asyncValidate
})(MaterialUiForm);
