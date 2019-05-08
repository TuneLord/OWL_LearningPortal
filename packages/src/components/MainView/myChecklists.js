import React from "react";
import "./myChecklists.css";

 const MyChecklists = (props) => {
        return (
        <section id="mychecklists">
            <div className="mychecklists_container">
            <div className="mychecklists_title">
            <i className="material-icons">
                list_alt
                </i>
                <h3 className="mychecklists_title__header">Moje checklisty</h3>
            </div>
            <ul className="mychecklists_list" >        
                  { props.data.map(el => 
                    <li className="mychecklists_checklista" key={el.title} onClick={props.chosen}>
                     {el.title} 
                     <i className="material-icons icon-float">more_horiz</i>
                     </li>)}  
                   </ul>
                </div>
         </section>
        ); 
}

export default MyChecklists;
