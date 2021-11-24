import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  Button, Text,
  View
} from 'react-native';
import vibrate from "../utils/vibrate";

const Timer = () => {

  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerType, setTimerType] = useState("work");
  const [timerState, setTimerState] = useState("paused");
  const [workTime, setWorkTime] = useState({minutes: "25", seconds: "0"});
  const [breakTime, setBreakTime] = useState({minutes: "5", seconds: "0"})
  
  useEffect(()=>{
    const interval = setInterval(() => {
      if(timerState==="running") {
        if(timerMinutes===0 && timerSeconds===0) {
          vibrate();
          setTimerMinutes(timerType==="break" ? Number(workTime.minutes) : Number(breakTime.minutes));
          setTimerSeconds(timerType==="break" ? Number(workTime.seconds) : Number(breakTime.seconds));
          setTimerType(timerType==="break" ? "work" : "break");
        } else if(timerSeconds===0) {
          setTimerMinutes(timerMinutes-1);
          setTimerSeconds(59);
        } else {
          setTimerSeconds(timerSeconds-1);
        }
      }
    }, 1000);
    return ()=>clearInterval(interval);
  }, [timerMinutes, timerSeconds, timerType, timerState]);

  const handleOnPressTimerStateChange = () => {
    setTimerState(timerState==="paused" ? "running" : "paused");
  }

  const handleOnPressReset = () => {
    setTimerState("paused");
    setTimerMinutes(timerType==="work" ? Number(workTime.minutes) : Number(breakTime.minutes));
    setTimerSeconds(timerType==="work" ? Number(workTime.seconds) : Number(breakTime.seconds));
  }

  const handleWorkTimeChanged = (time, type) => {
    if(timerType==="work") setTimerState("paused");
    if(type==="minutes") {
      setWorkTime({...workTime, minutes: time});
      if(timerType==="work") setTimerMinutes(Number(time));
    } else {
      setWorkTime({...workTime, seconds: time});
      if(timerType==="work") setTimerSeconds(Number(time));
    }
  }

  const handleBreakTimeChanged = (time, type) => {
    if(timerType==="break") setTimerState("paused");
    if(type==="minutes") {
      setBreakTime({...breakTime, minutes: time});
      if(timerType==="break") setTimerMinutes(Number(time));
    } else {
      setBreakTime({...breakTime, seconds: time});
      if(timerType==="break") setTimerSeconds(Number(time));
    }
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.mainContainer}>
        <Text style={styles.heading}>
          {`${timerType[0].toUpperCase()}${timerType.slice(1)}`} Timer
        </Text>
        <Text style={styles.timer}>
          {timerMinutes<10 ? `0${timerMinutes}` : timerMinutes}:
          {timerSeconds<10 ? `0${timerSeconds}` : timerSeconds}
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            onPress={handleOnPressTimerStateChange}
            title={timerState==="paused" ? "Start" : "Pause"}
          />
          <Button onPress={handleOnPressReset} title="Reset" />
        </View>
        <View style={styles.mainRow}>
          <Text style={styles.boldText}>Work Time:</Text>
          <View style={styles.inputRow}>
            <Text>Mins:</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={workTime.minutes}
              onChangeText={(minutes)=>handleWorkTimeChanged(minutes, "minutes")}
            />
            <Text>Secs:</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={workTime.seconds}
              onChangeText={(seconds)=>handleWorkTimeChanged(seconds, "seconds")}
            />
          </View>
        </View>
        <View style={styles.mainRow}>
          <Text style={styles.boldText}>Break Time:</Text>
          <View style={styles.inputRow}>
            <Text>Mins:</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={breakTime.minutes}
              onChangeText={(minutes)=>handleBreakTimeChanged(minutes, "minutes")}
            />
            <Text>Secs:</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={breakTime.seconds}
              onChangeText={(seconds)=>handleBreakTimeChanged(seconds, "seconds")}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  heading: {
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center"
  },
  timer: {
    fontSize: 68,
    textAlign: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 22,
    width: "40%"
  },
  mainRow: {
    width: "90%",
    flexDirection: "row",
    marginVertical: 7,
    justifyContent: "space-between"
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  input: {
    width: 50,
    borderColor: "black",
    borderRadius: 4,
    borderWidth: 1,
    marginHorizontal: 5,
    textAlign: "center"
  },
  boldText: {
    fontWeight: "bold"
  }
});

export default Timer;