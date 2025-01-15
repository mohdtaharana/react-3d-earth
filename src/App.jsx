import { useState, useRef, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene from "./Scene";
gsap.registerPlugin(ScrollTrigger);

function App() {
  // const [count, setCount] = useState(0)
  const tl = gsap.timeline();
  const ref = useRef(null);
  const main = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const trigger = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // useEffect(() => {
  //   tl.to(ref.current, {
  //     ease: "power1.in",

  //     scrollTrigger: {
  //       trigger: main.current,
  //       start: "top top",
  //       end: "57% bottom",
  //       scrub: 1,
  //       markers:true,
  //     },
  //     opacity: 0.1,
  //     x: "36.5vw",
  //     y: "100vh",
  //   })
  //   tl.to(ref.current, {
  //     ease: "power1.in",
  //     // scrollTrigger: {
  //     //   trigger: main.current, // Element to trigger the animation
  //     //   start: "30% top",
  //     //   end: "50% bottom",
  //     //   scrub: 1,
  //     //   markers: true, // Debug markers for start/end points
  //     // },
  //     opacity: 1,
  //     x: "0vw",
  //     y: "100vh",
  //   });
  // }, []);

  useEffect(() => {
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
        },
        // 0
      ) //this 0 represents the start of the total Scroll Duration, and run till .5
      .to(
        ref.current,
        {
          ease: "none",
          // ease: "power1.out",
          // opacity: 1,
          x: "24vw",
          y: "200vh",
        },
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
        },
        // 0.8
      );
      //0.8 will means it will start at 80% of the total scroll duration, so there will be slight delay
    //Note: by default these 2 '.to' will take 50% of total Scroll Duration each
  
    
    // const target = trigger.current;
    // const observer = new IntersectionObserver((entries) => {
    //   entries.forEach((entry) => {
    //     if (entry.isIntersecting) {
    //       textRef1.current.style.opacity = 1;
    //       textRef2.current.style.opacity = 1;
          
    //     } else {
    //       textRef1.current.style.opacity = 0;
    //       textRef2.current.style.opacity = 0;
    //       // document.querySelectorAll(".fadeInNews").forEach((item) => {
    //         // item.style.animation = "none";
    //       // });
    //     }
    //   });
    // });

    // if (target) {
    //   observer.observe(target);
    // }
    // return () => {
    //   if (target) {
    //     observer.unobserve(target);
    //   }
    // };
  
  }, []);

  return (
    <main ref={main}>
      <section className="flex z-[55] items-center border-2 border-white justify-evenly h-[100vh]">
        <p ref={textRef1} className="text-white w-fit transition-all duration-1000 text-4xl font-semibold border-2 border-yellow-500">
          Lorem ipsum
        </p>
        <div ref={ref} className="w-3/6 z-[55] h-[100vh] border-2 border-blue-700">
          <Scene progress={scrollProgress}/>
        </div>
        <p ref={textRef2} className="text-white w-fit transition-all duration-1000 text-4xl font-semibold border-2 border-yellow-500">
          Lorem ipsum
        </p>
        {/* <p ref={trigger} className="absolute bottom-[20%] border-2 border-pink-500 w-12"></p> */}
        
        {/* <p className="text-white w-3/6 text-4xl font-semibold border-2 border-red-700">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet rem
          eius earum sapiente saepe libero architecto asperiores nulla debitis
          cum?
        </p> */}
      </section>
      <section className="flex z-[50] items-center border-2 border-red-700 justify-evenly h-[100vh]">
      <p className="w-3/6 border-2 border-red-700"></p>
        
        <p className="text-white w-3/6 text-4xl font-semibold border-2 border-red-700">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet rem
          eius earum sapiente saepe libero architecto asperiores nulla debitis
          cum?
        </p>
      </section>
      <section className="flex z-[50] text-white items-center border-2 border-yellow-500 justify-evenly h-[100vh]">
        {/* <img className='w-1/6 border-2 border-red-700' src="vite.svg" alt="" /> */}
        {/* <p>jdbdhb</p> */}
        <p className="text-white w-3/6 text-4xl font-semibold border-2 border-pink-400">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet rem
          eius earum sapiente saepe libero architecto asperiores nulla debitis
          cum?
        </p>
        <p className="w-3/6 border-2 border-red-700"></p>
      </section>
      <section className="flex z-[50] items-center border-2 border-green-500 justify-evenly h-[100vh]">
        <p className="w-3/6 border-2 border-red-700"></p>
        <p className="text-white w-3/6 text-4xl font-semibold border-2 border-green-500">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet rem
          eius earum sapiente saepe libero architecto asperiores nulla debitis
          cum?
        </p>
      </section>
    </main>
  );
}

export default App;

// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// // Register the ScrollTrigger plugin
// gsap.registerPlugin(ScrollTrigger);

// const ScrollTriggerExample = () => {
//   const boxRef = useRef(null);

//   useEffect(() => {
//     // GSAP animation with ScrollTrigger
//     gsap.fromTo(
//       boxRef.current,
//       { opacity: 0, y: 100 }, // Start state
//       {
//         opacity: 1,
//         y: 0,
//         scrollTrigger: {
//           trigger: boxRef.current, // Element to trigger the animation
//           start: "top 80%",       // When animation starts (element top hits 80% viewport height)
//           end: "top 30%",         // When animation ends (element top hits 30% viewport height)
//           scrub: true,            // Smooth animation based on scroll
//           markers: true,          // Debug markers for start/end points
//         },
//       }
//     );
//   }, []);

//   return (
//     <div style={{ height: "200vh", padding: "50px" }}>
//       <h1>Scroll down to see the animation</h1>
//       <div
//         ref={boxRef}
//         style={{
//           width: "200px",
//           height: "200px",
//           background: "blue",
//           margin: "100px auto",
//         }}
//       ></div>
//     </div>
//   );
// };

// export default ScrollTriggerExample;
