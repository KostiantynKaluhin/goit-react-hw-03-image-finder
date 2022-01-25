import React, { Component } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import Loader from "./components/Loader/Loader";

import fetchImages from "./service/Api";

class App extends Component {
  state = {
    images: [],
    searchImage: "",
    openModal: false,
    isLoading: false,
    page: 1,
    error: "",
  };

  maxPages = 0;
  largeImgURL = "";
  newElementHight = 0;

  componentDidUpdate(prevProps, prevState) {
    if (
      (prevState.searchImage !== this.state.searchImage &&
        this.state.searchImage !== "") ||
      prevState.page !== this.state.page
    ) {
      this.searchImagesHandler();
    }
  }

  closeModal = () => {
    this.largeImgURL = "";
    this.setState({ openModal: false });
  };

  showImageHandler = (imageUrl) => () => {
    this.largeImgURL = imageUrl;
    this.setState({ openModal: true });
  };

  scrollToHandler = () => {
    const top = document.documentElement.scrollHeight - 150;

    setTimeout(() => {
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }, 500);
  };

  searchImagesHandler = async () => {
    const { searchImage, page } = this.state;
    this.setState({ isLoading: true, error: "" });
    try {
      const result = await fetchImages(searchImage, page);

      if (result.total !== 0) {
        this.maxPages = Math.ceil(result.totalHits / 12);

        this.setState(({ images }) => ({
          images: [...images, ...result.hits],
        }));
      } else {
        toast.info(`Nothing found for ${searchImage}!`, {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
        this.setState(() => ({
          images: [],
        }));
      }
    } catch (error) {
      console.error(error);
      this.setState(() => ({ error: error.toString() }));
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMoreHandler = () => {
    this.scrollToHandler();
    this.setState(() => ({
      page: Math.min(this.maxPages, this.state.page + 1),
    }));
  };

  onSubmitHandler = (searchString) => {
    this.maxPages = 0;

    this.setState(() => ({
      images: [],
      searchImage: searchString,
      page: 1,
    }));
  };

  render() {
    return (
      <div>
        <ToastContainer autoClose={3000} />
        <Searchbar onSubmit={this.onSubmitHandler} />
        {this.state.openModal && (
          <Modal
            largeImgURL={this.largeImgURL}
            onClose={this.closeModal}
          ></Modal>
        )}
        {this.state.error ? (
          <p>{this.state.error}</p>
        ) : (
          <ImageGallery
            images={this.state.images}
            showImageHandler={this.showImageHandler}
            scrollToHandler={this.scrollToHandler}
          />
        )}
        {this.state.isLoading && <Loader />}
        {this.state.page < this.maxPages && (
          <Button loadMoreHandler={this.loadMoreHandler} />
        )}
      </div>
    );
  }
}

export default App;
