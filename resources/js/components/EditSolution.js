import React from 'react';
import { Backdrop, Button, CircularProgress } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { Form, Formik, Field } from 'formik';
import { Switch, TextField } from 'formik-material-ui'; 

class EditSolution extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }    

    validator(values) {
        const errors= {};
        if ( !values.value ) {
            errors.value = 'Required';
        }
        return errors;
    }

    async save(values, resetForm ) {
        let backparsedValues = values;
        backparsedValues.valid = ( backparsedValues.valid ? 1 : 0 );
        await $.post( 'web_api/edit_solution', backparsedValues ).promise();
        await this.props.reload();
        resetForm();
    }

    parseValues( values ) {
        if( !values.hint ) values.hint = "";
        values.valid = ( values.valid > 0 ? true : false );
        return values;
    }

    render() {
        return (
            <Formik
                initialValues = { this.props.values ? this.parseValues(this.props.values) : {
                    valid: true,
                    value: "",
                    hint: "",
                    enigma_id: this.props.enigmaId,
                    id: -1
                } }
                validate = { values => this.validator(values) }
                onSubmit = { (values, { resetForm }) => this.save(values, resetForm) }
                enableReinitialize = {true}
            >
                { ({submitForm, isSubmitting, errors}) => (
                <Form style={{ width: "100%" }} p={2} >
                    <Field
                        component={TextField}
                        name="id"
                        type="hidden"
                    />
                    <Field
                        component={TextField}
                        name="enigma_id"
                        type="hidden"
                    />
                    <Field
                        component={TextField}
                        name="value"
                        label="Soluzione"
                        style={{ width: "80%"}}
                        InputLabelProps={{ shrink: true }}
                    />
                    <Field
                        component={Switch}
                        type="checkbox"
                        name="valid"
                        label="Accettata"
                    />
                    <Field
                        component={TextField}
                        name="hint"
                        label="Suggerimento"
                        style={{ width: "100%"}}
                        InputLabelProps={{ shrink: true }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        onClick={submitForm}
                        style={{ width: "100%" }}
                    >{this.props.values ? 'Salva' : 'Crea'} </Button>
                    <Backdrop open={isSubmitting} style={{ zIndex: 1500 }}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Form>
                )}
            </Formik>
        );
    }
}

export default withSnackbar(EditSolution);