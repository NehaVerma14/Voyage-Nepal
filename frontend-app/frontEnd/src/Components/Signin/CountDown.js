// import React, {useState, useEffect} from 'react'
// import { View, Text } from 'react-native'

// const CountDown = (props) => {
//     // const [seconds, setSeconds] = useState({minutes: 10, second: 10});
//     // useEffect(() => {
//     //     if (seconds > 0) {
//     //       setTimeout(() => setSeconds({...seconds, second: seconds - 1}), 1000);
//     //     } else {
//     //       setSeconds('BOOOOM!');
//     //     }
//     //   });
//     const {initialMinute = 0,initialSeconds = 0} = props;
//     const [ minutes, setMinutes ] = useState(initialMinute);
//     const [seconds, setSeconds ] =  useState(initialSeconds);
//     useEffect(()=>{
//     let myInterval = setInterval(() => {
//             if (seconds > 0) {
//                 setSeconds(seconds - 1);
//             }
//             if (seconds === 0) {
//                 if (minutes === 0) {
//                     clearInterval(myInterval)
//                 } else {
//                     setMinutes(minutes - 1);
//                     setSeconds(59);
//                 }
//             } 
//         }, 1000)
//         return ()=> {
//             clearInterval(myInterval);
//           };
//     });
//     return (
//         <View>
//            <Text>
               
//            </Text>
//             { minutes === 0 && seconds === 0
//             ? null
//             :  {minutes}(<Text>:</Text>){seconds < 10 ?  `0${seconds}` : seconds}
//             }

//         </View>
//     )
// }

// export default CountDown
