import Hero from "./components/home/Hero";
import PopularGarages from "./components/home/PopularGarages";
import About from "./components/home/About";
import Opinion from "./components/home/Opinion";
import Way from "./components/home/Way";

import WelcKonfig from "./components/home/WelcKonfig";

function page() {
  return (
    <main>
      <Hero />
      <WelcKonfig />
      <PopularGarages />
      <Opinion />
      <Way />
      <About />
    </main>
  );
}

export default page;
