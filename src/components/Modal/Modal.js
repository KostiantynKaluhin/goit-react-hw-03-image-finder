import s from "./Modal.module.css";
import { Component } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.keyDownHandler);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.keyDownHandler);
  }

  keyDownHandler = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };
  clickOverlay = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={s.Overlay} onClick={this.clickOverlay}>
        <div className={s.Modal}>
          <img src={this.props.largeImgURL} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
