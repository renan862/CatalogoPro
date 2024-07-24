import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

const CartScreen = ({ route, navigation }) => {
  const { carrinho: initialCarrinho, setCarrinho } = route.params;
  const [carrinho, setLocalCarrinho] = useState(initialCarrinho);

  // Função para remover um produto do carrinho
  const removerProduto = (cartId) => {
    const novoCarrinho = carrinho.filter((produto) => produto.cartId !== cartId);
    setLocalCarrinho(novoCarrinho);
    setCarrinho(novoCarrinho);
  };

  // Calcula o valor total e a quantidade de itens no carrinho
  const calcularTotal = () => {
    let total = 0;
    let quantidadeItens = 0;

    for (const produto of carrinho) {
      total += parseFloat(produto.preco);
      quantidadeItens += 1;
    }

    return { total, quantidadeItens };
  };

  const { total, quantidadeItens } = calcularTotal();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Produtos no Carrinho:</Text>
      <FlatList
        data={carrinho}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.textStyle}>{item.nome}</Text>
            <Text style={styles.textStyle}>R${parseFloat(item.preco).toFixed(2)}</Text>
            <TouchableOpacity style={styles.removeButton} onPress={() => removerProduto(item.cartId)}>
              <Text style={styles.buttonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.cartId.toString()}
      />
      <View style={styles.summary}>
        <Text style={styles.textStyle}>Total de Itens: {quantidadeItens}</Text>
        <Text style={styles.textStyle}>Valor Total: R${total.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('Pagame', { total })}>
        <Text style={styles.checkoutButtonText}>Pagamento</Text>
        <Image source={require('./../../assets/pagamento.png')} style={styles.cartIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#E0E0E0',
    borderBottomWidth: 1,
    padding: 10,
  },
  removeButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  summary: {
    marginTop: 16,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    padding: 10,
  },
  checkoutButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  cartIcon: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
  textStyle: {
    color: 'black', // Texto preto
  },
});

export default CartScreen;
