import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import API_IP from './ip'; // Importando o IP da configuração

const LoginUser = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Verificar se o email e a senha são válidos
    if (email === '' && password === '') {
      // Login bem-sucedido, navegar para a próxima tela
      navigation.navigate('MinhaTela');
    }
    else if (email === 'User' && password === '123') {
      // Login bem-sucedido, navegar para a próxima tela
      navigation.navigate('InsertUser');
    }
     else {
      // Login inválido, exibir uma mensagem de erro
      alert('Email ou senha inválidos');
    }
  };
  const handleResetPassword = () => {
    // lógica para reset de senha
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('./../../assets/fundo.png')}
        style={styles.backgroundImage}
      />
      <Image
        style={styles.logo}
       source={require('./../../assets/logo.png')}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#595757"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#595757"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.resetPasswordButton} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Resetar senha</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
   // backgroundColor: '#ffa500'
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 50,
  },
  input: {
    width: '80%',
    padding: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    color: 'black',
  },
  loginButton: {
    width: '80%',
    backgroundColor: '#87ceeb',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  resetPasswordButton: {
    width: '80%',
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Pode ser 'cover' para preencher toda a tela
    position: 'absolute',
    width: '100%',
    height: '100%',
  }
});

export default LoginUser;
