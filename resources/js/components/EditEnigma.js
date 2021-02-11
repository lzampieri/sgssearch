import React from 'react';
import { Backdrop, Button, CircularProgress } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { Form, Formik, Field } from 'formik';
import { TextField } from 'formik-material-ui'; 

class EditEnigma extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }    

    validator(values) {
        const errors= {};
        if ( !values.points || values.points <= 0 ) {
          errors.points = 'Required';
        }
        if ( values.accessible_at < 0 ) {
          errors.accessible_at = 'Required';
        }
        if ( !values.text ) {
            errors.text = 'Required';
        }
        return errors;
    }

    async save(values) {
        await $.post( 'web_api/edit_enigma', values ).promise();
        await this.props.reload();
    }

    render() {
        return (
            <Formik
                initialValues = { this.props.values ? this.props.values : {
                    points: 1,
                    accessible_at: 0,
                    text: "",
                    id: -1
                } }
                validate = { values => this.validator(values) }
                onSubmit = { values => this.save(values) }
                enableReinitialize = {true}
            >
                { ({submitForm, isSubmitting, errors}) => (
                <Form style={{ width: "100%" }} p={2}>
                    <Field
                        component={TextField}
                        name="id"
                        type="hidden"
                    />
                    <Field
                        component={TextField}
                        name="points"
                        type="number"
                        label="Punti"
                        style={{ width: "100%"}}
                        InputLabelProps={{ shrink: true }}
                    />
                    <Field
                        component={TextField}
                        name="accessible_at"
                        type="number"
                        label="Disponibile a:"
                        style={{ width: "100%" }}
                        InputLabelProps={{ shrink: true }}
                    />
                    <Field
                        component={TextField}
                        name="text"
                        InputProps={{
                            multiline: true,
                            rows: 10
                        }}
                        label="Enigma"
                        style={{ width: "100%" }}
                        InputLabelProps={{ shrink: true }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        onClick={submitForm}
                        style={{ width: "100%" }}
                    >{this.props.enigmaId == -1 ? 'Crea' : 'Salva'} </Button>
                    <Backdrop open={isSubmitting} style={{ zIndex: 1500 }}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Form>
                )}
            </Formik>
        );
    }
}

export default withSnackbar(EditEnigma);