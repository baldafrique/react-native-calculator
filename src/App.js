import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import Button, { ButtonTypes } from './components/Button';

const App = () => {
  const width = (useWindowDimensions().width - 5) / 4;
  const height = width;
  const [result, setResult] = useState(0);
  const [formula, setFormula] = useState([]);
  const Operators = {
    DIVIDE: '÷',
    MULTIPLY: 'x',
    SUBTRACT: '―',
    ADD: '+',
    CLEAR: 'C',
    EQUAL: '=',
  };

  const onPressNumber = (number) => {
    const last = formula[formula.length - 1];
    if (isNaN(last)) {
      setResult(number);
      setFormula((prev) => [...prev, number]);
    } else {
      const newNumber = (last ?? 0) * 10 + number;
      setResult(newNumber);
      setFormula((prev) => {
        prev.pop();
        return [...prev, newNumber];
      });
    }
  };

  const onPressOperator = (operator) => {
    switch (operator) {
      case Operators.CLEAR:
        setFormula([]);
        setResult(0);
        return;
      case Operators.EQUAL:
        calculate();
        return;
      default: {
        const last = formula[formula.length - 1];
        if (
          [
            Operators.DIVIDE,
            Operators.MULTIPLY,
            Operators.SUBTRACT,
            Operators.ADD,
          ].includes(last)
        ) {
          setFormula((prev) => {
            prev.pop();
            return [...prev, operator];
          });
        } else {
          setFormula((prev) => [...prev, operator]);
        }
        return;
      }
    }
  };

  const calculate = () => {
    let calculatedNumber = 0;
    let operator = '';

    formula.forEach((value) => {
      if (
        [
          Operators.DIVIDE,
          Operators.MULTIPLY,
          Operators.SUBTRACT,
          Operators.ADD,
        ].includes(value)
      ) {
        operator = value;
      } else {
        if (operator === Operators.DIVIDE) {
          calculatedNumber /= value;
        } else if (operator === Operators.MULTIPLY) {
          calculatedNumber *= value;
        } else if (operator === Operators.SUBTRACT) {
          calculatedNumber -= value;
        } else if (operator === Operators.ADD) {
          calculatedNumber += value;
        } else {
          calculatedNumber = value;
        }
      }
      setResult(calculatedNumber);
      setFormula([]);
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.resultContainer}>
        <Text style={styles.text}>
          {result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.leftPad}>
          <View style={styles.number}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <Button
                key={num}
                title={num.toString()}
                onPress={() => {
                  onPressNumber(num);
                }}
                buttonType={ButtonTypes.NUMBER}
                buttonStyle={{ width, height, marginBottom: 1 }}
              ></Button>
            ))}
          </View>
          <View style={styles.bottom}>
            <Button
              title="C"
              onPress={() => {
                onPressOperator(Operators.CLEAR);
              }}
              buttonType={ButtonTypes.OPERATOR}
              buttonStyle={{ width, height, marginTop: 1 }}
            />
            <Button
              title="0"
              onPress={() => {
                onPressNumber(0);
              }}
              buttonType={ButtonTypes.NUMBER}
              buttonStyle={{ width, height, marginTop: 1 }}
            />
            <Button
              title="="
              onPress={() => {
                onPressOperator(Operators.EQUAL);
              }}
              buttonType={ButtonTypes.OPERATOR}
              buttonStyle={{ width, height, marginTop: 1 }}
            />
          </View>
        </View>
        <View>
          <Button
            title="÷"
            onPress={() => {
              onPressOperator(Operators.DIVIDE);
            }}
            buttonType={ButtonTypes.OPERATOR}
            buttonStyle={{ width, height, marginTop: 1 }}
          />
          <Button
            title="x"
            onPress={() => {
              onPressOperator(Operators.MULTIPLY);
            }}
            buttonType={ButtonTypes.OPERATOR}
            buttonStyle={{ width, height, marginTop: 1 }}
          />
          <Button
            title="―"
            onPress={() => {
              onPressOperator(Operators.SUBTRACT);
            }}
            buttonType={ButtonTypes.OPERATOR}
            buttonStyle={{ width, height, marginTop: 1 }}
          />
          <Button
            title="+"
            onPress={() => {
              onPressOperator(Operators.ADD);
            }}
            buttonType={ButtonTypes.OPERATOR}
            buttonStyle={{ width, height, marginTop: 1 }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  resultContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  buttonContainer: {
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  text: {
    fontSize: 60,
    fontWeight: '700',
    color: '#ffffff',
    paddingBottom: 30,
    paddingRight: 30,
  },
  leftPad: {
    width: '75%',
  },
  number: {
    flexWrap: 'wrap-reverse',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default App;
