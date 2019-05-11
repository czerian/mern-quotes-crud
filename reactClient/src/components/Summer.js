import React, { Component } from "react";
import { Nav } from "./";
import axios from "axios";

class Summer extends Component {
  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
  };

  componentDidMount() {
    this.fetchQuotes();
  }

  // glory = async () => {
  //   const interval = await this.fetchQuotes();
  //   await this.setState({ intervalIsSet: interval });
  //   await setTimeout(console.log(interval), 5000);
  // };

  fetchQuotes = async () => {
    const response = await fetch(`/api/quotes`);
    const initialQuotes = await response.json();
    await this.setState({ data: initialQuotes.data });
    await console.log(this.state.data);
  };

  // getDataFromDb = () => {
  //   fetch("http://localhost:3001/api/getData")
  //     .then(data => data.json())
  //     .then(res => this.setState({ data: res.data }))
  //     .then(console.log(this.state.data));
  // };

  putDataToDB = message => {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post("/api/quotes", {
      id: idToBeAdded,
      message: message,
    });
  };

  deleteFromDB = idTodelete => {
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id === parseInt(idTodelete)) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete("/api/quotes/del_quote", {
      data: {
        id: objIdToDelete,
      },
    });
  };

  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    this.state.data.forEach(dat => {
      if (dat.id == idToUpdate) {
        objIdToUpdate = dat._id;
        console.log(objIdToUpdate);
      }
    });

    axios.post("/api/quotes/update_quote", {
      id: objIdToUpdate,
      update: { message: updateToApply },
    });
  };

  render() {
    const { data } = this.state;
    return (
      <div className="landing fx fxdc fxjcc fxaic">
        <ul>
          {data.length <= 0
            ? "NO DB ENTRIES YET"
            : data.map(dat => (
                <li style={{ padding: "10px" }} key={data.message}>
                  <span> Id: </span> {dat.id} <br />
                  <span> Data: </span>
                  {dat.message}
                </li>
              ))}
        </ul>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            onChange={e => this.setState({ message: e.target.value })}
            placeholder="add something in the database"
            style={{ width: "200px" }}
          />
          <button onClick={() => this.putDataToDB(this.state.message)}>ADD</button>
        </div>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ idToDelete: e.target.value })}
            placeholder="put id of item to delete here"
          />
          <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>DELETE</button>
        </div>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ idToUpdate: e.target.value })}
            placeholder="id of item to update here"
          />
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ updateToApply: e.target.value })}
            placeholder="put new value of the item here"
          />
          <button onClick={() => this.updateDB(this.state.idToUpdate, this.state.updateToApply)}>
            UPDATE
          </button>
        </div>
        <Nav />
      </div>
    );
  }
}

export default Summer;
