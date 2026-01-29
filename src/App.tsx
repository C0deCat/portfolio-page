import Scanlines from "./components/Scanlines/Scanlines";
import Contact from "./sections/Contact";
import Experience from "./sections/Experience";
import Expertise from "./sections/Expertise/Expertise";
import MyWork from "./sections/MyWork";
import Navigation from "./sections/Navigation";
import { Overview } from "./sections/Overview";
import DynamicParallaxBackground from "./components/DynamicParallaxBackground";
import catBanner from "./assets/cat_banner.png";
import shelf1 from "./assets/shelf1.png";
import shelf2 from "./assets/shelf2.png";
import shelf3 from "./assets/shelf3.png";

const backgroundImages = [
  { src: catBanner, scale: 0.6 },
  { src: shelf1 },
  { src: shelf2 },
  { src: shelf3 },
];

function App() {
  return (
    <>
      <Scanlines />
      <Navigation />
      <Overview />
      <Expertise />
      <DynamicParallaxBackground
        images={backgroundImages}
        scatter={{ base: 100, sm: 100, md: 150, lg: 200 }}
        imageSize={{ base: 1.4, sm: 1.6, md: 1.8, lg: 2, xl: 2.3 }}
        edgeBlur={72}
        speed={0.3}
      >
        <MyWork />
        <Experience />
      </DynamicParallaxBackground>
      <Contact />
    </>
  );
}

export default App;
