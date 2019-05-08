import React from "react";
import "./myChecklists.css";

class Checklist extends React.Component {
    state = {
        data: []
    };

    // componentDidMount {
    //     fetch(....., {
    //         method: 'GET',
             // headers: {
            //     "x-log-token": localStorage.getItem("token"),
            // },
    //     }).then(resp => resp.json()
    //     .then(data => setState({data: data})))
    //     .catch(err => console.log(err))
    // }

    render() {
        return (
            <section id="checklist">
                <div className="mychecklists_container">
                    <div className="mychecklists_title">
                        <h3 className="mychecklists_title__header">Moja checklista</h3>
                    </div> 
                   <ul className="mychecklists_list">
                       <li className="mycheklists_checklista">
                        Pierwsze zadanie
                        <i className="material-icons icon-float">done</i>
                       </li>
                   </ul>
                </div>
            </section>
        ); 
    }
}

export default Checklist;