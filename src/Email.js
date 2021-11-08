import React from  'react';
import EmailList from "./EmailList"
import "./Email.css"

const readEmailId=[];
const favEmailId=[];
class Email extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            emailDetail: [],
            fetchedEmailDetail:[],
            emailBody: '',
            showEmailBody: "",
            activeEmail:{},
            readEmail:[],
            favEmail: []
        }
    };

    componentDidMount = () => {   
        fetch("https://flipkart-email-mock.vercel.app/")
            .then(res=>res.json())
            .then(data=> this.setState({
                emailDetail: data.list,
                fetchedEmailDetail: data.list
            }))   
    }

    emailClickHandler = (active) => {
        
        !(this.state.readEmail.includes(active.allprops.id)) && readEmailId.push(active.allprops.id)
        fetch("https://flipkart-email-mock.vercel.app/?id="+ active.allprops.id)
        .then(res=> res.json())
        .then(data => this.setState({
                emailBody: data.body,
                showEmailBody: "showEmailBody",
                activeEmail: active,
                readEmail: readEmailId
        }))

    }

    sortReadHandler = () => {
        const readEmailArray=this.state.fetchedEmailDetail.filter(email=> this.state.readEmail.includes(email.id))
        this.setState({
            emailDetail: readEmailArray
        })
    }

    favEmailHandler = (id) => {
       !(this.state.favEmail.includes(id)) && favEmailId.push(id)
       this.setState({favEmail: favEmailId})
    }

    sortFavHandler = () => {
        const favEmailArray=this.state.fetchedEmailDetail.filter(email => this.state.favEmail.includes(email.id))
        this.setState({
            emailDetail: favEmailArray
        })
    }

    sortUnreadHandler = () => {
        const unreadEmailArray = this.state.fetchedEmailDetail.filter(email => !(this.state.readEmail.includes(email.id)))
        this.setState({
            emailDetail: unreadEmailArray
        })
    }
    
    
    render()  {
        
        return (
            <main style={{backgroundColor: "#f4f5f9", color: "#636363"}}>
            <div className="header">
                <b>Filter By: </b>
                <button onClick={this.sortUnreadHandler}>Unread</button>
                <button onClick={this.sortReadHandler}>Read</button>
                <button onClick={this.sortFavHandler}>Favorite</button>
            </div>
            <div className={this.state.showEmailBody}>
                <section>
                    {
                        this.state.emailDetail.map(email => 
                            <EmailList
                            id={email.id}
                            name={email.from.name}
                            emailId={email.from.email}
                            subject={email.subject}
                            description={email.short_description}
                            date={email.date}
                            emailClick={this.emailClickHandler}
                            />)
                    }
                </section>
                {this.state.emailBody.length > 0 && <section className="emailBody">
                    <span className="avatar"><b>{this.state.activeEmail.allprops.name.charAt(0).toUpperCase()}</b></span>
                    <span>
                        <b>{this.state.activeEmail.allprops.name}</b>
                        <button className="markFavButton" onClick={()=>this.favEmailHandler(this.state.activeEmail.allprops.id)}>Mark as favorite</button>
                        <p style={{padding: "0 90px"}}>{this.state.activeEmail.date}</p>  
                    </span>
                    
                    <div style={{padding: "0 30px 0 90px"}}dangerouslySetInnerHTML={{__html: this.state.emailBody}}></div>
                
                </section>}
            </div>
            </main>
        
        )
    };
        
    
}

export default Email;
