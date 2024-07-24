import React, { useState } from 'react';
import { View, Text, TextInput, Button, ToastAndroid, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import { Linking } from 'react-native';

const MainScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [editableAmount, setEditableAmount] = useState(false);
  const [transactionType, setTransactionType] = useState('DEBIT');
  const [installmentType, setInstallmentType] = useState('MERCHANT');
  const [installmentCount, setInstallmentCount] = useState('');
  const [orderId, setOrderId] = useState('');

  const startPayment = () => {
    const uriBuilder = [
      'payment-app://pay',
      `?${RETURN_SCHEME}=deeplinktest`,
      amount && `&${AMOUNT}=${amount}`,
      `&${EDITABLE_AMOUNT}=${editableAmount ? '1' : '0'}`,
      `&${TRANSACTION_TYPE}=${transactionType}`,
      `&${INSTALLMENT_TYPE}=${installmentType}`,
      installmentCount && `&${INSTALLMENT_COUNT}=${installmentCount}`,
      orderId && `&${ORDER_ID}=${orderId}`,
    ]
      .filter(Boolean)
      .join('');

    Linking.openURL(uriBuilder).catch((err) => console.error('Error opening URL', err));
  };

  const startCapture = () => {
    navigation.navigate('CaptureScreen');
  };

  return (
    <View style={styles.container}>
      <Button title="Deep Link" onPress={startPayment} />
      <Button title="Deeplink Capture" onPress={startCapture} />

      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter Amount"
        keyboardType="numeric"
      />

      <View style={styles.checkboxContainer}>
        <CheckBox value={editableAmount} onValueChange={setEditableAmount} />
        <Text style={styles.checkboxLabel}>Editable Amount</Text>
      </View>

      <Text style={styles.label}>Transaction Type</Text>
      <Picker
        selectedValue={transactionType}
        onValueChange={(itemValue) => setTransactionType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Debit" value="DEBIT" />
        <Picker.Item label="Credit" value="CREDIT" />
        <Picker.Item label="Voucher" value="VOUCHER" />
        <Picker.Item label="Instant Payment" value="INSTANT_PAYMENT" />
        <Picker.Item label="PIX" value="PIX" />
      </Picker>

      <Text style={styles.label}>Installment Type</Text>
      <Picker
        selectedValue={installmentType}
        onValueChange={(itemValue) => setInstallmentType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Merchant" value="MERCHANT" />
        <Picker.Item label="Issuer" value="ISSUER" />
        <Picker.Item label="None" value="NONE" />
      </Picker>

      <Text style={styles.label}>Installment Count</Text>
      <TextInput
        style={styles.input}
        value={installmentCount}
        onChangeText={setInstallmentCount}
        placeholder="Enter Installment Count"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Order ID</Text>
      <TextInput
        style={styles.input}
        value={orderId}
        onChangeText={setOrderId}
        placeholder="Enter Order ID"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
});

const RETURN_SCHEME = "return_scheme";
const AMOUNT = "amount";
const EDITABLE_AMOUNT = "editable_amount";
const TRANSACTION_TYPE = "transaction_type";
const INSTALLMENT_TYPE = "installment_type";
const INSTALLMENT_COUNT = "installment_count";
const ORDER_ID = "order_id";

export default MainScreen;
