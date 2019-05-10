import React from 'react';
import "./myTeams.css";

export const MyTeam = (props) => {
 return (
     <div id="myteam">
      <div className="myteam_header">
      <div className="myteam_title">
        {props.title}
      </div>
      </div>
         <ul className="myteam_list">
            {props.data.map((el, index) =>
              <li className="myteams_team" key={index}>
                {el}
                <i className="material-icons icon-float icon-color">delete_forever</i>
              </li>)}
          </ul>
          <div className="myteam_checklistsTitle">
          Checklisty
          </div>
          <ul className="myteam_list">
            {props.checklisty.map((el, index) =>
              <li className="myteams_team" key={index}>
                {el}
              </li>)}
          </ul>
     </div>
 )
}

