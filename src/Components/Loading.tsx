import "./style.scss";
import Gif from '../loading-gif.gif';

const Loading: React.FC = () => {
  return (
    <div className="loader">
      <img src={Gif} alt="" />
    </div>
  );
};

export default Loading;
