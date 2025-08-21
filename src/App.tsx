import Scanlines from "./components/Scanlines/Scanlines";
import Contact from "./sections/Contact";
import Experience from "./sections/Experience";
import Expertise from "./sections/Expertise";
import MyWork from "./sections/MyWork";
import Navigation from "./sections/Navigation";
import { Overview } from "./sections/Overview";

function App() {
  return (
    <>
      <Scanlines />
      <Navigation />
      <Overview />
      <Expertise />
      <MyWork />
      <Experience />
      <Contact />
    </>
  );
}

export default App;
