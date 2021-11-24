import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  Button, Text,
  View
} from 'react-native';

const Timer = () => {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.mainContainer}>
        <Text style={styles.heading}>Work Timer</Text>
        <Text style={styles.timer}>25:00</Text>
        <View style={styles.buttonContainer}>
          <Button title="Pause" />
          <Button title="Reset" />
        </View>
        <View style={styles.mainRow}>
          <Text style={styles.boldText}>Work Time:</Text>
          <View style={styles.inputRow}>
            <Text>Mins:</Text>
            <TextInput style={styles.input} value={"25"} />
            <Text>Secs:</Text>
            <TextInput style={styles.input} value={"0"} />
          </View>
        </View>
        <View style={styles.mainRow}>
          <Text style={styles.boldText}>Break Time:</Text>
          <View style={styles.inputRow}>
            <Text>Mins:</Text>
            <TextInput style={styles.input} value={"25"} />
            <Text>Secs:</Text>
            <TextInput style={styles.input} value={"0"} />
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