// import s from "./Loader.module.css";
// import Spinner from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader";

// const Loader = () => {
//   return (
//     <div className={s.Loader}>
//       <Spinner type="Circles" color="#00BFFF" height={80} width={80} />
//     </div>
//   );
// };

// export default Loader;
import { Puff } from "react-loader-spinner";
import style from "./Loader.module.css";
import { Component } from "react/cjs/react.production.min";

class Loader extends Component {
  render() {
    return (
      <div className={style.Loader}>
        <Puff color="#00BFFF" height={80} width={80} />
      </div>
    );
  }
}

export default Loader;
