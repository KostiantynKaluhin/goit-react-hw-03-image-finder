import s from "./Searchbar.module.css";
import { toast } from "react-toastify";
import { Component } from "react";

class Searchbar extends Component {
  state = {
    value: "",
  };
  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.value.trim() === "") {
      toast.error("Please enter your search term!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    this.props.onSubmit(this.state.value);
    this.setState({ value: "" });
  };
  render() {
    return (
      <header className={s.Searchbar}>
        <form onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchButton}>
            Search
          </button>
          <input
            className={s.SearchForm}
            type="text"
            autoComplete="off"
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.value}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
