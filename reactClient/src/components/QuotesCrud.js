import React, { Component } from "react";
import { Nav } from ".";
import { Images } from "../theme";
import axios from "axios";

class QuotesCrud extends Component {
  state = {
    data: [],
    id: 0,
    message: "",
    intervalIsSet: false,
    idToDelete: "",
    idToUpdate: "",
    updateToApply: "",
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
    await this.setState({ data: initialQuotes });
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

    axios
      .post("/api/quotes", {
        id: idToBeAdded,
        message: message,
      })
      .then(res => {
        console.log(res);
        this.fetchQuotes();
        this.setState({ message: "" });
      })
      .catch(err => {
        console.log(err);
      });
    // .then(() => {
    //   this.fetchQuotes();
    // });
  };

  deleteFromDB = idTodelete => {
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id === parseInt(idTodelete)) {
        objIdToDelete = dat._id;
      }
    });

    axios
      .delete("/api/quotes/del_quote", {
        data: {
          id: objIdToDelete,
        },
      })
      .then(res => {
        // console.log(res);
        console.log(objIdToDelete);
        this.fetchQuotes();
        this.setState({ idToDelete: "" });
      })
      .catch(err => {
        console.log(err);
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

    axios
      .post("/api/quotes/update_quote", {
        id: objIdToUpdate,
        update: { message: updateToApply },
      })
      .then(res => {
        console.log(res);
        console.log(objIdToUpdate, `---`, updateToApply);
        this.fetchQuotes();
        this.setState({ idToUpdate: "", updateToApply: "" });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { data, message, idToDelete, idToUpdate, updateToApply } = this.state;
    return (
      <div className="landing fx fxdc fxjcc fxaic">
        <Nav />
        <h1>Badass Quotes</h1>
        <ul>
          {data.length <= 0 ? (
            <div className="loading tac">
              <img src={Images.loading1} alt="loading" />
              <h3>Loading Quotes...</h3>
            </div>
          ) : (
            data.map(dat => (
              <li style={{ padding: "10px" }} key={dat.id}>
                <span> Q_id: </span> {dat.id}, - <span> Quote: </span> {dat.message}
              </li>
            ))
          )}
        </ul>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            onChange={e => this.setState({ message: e.target.value })}
            placeholder="Write a new Quote"
            value={message}
            style={{ width: "200px" }}
          />
          <button onClick={() => this.putDataToDB(message)}>ADD</button>
        </div>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ idToDelete: e.target.value })}
            value={idToDelete}
            placeholder="Q_id to Delete"
          />
          <button onClick={() => this.deleteFromDB(idToDelete)}>DELETE</button>
        </div>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ idToUpdate: e.target.value })}
            value={idToUpdate}
            placeholder="Q_id of Quote to update"
          />
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ updateToApply: e.target.value })}
            value={updateToApply}
            placeholder="New Quote value"
          />
          <button onClick={() => this.updateDB(idToUpdate, updateToApply)}>UPDATE</button>
        </div>
      </div>
    );
  }
}

export default QuotesCrud;
