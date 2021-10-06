import React from "react";
import {Field, reduxForm} from "redux-form";

class StreamCrreate extends React.Component {
    renderInput({input,label}){
        //return <input {...formProps.input}/>
        return (
            <div>
                <label>{label}</label>
                <input {...input}/>
            
            </div>
        )
    }
    render() { 
        return <div>
            <form className="ui form">
                <Field name="title" component={this.renderInput} label="Enter the title"/>
                <Field name="description"  component={this.renderInput} label="Enter the description"/>
            </form>
        </div>;
    }
}
 
export default reduxForm(
    {
        form:'StreamCreate'
    }
)(StreamCrreate);
 
