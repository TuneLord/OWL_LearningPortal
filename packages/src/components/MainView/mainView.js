import React, { Component } from "react";
import "./mainView.css";
import { MainViewMenuDesktop } from "./mainViewMenuDesktop";
import MyChecklists from "./myChecklists";
import Checklist from "./checklist";

export default class mainView extends Component {
  state = {
    data: [{title: 'Pierwszy moduł', isDone: false },{title: 'Drugi moduł', isDone: false} ],
    isChosen: false
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

onLiClick = (e) => {
    this.setState({isChosen: true })
    console.log(this.state.isChosen)
}
  render() {
    const windowWidth = window.innerWidth;

    return (
      <section className="mainView">
        {windowWidth > 1025 ? <MainViewMenuDesktop /> : null}
        <div className="mainView__container">
        {!this.state.isChosen && <MyChecklists data={this.state.data} chosen={this.onLiClick}/> }
        {this.state.isChosen && <Checklist />}
        </div>
      </section>
    );
  }
}
