import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';

const Pagame = ({ route }) => {
  const { total } = route.params;

  const handlePayment = (paymentMethod) => {
    const deepLinkUrl = `stone://payment?method=${paymentMethod}&amount=${total.toFixed(2)}`;

    Linking.canOpenURL(deepLinkUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(deepLinkUrl);
        } else {
          Alert.alert('Erro', 'Não foi possível abrir o aplicativo de pagamento.');
        }
      })
      .catch((err) => console.error('Erro ao tentar abrir o deep link:', err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione o Método de Pagamento</Text>
      <Text style={styles.total}>Total a Pagar: R${total.toFixed(2)}</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option} onPress={() => handlePayment('credit')}>
          <Text style={styles.optionText}>Cartão de Crédito</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => handlePayment('debit')}>
          <Text style={styles.optionText}>Cartão de Débito</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => handlePayment('pix')}>
          <Text style={styles.optionText}>Pix</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => handlePayment('cash')}>
          <Text style={styles.optionText}>Dinheiro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333'
  },
  total: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  option: {
    backgroundColor: '#007bff',
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Pagame;
