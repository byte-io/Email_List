import React from "react";

import "./Email.css"

class EmailList extends React.Component {
    render() {

        let date = new Date(this.props.date)
            let formattedDate =("0"+ date.getDate()).slice(-2)+"/"+("0"+ date.getMonth()).slice(-2)+"/"+date.getFullYear()+" "
                                + ("0"+date.getHours()).slice(-2)+":"+("0"+date.getMinutes()).slice(-2)

        return (
            <div className="emailList" onClick={()=>this.props.emailClick({allprops: this.props, date: formattedDate})}>
                <span className="avatar"><b>{this.props.name.charAt(0).toUpperCase()}</b></span>
                <span >
                    <p>From: <b>{this.props.name +" <"+this.props.emailId+">"}</b></p>
                    <p>subject: <b>{this.props.subject}</b></p>
                    <p>{this.props.description}</p>
                    <p>{formattedDate}</p>
                </span>
            </div>
        )
    }

}
export default EmailList;
