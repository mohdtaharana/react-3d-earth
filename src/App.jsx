import { useState, useRef, useEffect, Suspense } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene from "./Scene";
import Loading from "./Loading";
import { FaLinkedin } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { Canvas } from "@react-three/fiber";
import { toast } from "react-toastify";

gsap.registerPlugin(ScrollTrigger);

function App() {
  // const [count, setCount] = useState(0)
  const ref = useRef(null);
  const main = useRef(null);
  const textRef1 = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [active, setActive] = useState("rimRef");

  useEffect(() => {
    //get window width
    const width = window.innerWidth;
    // console.log("width", width);
    if (width < 1536) {
      // setXChange(0);
      gsap
        .timeline({
          // ease: 'power1.in',
          scrollTrigger: {
            trigger: main.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => {
              setScrollProgress(self.progress); // Update progress (0 to 1)
            },
            // markers: true,
          },
        })
        .to(
          ref.current,
          {
            ease: "none",
            // ease: "power1.in",
            // opacity: 0.1,
            // x: `-${xChange}vw`,
            y: "100vh",
          }
          // 0
        ) //this 0 represents the start of the total Scroll Duration, and run till .5
        .to(
          ref.current,
          {
            ease: "none",
            // ease: "power1.out",
            // opacity: 1,
            // x: `${xChange}vw`,
            y: "200vh",
          }
          // 0.33
        )
        .to(
          ref.current,
          {
            ease: "none",
            // ease: "power1.out",
            // opacity: 1,
            // x: `-${xChange}vw`,
            y: "300vh",
          }
          // 0.8
        );
      //0.8 will means it will start at 80% of the total scroll duration, so there will be slight delay
      //Note: by default these 2 '.to' will take 50% of total Scroll Duration each
    } else {
      gsap
        .timeline({
          // ease: 'power1.in',
          scrollTrigger: {
            trigger: main.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => {
              setScrollProgress(self.progress); // Update progress (0 to 1)
            },
            // markers: true,
          },
        })
        .to(
          ref.current,
          {
            ease: "none",
            // ease: "power1.in",
            // opacity: 0.1,
            x: "-25vw",
            y: "100vh",
          }
          // 0
        ) //this 0 represents the start of the total Scroll Duration, and run till .5
        .to(
          ref.current,
          {
            ease: "none",
            // ease: "power1.out",
            // opacity: 1,
            x: "25vw",
            y: "200vh",
          }
          // 0.33
        )
        .to(
          ref.current,
          {
            ease: "none",
            // ease: "power1.out",
            // opacity: 1,
            x: "-25vw",
            y: "300vh",
          }
          // 0.8
        );
      //0.8 will means it will start at 80% of the total scroll duration, so there will be slight delay
      //Note: by default these 2 '.to' will take 50% of total Scroll Duration each
    }

    toast.info("Use the number timeline below to explore!", {
      autoClose: 10000,
      position: "top-left",
      theme: "dark",
      closeOnClick: true,
    });
  }, []);

  const scrollToSection = (target) => {
    const element = document.getElementById(`${target}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  window.addEventListener("scroll", () => {
    // console.log("scroll", window.scrollY);
    let windowHeigh = window.innerHeight * 0.99;
    // document.getElementById("invisi").style.height = `${4*windowHeigh}px`;
    if (window.scrollY < windowHeigh) {
      setActive("rimRef");
    } else if (
      window.scrollY >= windowHeigh &&
      window.scrollY < windowHeigh * 2
    ) {
      setActive("carriageRef");
    } else if (
      window.scrollY >= windowHeigh * 2 &&
      window.scrollY < windowHeigh * 3
    ) {
      setActive("oldCarRef");
    } else if (window.scrollY >= windowHeigh * 3) {
      setActive("newCarRef");
    }
  });

  return (
    <main ref={main} className="overflow-x-hidden border-0 border-cyan-300">
      <Suspense fallback={<Loading />}>
        <div className="fixed p-1 grid place-items-center sm:p-4 top-1/2 -translate-y-1/2 z-[100] border-0 text-white border-red-400 left-0 md:left-4">
          <button
            // ref={rimRef}
            className={`cursor-pointer ${
              active === "rimRef"
                ? "opacity-[1] shadow-[0_0_16px_#f5cb58]"
                : "opacity-[.5] shadow-[0_0_0px_#f5cb58]"
            } z-[0] bg-[#f5cb58] py-2 px-[1.1rem] w-fit rounded-full text-2xl sm:text-3xl`}
            onClick={() => scrollToSection("rim")}
          >
            0
          </button>
          <p className="w-[2px] z-[9] h-[3rem] bg-zinc-600"></p>
          <button
            // ref={carriageRef}
            className={`cursor-pointer ${
              active === "carriageRef"
                ? "opacity-[1] shadow-[0_0_16px_#f5cb58]"
                : "opacity-[.5] shadow-[0_0_0px_#f5cb58]"
            } z-[0] bg-[#f5cb58] py-2 px-[1.1rem] rounded-full text-2xl sm:text-3xl`}
            onClick={() => scrollToSection("carriage")}
          >
            1
          </button>
          <p className="w-[2px] z-[9] h-[3rem] bg-zinc-600"></p>
          <button
            // ref={oldCarRef}
            className={`cursor-pointer ${
              active === "oldCarRef"
                ? "opacity-[1] shadow-[0_0_16px_#f5cb58]"
                : "opacity-[.5] shadow-[0_0_0px_#f5cb58]"
            } z-[0] bg-[#f5cb58] py-2 px-[1.1rem] rounded-full text-2xl sm:text-3xl`}
            onClick={() => scrollToSection("oldCar")}
          >
            2
          </button>
          <p className="w-[2px] z-[9] h-[3rem] bg-zinc-600"></p>
          <button
            // ref={newCarRef}
            className={`cursor-pointer ${
              active === "newCarRef"
                ? "opacity-[1] shadow-[0_0_16px_#f5cb58]"
                : "opacity-[.5] shadow-[0_0_0px_#f5cb58]"
            } z-[0] bg-[#f5cb58] py-2 px-[1.1rem] rounded-full text-2xl sm:text-3xl`}
            onClick={() => scrollToSection("newCar")}
          >
            3
          </button>
        </div>

        <p id="rim"></p>
        <section className="z-[55] relative grid place-items-center border-0 border-white h-[100vh]">
          <p
            ref={textRef1}
            className="text-white text-center absolute top-[5%] mx-4 w-fit text-4xl lg:text-6xl xl:text-8xl font-bold border-0 border-yellow-500"
          >
            A Brief Journey Through
          </p>
          <p
            ref={textRef1}
            className="text-white text-center absolute bottom-[5%] mx-4 w-fit transition-all duration-1000 text-4xl lg:text-6xl xl:text-8xl font-bold border-0 border-yellow-500"
          >
            Automotive Evolution!
          </p>
          {/* <IoIosArrowDown className="arrDown absolute bottom-2 text-[#f5cb58] text-xl" /> */}

          <div
            ref={ref}
            className="pointer-events-none cursor-grab z-[55] absolute top-1/2 -translate-y-1/2 xl:top-0 xl:-translate-y-0 left-1/2 -translate-x-1/2 h-[50vh] xl:h-[100vh] w-[100vw] 2xl:w-[50vw] border-0 border-blue-700"
          >
            <Canvas>
              <Scene progress={scrollProgress} />
            </Canvas>
          </div>
          <p className="absolute bottom-0 w-[100%] h-[2px] bg-zinc-600"></p>
        </section>

        <p id="carriage"></p>
        <section className="grid relative place-items-center 2xl:flex z-[50] items-center border-0 border-red-700 justify-evenly h-[100vh]">
          <p className="w-[50%] border-0 border-red-700"></p>

          <p className="text-white w-fit 2xl:w-[50%] text-center px-1 md:px-8 xl:px-4 text-base md:text-2xl lg:text-4xl font-semibold border-0 border-red-700">
            Carriages, powered by horses, were the primary mode of
            transportation from the 16th century, evolving into symbols of
            status and luxury in the 18th century.
          </p>
          <p className="absolute bottom-0 w-[100%] h-[2px] bg-zinc-600"></p>
        </section>

        <p id="oldCar"></p>
        <section className="grid relative place-items-center 2xl:flex z-[50] items-center border-0 border-red-700 justify-evenly h-[100vh]">
          <p className="text-white order-2 2xl:order-1 w-fit 2xl:w-[50%] text-center px-1 md:px-8 xl:px-4 text-base md:text-2xl lg:text-4xl font-semibold border-0 border-red-700">
            The invention of internal combustion engine vehicles, like Karl
            Benz's automobile in 1886, replaced animal power with machines,
            drastically improving speed and efficiency.
          </p>
          <p className="w-[50%] order-1 2xl:order-2 border-0 border-red-700"></p>
          <p className="absolute bottom-0 w-[100%] h-[2px] bg-zinc-600"></p>
        </section>

        <p id="newCar"></p>
        <section className="grid relative place-items-center 2xl:flex z-[50] items-center border-0 border-red-700 justify-evenly h-[100vh]">
          <p className="w-[50%] border-0 border-red-700"></p>

          <p className="text-white w-fit 2xl:w-[50%] text-center px-1 md:px-8 xl:px-4 text-base md:text-2xl lg:text-4xl font-semibold border-0 border-red-700">
            Today's cars, equipped with electric motors, autonomous systems, and
            AI connectivity, represent the pinnacle of transportation
            technology, prioritizing sustainability and convenience.
          </p>

          <div className="w-full absolute bottom-0 bg-black grid place-items-center border-0 border-red-600">
            <div
              onClick={() => {
                window.open("https://linkedin.com/in/jahidkhan2003/");
              }}
              className="cursor-pointer flex items-center py-1 justify-center border-0 border-red-600 w-fit text-white"
            >
              <p>Website made by:</p>
              <FaLinkedin className="text-white text-2xl ml-2" />
            </div>
          </div>
        </section>
      </Suspense>
    </main>
  );
}

export default App;
