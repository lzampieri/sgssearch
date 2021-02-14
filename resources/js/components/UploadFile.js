import React from 'react';
import { withSnackbar } from 'notistack';
import { Button } from '@material-ui/core';
import { Form, Formik, Field } from 'formik';
import { SimpleFileUpload } from 'formik-material-ui';
  
class UploadFile extends React.Component {

    constructor(props) {
        super(props);
    }

    validator(values) {
        const errors= {};
        if ( !values.file ) {
            errors.file = 'Required';
        }
        return errors;
    }

    save(values, resetForm) {
        this.props.enqueueSnackbar("Caricamento in corso...");

        const formData = new FormData();
        formData.append('attachment', values.file );
        formData.append('filename', values.file.name );
  
        $.ajax({
            url: "web_api/upload_file", 
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: () => this.props.enqueueSnackbar("File salvato come "+values.file.name),
            error: () => this.props.enqueueSnackbar("Errore nel caricamento. Riprova."),
        });

        resetForm();
    }
    
    render() {
        return (
            <Formik 
                initialValues={{ file: null }}
                validate = { values => this.validator(values) }
                onSubmit={ (values, { resetForm }) => this.save(values, resetForm) }
            >
                { ({submitForm, isSubmitting, errors}) => (
                    <Form style={{ width: "100%" }} p={2} >
                        <Field
                            component={SimpleFileUpload}
                            name="file"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            onClick={submitForm}
                            style={{ width: "100%" }}
                        >Upload</Button>
                    </Form>
                )}
            </Formik>
        );
    }
    
}

export default withSnackbar(UploadFile);
