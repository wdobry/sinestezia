import "./styles.css";
import { ApiTest } from "./Api";
import { Logo } from "./Logo";

export default function App() {
  return (
    <div className="wrapper">
      <div className="header">
        <Logo />
        <h2>sound visualized</h2>
      </div>
      <p>
        sinestezia adds another layer to music nfts through generative visuals,
        driven by off and on-chain data.
      </p>
      <p>
        explore the sound waves of your favourite sound in an artistic way, and
        learn about on-chain data, drop information, audience insights, and
        comments.
      </p>
      <ApiTest />
    </div>
  );
}
