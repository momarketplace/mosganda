import React from 'react'
import { useSpring, animated } from '@react-spring/web'
import { RelativeRoutingType } from '../../node_modules/react-router-dom/dist/index'

function Spring(){
    // const spring = useSpring({
    //     from: {backgroundColor: "red"},
    //     to: {backgroundColor: "green"}
    // })

    //useSpring with a callback function to control the spring
    // const [springs, api] = useSpring(() => ({
    //     from: { backgroundColor: "red",
    //     position: "relative",
    //     left: "10%",
    //     top: "20%"
    //  },
    //   }))

    //   //add function
    //   const handleClick = () =>{
    //     api.start({
    //         from: { backgroundColor: "red",
    //         position: "relative",
    //         left: "10%",
    //         top: "20%"
    //     },
        
    //     to: {backgroundColor: "green",
    //         position: "relative",
    //         left: "50%",
    //         top:"20%"
    // }
    //     })
    //   }

      const [props, api] = useSpring(
        () => ({
          from: { opacity: 0 },
          to: { opacity: 1 },
        }),
        []
      )
    

    return(
        <div>
            <p>This is react spring tutorial</p>
            {/* <animated.div
            onClick ={handleClick}
            style={{width:"80px", height:"80px", backgroundColor:"red", borderRadius:"8px",
            ...springs
        }}
             /> */}

<animated.div style={props}>Hello World</animated.div>

        </div>
    )
}

export default Spring