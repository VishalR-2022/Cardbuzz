import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const OutlinedTextField = ({ placeholder, value, onChangeText, keyboardType, error }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={[styles.container, isFocused && styles.containerFocused, error && styles.containerError]}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="text"
          value={value}
          // mode=''
          onChangeText={onChangeText}
          keyboardType={keyboardType || 'default'}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={[styles.input, isFocused && styles.inputFocused, error && styles.inputError]}
        />
        <Text style={[styles.placeholder, (isFocused || value) && styles.placeholderShrink]}>
          {placeholder}
        </Text>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginVertical: 8,
  },
  containerFocused: {
    borderColor: 'blue', // Change to the desired focused border color
  },
  containerError: {
    borderColor: 'red',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  inputFocused: {
    borderColor: 'blue', // Change to the desired focused border color
  },
  inputError: {
    borderColor: 'red',
  },
  placeholder: {
    position: 'absolute',
    left: 18,
    top: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 4,
    fontSize: 16,
  },
  placeholderShrink: {
    fontSize: 12,
    top: -10,
    left: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});

export default OutlinedTextField;
