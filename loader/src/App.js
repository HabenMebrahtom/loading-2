import './App.css';
import { CircularProgressbar,  buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ChangingProgressProvider from './components/ChangingProgressProvider';
import React, { useState, useEffect } from 'react';


function App() {

  const quotes = [
    {
      quote: "Everybody is a genius. But if you judge a fish by it’s ability to climb a tree, it will live it’s whole life thinking it’s stupid.",
      author: "Albert Einstein"
    },
   
    {
      quote: "I myself cannot spell. Have never been able to. I do not pay attention to spelling and mix letters.",
      author: "Erna Solberg, Prime Minister of Norway"
    },
    {
      quote: "Being diagnosed with dyslexia at age 60 was like the last part of the puzzle in a tremendous mystery that I’ve kept to myself all these years.",
      author: "Steven Spielberg"
    },
    {
      quote: "I had to train myself to focus my attention. I became very visual and learned how to create mental images in order to comprehend what I read.",
      author: "Tom Cruise, Actor"
    }
  ];

  const [current, setCurrent] = useState(0)
  const length = quotes.length;

  const autoPlay = true;
  const timeInterval = 6000;
  let displayInterval;

  const nextQuote = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  }

  const autoDisplay = (() => {
    displayInterval = setInterval(nextQuote, timeInterval)
  })


  useEffect(() => {
    if (autoPlay) {
      autoDisplay()
    }
    return () => clearInterval(displayInterval)
  }, [autoDisplay, autoPlay, displayInterval])


  return (
    <div className="Loader-page">
      <div className='card'>
        <div className="spin-container" style={{width: 500, height: 500}}>
              <ChangingProgressProvider values={[0,  20,  40,   60,  80,  100]}>
                 {percentage => (
                    <CircularProgressbar 
                        value={100 - percentage} 
                        text={`${100 - percentage}%`}
                        strokeWidth={3}
                        counterClockwise
                        styles={buildStyles({
                        pathTransition: percentage === 0 ? "none" : "stroke-dashoffset 1s ease 0s",
                        pathColor: "grey",
                        trailColor: "none",
                        strokeLinecap: "butt",
                        textColor: 'grey',
                        textSize: '16px',
                         })}
                      />
                    )}
              </ChangingProgressProvider>
         </div>
          
          {
            quotes.map((text, index) => {
              return (
                < div key={index} >
                  {
                    index === current && (
                      <div className="quote">
                         <span>"{ text.quote }"</span> <span>- { text.author }</span>
                      </div>
                    )
                  }
                </div>
                )
            })
            }
          
        </div>
    </div>
  );
}

export default App;
