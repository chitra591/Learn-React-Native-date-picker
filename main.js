'use strict';
import Expo from 'expo';
import React from 'react';
import { DatePickerIOS,
StyleSheet,
Text,
TextInput,
View,
DatePickerAndroid,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';

class DatePickerExample extends React.Component {
  static defaultProps = {
    date: new Date(),
    timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
  };

  state = {
    date: this.props.date,
    timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
  };

  onDateChange = (date) => {
    this.setState({date: date});
  };

  onTimezoneChange = (event) => {
    var offset = parseInt(event.nativeEvent.text, 10);
    if (isNaN(offset)) {
      return;
    }
    this.setState({timeZoneOffsetInHours: offset});
  };

  render() {
    // Ideally, the timezone input would be a picker rather than a
    // text input, but we don't have any pickers yet :(
    return (
      <View>
        <WithLabel label="Value:">
          <Text>{
            this.state.date.toLocaleDateString() +
            ' ' +
            this.state.date.toLocaleTimeString()
          }</Text>
        </WithLabel>
        <WithLabel label="Timezone:">
          <TextInput
            onChange={this.onTimezoneChange}
            style={styles.textinput}
            value={this.state.timeZoneOffsetInHours.toString()}
          />
          <Text> hours from UTC</Text>
        </WithLabel>
        <Heading label="Date + time picker" />
        <DatePickerIOS
          date={this.state.date}
          mode="datetime"
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={this.onDateChange}
        />
        <Heading label="Date picker" />
        <DatePickerIOS
          date={this.state.date}
          mode="date"
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={this.onDateChange}
        />
        <Heading label="Time picker, 10-minute interval" />
        <DatePickerIOS
          date={this.state.date}
          mode="time"
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={this.onDateChange}
          minuteInterval={10}
        />
      </View>
    );
  }
}

class WithLabel extends React.Component {
  render() {
    return (
      <View style={styles.labelContainer}>
        <View style={styles.labelView}>
          <Text style={styles.label}>
            {this.props.label}
          </Text>
        </View>
        {this.props.children}
      </View>
    );
  }
}

class Heading extends React.Component {
  render() {
    return (
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>
          {this.props.label}
        </Text>
      </View>
    );
  }
}

exports.displayName = (undefined: ?string);
exports.title = '<DatePickerIOS>';
exports.description = 'Select dates and times using the native UIDatePicker.';
exports.examples = [
{
  title: '<DatePickerIOS>',
  render: function(): React.Element<any> {
    return <DatePickerExample />;
  },
}];

class DatePickerAndroidExample extends React.Component {
  static title = 'DatePickerAndroid';
  static description = 'Standard Android date picker dialog';

  state = {
    presetDate: new Date(2020, 4, 5),
    simpleDate: new Date(2020, 4, 5),
    spinnerDate: new Date(2020, 4, 5),
    calendarDate: new Date(2020, 4, 5),
    defaultDate: new Date(2020, 4, 5),
    allDate: new Date(2020, 4, 5),
    simpleText: 'pick a date',
    spinnerText: 'pick a date',
    calendarText: 'pick a date',
    defaultText: 'pick a date',
    minText: 'pick a date, no earlier than today',
    maxText: 'pick a date, no later than today',
    presetText: 'pick a date, preset to 2020/5/5',
    allText: 'pick a date between 2020/5/1 and 2020/5/10',
  };

  showPicker = async (stateKey, options) => {
    try {
      var newState = {};
      const {action, year, month, day} = await DatePickerAndroid.open(options);
      if (action === DatePickerAndroid.dismissedAction) {
        newState[stateKey + 'Text'] = 'dismissed';
      } else {
        var date = new Date(year, month, day);
        newState[stateKey + 'Text'] = date.toLocaleDateString();
        newState[stateKey + 'Date'] = date;
      }
      this.setState(newState);
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  };

  render() {
    return (
      <View>
        <View>
          <TouchableWithoutFeedback
            onPress={this.showPicker.bind(this, 'simple', {date: this.state.simpleDate})}>
            <Text style={styles.text}>{this.state.simpleText}</Text>
          </TouchableWithoutFeedback>
        </View>
        <View>
          <TouchableWithoutFeedback
            onPress={this.showPicker.bind(this, 'spinner', {date: this.state.spinnerDate, mode: 'spinner'})}>
            <Text style={styles.text}>{this.state.spinnerText}</Text>
          </TouchableWithoutFeedback>
        </View>
        <View>
          <TouchableWithoutFeedback
            onPress={this.showPicker.bind(this, 'calendar', {date: this.state.calendarDate, mode: 'calendar'})}>
            <Text style={styles.text}>{this.state.calendarText}</Text>
          </TouchableWithoutFeedback>
        </View>
        <View>
          <TouchableWithoutFeedback
            onPress={this.showPicker.bind(this, 'default', {date: this.state.defaultDate, mode: 'default'})}>
            <Text style={styles.text}>{this.state.defaultText}</Text>
          </TouchableWithoutFeedback>
        </View>
        <View>
          <TouchableWithoutFeedback
            onPress={this.showPicker.bind(this, 'preset', {date: this.state.presetDate})}>
            <Text style={styles.text}>{this.state.presetText}</Text>
          </TouchableWithoutFeedback>
        </View>
        <View>
          <TouchableWithoutFeedback
            onPress={this.showPicker.bind(this, 'min', {
              date: this.state.minDate,
              minDate: new Date(),
            })}>
            <Text style={styles.text}>{this.state.minText}</Text>
          </TouchableWithoutFeedback>
        </View>
        <View>
          <TouchableWithoutFeedback
            onPress={this.showPicker.bind(this, 'max', {
              date: this.state.maxDate,
              maxDate: new Date(),
            })}>
            <Text style={styles.text}>{this.state.maxText}</Text>
          </TouchableWithoutFeedback>
        </View>
        <View>
          <TouchableWithoutFeedback
            onPress={this.showPicker.bind(this, 'all', {
              date: this.state.allDate,
              minDate: new Date(2020, 4, 1),
              maxDate: new Date(2020, 4, 10),
            })}>
            <Text style={styles.text}>{this.state.allText}</Text>
          </TouchableWithoutFeedback>
          </View>
        </View>
    );
  }
}

class App extends React.Component {
  render() {
    if (Platform.OS === 'ios'){
      return (
        <View>
          <DatePickerExample />
        </View>
      );
    }
    return (
      <View>
        <DatePickerAndroidExample />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinput: {
    height: 26,
    width: 50,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    padding: 4,
    fontSize: 13,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  labelView: {
    marginRight: 10,
    paddingVertical: 2,
  },
  label: {
    fontWeight: '500',
  },
  headingContainer: {
    padding: 4,
    backgroundColor: '#f6f7f8',
  },
  heading: {
    fontWeight: '500',
    fontSize: 14,
  },
});

Expo.registerRootComponent(App);
