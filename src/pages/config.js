import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Config = () => {
  const [ip, setIp] = useState('');

  useEffect(() => {
    const loadIp = async () => {
      try {
        const savedIp = await AsyncStorage.getItem('@app_ip');
        if (savedIp !== null) {
          setIp(savedIp);
        }
      } catch (error) {
        console.error('Failed to load IP from storage', error);
      }
    };

    loadIp();
  }, []);

  const saveIp = async () => {
    try {
      await AsyncStorage.setItem('@app_ip', ip);
      alert('IP salvo com sucesso!');
    } catch (error) {
      console.error('Failed to save IP', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Insira o IP do servidor:</Text>
      <TextInput
        style={styles.input}
        value={ip}
        onChangeText={setIp}
        placeholder="Ex: 192.168.0.1"
        placeholderTextColor="#595757"
        keyboardType="numeric"
      />
      <Button title="Salvar IP" onPress={saveIp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    marginBottom: 10,
    fontSize: 18,
    color: '#000'
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
});

export default Config;
